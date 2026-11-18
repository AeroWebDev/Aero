import type { VercelRequest, VercelResponse } from "@vercel/node";

// ---------------------------------------------------------------------------
// Rate-limit store  (in-memory, resets on cold-start — sufficient for a
// low-traffic marketing site and avoids any external dependency)
// ---------------------------------------------------------------------------
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // max submissions per IP per window

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    // First request in this window
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

// ---------------------------------------------------------------------------
// Helper — get real client IP from Vercel forwarding headers
// ---------------------------------------------------------------------------
function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress ?? "unknown";
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only accept POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhookUrl = process.env.MESSAGE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("MESSAGE_WEBHOOK_URL environment variable is not set.");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  const { name, email, project, website } = req.body as {
    name?: string;
    email?: string;
    project?: string;
    website?: string; // honeypot field — must be empty
  };

  // -------------------------------------------------------------------------
  // Honeypot check: bots fill in hidden fields; humans leave them empty.
  // Silently return 200 so bots think they succeeded.
  // -------------------------------------------------------------------------
  if (website && website.trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  // -------------------------------------------------------------------------
  // Basic validation
  // -------------------------------------------------------------------------
  if (
    typeof name !== "string" || name.trim() === "" ||
    typeof email !== "string" || !email.includes("@") ||
    typeof project !== "string" || project.trim() === ""
  ) {
    return res.status(400).json({ error: "Missing or invalid fields" });
  }

  // -------------------------------------------------------------------------
  // Rate limiting
  // -------------------------------------------------------------------------
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again later." });
  }

  // -------------------------------------------------------------------------
  // Forward to Discord
  // -------------------------------------------------------------------------
  const safeName = name.trim().slice(0, 256);
  const safeEmail = email.trim().slice(0, 256);
  const safeProject =
    project.trim().length > 1024
      ? project.trim().slice(0, 1021) + "..."
      : project.trim();

  const payload = {
    embeds: [
      {
        title: "📬 New Project Inquiry",
        color: 0x6495ed,
        fields: [
          { name: "👤 Name", value: safeName, inline: true },
          { name: "📧 Email", value: safeEmail, inline: true },
          { name: "📋 Project Details", value: safeProject, inline: false },
        ],
        footer: { text: "Aero Team — aeroteam.vercel.app" },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!discordRes.ok) {
      const body = await discordRes.text();
      console.error(`Discord webhook error ${discordRes.status}: ${body}`);
      return res.status(502).json({ error: "Failed to deliver message" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Unexpected error forwarding to Discord:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
