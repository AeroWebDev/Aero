import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export default function Cookies() {
  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="How we use cookies and similar technologies on our website."
      lastUpdated="June 2026"
    >
      <LegalSection title="1. What Are Cookies">
        <p>
          Cookies are small text files placed on your device when you visit a
          website. They help the site remember your preferences and improve your
          experience. Cookies cannot run programs or deliver viruses to your
          device.
        </p>
      </LegalSection>

      <LegalSection title="2. How We Use Cookies">
        <p>We use cookies to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Remember your theme preference (dark / light mode).</li>
          <li>Remember your language preference (English / Arabic).</li>
          <li>Analyse site traffic and user behaviour to improve our content.</li>
          <li>Ensure the site works correctly and securely.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Types of Cookies We Use">
        <div className="space-y-4">
          <div>
            <p className="font-medium text-foreground mb-1">Essential Cookies</p>
            <p>
              Required for the website to function. They enable core features
              such as navigation and theme/language persistence. These cannot be
              disabled without breaking the site.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">Analytics Cookies</p>
            <p>
              Help us understand how visitors interact with the site (e.g.
              pages visited, time spent). We may use Google Analytics or a
              privacy-friendly alternative. These are set only with your
              consent.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">Preference Cookies</p>
            <p>
              Store your interface preferences (theme, language) so they persist
              between visits.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="4. Third-Party Cookies">
        <p>
          Third-party services embedded in our website (such as Google Fonts or
          analytics providers) may also set cookies. These are governed by the
          respective third party's cookie and privacy policies, over which we
          have no control.
        </p>
      </LegalSection>

      <LegalSection title="5. Managing Cookies">
        <p>
          You can control and delete cookies through your browser settings. Most
          browsers allow you to:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>View the cookies stored on your device.</li>
          <li>Delete individual cookies or all cookies.</li>
          <li>Block cookies from specific or all websites.</li>
        </ul>
        <p>
          Note that disabling cookies may affect the functionality of this
          website (e.g. theme and language preferences will not be saved).
        </p>
      </LegalSection>

      <LegalSection title="6. Changes to This Policy">
        <p>
          We may update this Cookie Policy periodically. The "last updated" date
          at the top of this page reflects the latest revision. Please check
          back from time to time.
        </p>
      </LegalSection>

      <LegalSection title="7. Contact Us">
        <p>
          If you have questions about our use of cookies, please contact us at:{" "}
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
