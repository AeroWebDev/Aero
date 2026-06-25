import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export default function Terms() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Please read these terms carefully before using our services."
      lastUpdated="June 2026"
    >
      <LegalSection title="1. Acceptance of Terms">
        <p>
          By accessing or using the Aero Team website and services, you agree to
          be bound by these Terms of Service. If you do not agree to these
          terms, please do not use our services.
        </p>
      </LegalSection>

      <LegalSection title="2. Services Description">
        <p>
          Aero Team provides web development, UI/UX design, SaaS development,
          and related digital services to clients. The specific scope, timeline,
          and deliverables of any project are defined in a separate project
          agreement between Aero Team and the client.
        </p>
      </LegalSection>

      <LegalSection title="3. User Responsibilities">
        <p>When using our website or services, you agree to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Provide accurate and complete information.</li>
          <li>Not use the site for any unlawful or fraudulent purposes.</li>
          <li>Not attempt to gain unauthorized access to any part of our systems.</li>
          <li>Not transmit harmful, offensive, or disruptive content.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Intellectual Property">
        <p>
          All content on this website — including text, graphics, logos, code,
          and design — is the property of Aero Team and is protected by
          applicable intellectual property laws.
        </p>
        <p>
          Work delivered to clients under a project agreement is subject to the
          ownership terms specified in that agreement. Unless otherwise agreed in
          writing, Aero Team retains the right to display completed work in our
          portfolio.
        </p>
      </LegalSection>

      <LegalSection title="5. Payment and Refunds">
        <p>
          Payment terms are defined in individual project agreements. Unless
          otherwise specified, we require a deposit before work begins.
          Refunds are handled on a case-by-case basis and subject to the work
          completed at the time of cancellation.
        </p>
      </LegalSection>

      <LegalSection title="6. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Aero Team shall not be liable
          for any indirect, incidental, or consequential damages arising out of
          your use of this website or our services. Our total liability shall
          not exceed the amount paid for the specific service in question.
        </p>
      </LegalSection>

      <LegalSection title="7. Disclaimers">
        <p>
          This website is provided "as is" without warranties of any kind,
          either express or implied. We do not warrant that the site will be
          uninterrupted, error-free, or free from viruses.
        </p>
      </LegalSection>

      <LegalSection title="8. Termination">
        <p>
          We reserve the right to terminate or restrict access to our services
          at any time, without notice, for conduct that we believe violates
          these Terms of Service or is harmful to other users, us, or third
          parties.
        </p>
      </LegalSection>

      <LegalSection title="9. Governing Law">
        <p>
          These terms are governed by and construed in accordance with the laws
          of Egypt. Any disputes shall be subject to the exclusive jurisdiction
          of the courts of Cairo, Egypt.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to These Terms">
        <p>
          We may update these Terms of Service at any time. Continued use of
          our website after changes constitutes acceptance of the revised terms.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact Us">
        <p>
          For questions about these Terms, contact us at:{" "}
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
