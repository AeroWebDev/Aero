import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information."
      lastUpdated="June 2026"
    >
      <LegalSection title="1. Information We Collect">
        <p>
          We collect information you provide directly when you use our contact
          form — including your name, email address, and project description. We
          do not collect payment data or require account registration.
        </p>
        <p>
          We also collect limited technical data automatically (IP address,
          browser type, pages visited) through standard server logs to help us
          understand how the site is used.
        </p>
      </LegalSection>

      <LegalSection title="2. How We Use Your Information">
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Respond to your inquiries and project requests.</li>
          <li>Improve the performance and content of our website.</li>
          <li>Communicate with you about our services (with your consent).</li>
          <li>Comply with legal obligations.</li>
        </ul>
        <p>We never sell, rent, or share your personal data with third parties for marketing purposes.</p>
      </LegalSection>

      <LegalSection title="3. Cookies and Tracking">
        <p>
          We use essential cookies to remember your preferences (such as theme
          and language selection). We may use analytics cookies (e.g. Google
          Analytics) to measure traffic. You can manage or disable cookies
          through your browser settings.
        </p>
        <p>
          See our <a href="/cookies" className="text-aero-blue hover:underline">Cookie Policy</a> for
          full details.
        </p>
      </LegalSection>

      <LegalSection title="4. Data Security">
        <p>
          We take reasonable technical and organizational measures to protect
          your information. All data is transmitted over HTTPS. However, no
          method of transmission over the internet is 100% secure, and we
          cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="5. Data Retention">
        <p>
          We retain contact form submissions only as long as necessary to
          respond to your inquiry, typically no longer than 12 months. Technical
          log data is retained for up to 90 days.
        </p>
      </LegalSection>

      <LegalSection title="6. Your Rights">
        <p>You have the right to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Object to or restrict processing of your data.</li>
          <li>Withdraw consent at any time.</li>
        </ul>
        <p>To exercise any of these rights, contact us at the address below.</p>
      </LegalSection>

      <LegalSection title="7. Third-Party Services">
        <p>
          Our website may link to third-party services (e.g. Vercel for hosting,
          Google Fonts). These services have their own privacy policies and we
          are not responsible for their practices.
        </p>
      </LegalSection>

      <LegalSection title="8. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The "last
          updated" date at the top of this page reflects the latest revision. We
          encourage you to review this page periodically.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact Us">
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:{" "}
          {/* TODO: Change email to custom domain email when domain is ready */}
          <a
            href="mailto:aero1code@gmail.com"
            className="text-aero-blue hover:underline"
          >
            aero1code@gmail.com
          </a>
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
