import { useTranslation } from "react-i18next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export default function Privacy() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  if (isArabic) {
    return (
      <LegalLayout
        title="سياسة الخصوصية"
        subtitle="كيف نقوم بجمع معلوماتك الشخصية واستخدامها وحمايتها."
        lastUpdated="يونيو 2026"
        canonicalPath="/privacy"
      >
        <LegalSection title="1. المعلومات التي نجمعها">
          <p>
            نقوم بجمع المعلومات الشخصية التي تقدمها لنا طواعية عند استخدام نموذج الاتصال الخاص بنا، بما في ذلك اسمك وبريدك الإلكتروني ووصف مشروعك. نحن لا نطلب تسجيل حساب أو نجمع أي معلومات دفع على هذا الموقع.
          </p>
          <p>
            بالإضافة إلى ذلك، نقوم تلقائياً بجمع بعض البيانات التقنية وبيانات الاستخدام عند زيارتك لموقعنا (مثل عنوان IP، نوع المتصفح، معلومات الجهاز، والصفحات التي تمت زيارتها) من خلال سجلات الخادم القياسية وملفات تعريف الارتباط التحليلية لتحسين أداء الموقع وتجربة المستخدم.
          </p>
        </LegalSection>

        <LegalSection title="2. كيف نستخدم معلوماتك">
          <p>نقوم بمعالجة واستخدام معلوماتك للأغراض التالية:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>الرد على استفساراتك وطلبات المشاريع الخاصة بك.</li>
            <li>صيانة ومراقبة وتحسين أداء ووظائف موقعنا الإلكتروني.</li>
            <li>إرسال تحديثات أو اتصالات متعلقة بطلبك (بناءً على موافقتك الصريحة).</li>
            <li>حماية موقعنا من أي أنشطة احتيالية أو غير مصرح بها وضمان الامتثال للقوانين المعمول بها.</li>
          </ul>
          <p>نحن لا نبيع أو نؤجر أو نشارك بياناتك الشخصية مع أطراف ثالثة لأغراض تجارية أو تسويقية.</p>
        </LegalSection>

        <LegalSection title="3. ملفات تعريف الارتباط والتتبع">
          <p>
            نستخدم ملفات تعريف الارتباط الأساسية لحفظ تفضيلات واجهتك (مثل إعدادات اللغة والمظهر الداكن/المضيء). وبموافقتك, نستخدم أيضاً ملفات تعريف الارتباط التحليلية لتقييم حركة المرور وأنماط استخدام الموقع. يمكنك تخصيص أو تعطيل ملفات تعريف الارتباط عبر إعدادات متصفحك. لمزيد من التفاصيل، يرجى مراجعة <a href="/cookies" className="text-aero-blue hover:underline">سياسة ملفات تعريف الارتباط</a>.
          </p>
        </LegalSection>

        <LegalSection title="4. أمن البيانات">
          <p>
            نتخذ تدابير أمنية تقنية وتنظيمية قياسية لحماية بياناتك الشخصية من الوصول غير المصرح به أو الفقدان أو الإفصاح. يتم تشفير جميع عمليات نقل البيانات باستخدام تقنية SSL/HTTPS الآمنة. ومع ذلك، نود التنويه بأنه لا توجد طريقة نقل أو تخزين إلكتروني عبر الإنترنت آمنة بنسبة 100%، ولا يمكننا ضمان الأمان المطلق.
          </p>
        </LegalSection>

        <LegalSection title="5. الاحتفاظ بالبيانات">
          <p>
            نحتفظ ببيانات نموذج الاتصال فقط للفترة اللازمة لمعالجة ومتابعة استفسارك، وبحد أقصى 12 شهراً، ما لم يتطلب القانون فترة احتفاظ أطول. يتم حذف السجلات التقنية أو إخفاء هوية البيانات الخاصة بها تلقائياً خلال 90 يوماً.
          </p>
        </LegalSection>

        <LegalSection title="6. حقوقك">
          <p>بناءً على موقعك الجغرافي، قد تتمتع بحقوق محددة لحماية البيانات تشمل الحق في:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>الوصول إلى معلوماتك الشخصية التي نحتفظ بها والحصول على نسخة منها.</li>
            <li>طلب تصحيح أي بيانات غير دقيقة أو غير مكتملة.</li>
            <li>طلب مسح أو حذف بياناتك الشخصية.</li>
            <li>الاعتراض على معالجة بياناتك أو طلب تقييدها.</li>
            <li>سحب موافقتك في أي وقت.</li>
          </ul>
          <p>لممارسة أي من هذه الحقوق، يرجى التواصل معنا عبر البريد الإلكتروني الموضح أدناه.</p>
        </LegalSection>

        <LegalSection title="7. خدمات الأطراف الثالثة">
          <p>
            قد يحتوي موقعنا على روابط لخدمات خارجية تقدمها أطراف ثالثة (مثل Vercel للاستضافة، وGoogle Fonts، وGoogle Tag Manager). تعمل هذه الخدمات بشكل مستقل ولديها سياسات خصوصية خاصة بها، ولا نتحمل أي مسؤولية أو التزام تجاه سياساتها أو ممارساتها.
          </p>
        </LegalSection>

        <LegalSection title="8. التغييرات على هذه السياسة">
          <p>
            قد نقوم بتحديث سياسة الخصوصية هذه من حين لآخر لمواكبة التغييرات في ممارساتنا أو المتطلبات القانونية. سيتم نشر أي تحديثات على هذه الصفحة مع تعديل تاريخ "آخر تحديث" في الأعلى. ننصحك بمراجعة هذه الصفحة بشكل دوري.
          </p>
        </LegalSection>

        <LegalSection title="9. اتصل بنا">
          <p>
            إذا كانت لديك أي استفسارات أو ملاحظات أو مخاوف بشأن سياسة الخصوصية هذه، يرجى التواصل معنا عبر:{" "}
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

  // English (improved)
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information."
      lastUpdated="June 2026"
      canonicalPath="/privacy"
    >
      <LegalSection title="1. Information We Collect">
        <p>
          We collect personal information that you voluntarily provide to us when you use our contact form, including your name, email address, and a brief description of your project. We do not require account registration or collect any payment information on this website.
        </p>
        <p>
          Additionally, we automatically collect certain technical and usage details when you visit our website (such as your IP address, browser type, device information, and pages visited) through standard server logs and analytical cookies to improve website performance and user experience.
        </p>
      </LegalSection>

      <LegalSection title="2. How We Use Your Information">
        <p>We process and use your information to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Respond to your inquiries, questions, and project requests.</li>
          <li>Maintain, monitor, and optimize the functionality of our website.</li>
          <li>Share updates or follow-up communications related to your request (subject to your explicit consent).</li>
          <li>Protect our platform from fraudulent, unauthorized, or illegal activities and ensure compliance with applicable regulations.</li>
        </ul>
        <p>We do not sell, rent, lease, or share your personal data with third parties for commercial or marketing purposes.</p>
      </LegalSection>

      <LegalSection title="3. Cookies and Tracking">
        <p>
          We use essential cookies to maintain your interface preferences (such as language and theme settings). With your consent, we also use analytical cookies to evaluate site traffic and user patterns. You can customize, restrict, or disable cookies in your browser settings. For detailed information, please review our <a href="/cookies" className="text-aero-blue hover:underline">Cookie Policy</a>.
        </p>
      </LegalSection>

      <LegalSection title="4. Data Security">
        <p>
          We implement standard technical and organizational security measures to protect your personal data from unauthorized access, loss, or disclosure. All data transmissions are encrypted using Secure Socket Layer (SSL/HTTPS) technology. While we strive to protect your data, please note that no method of online transmission or storage is completely secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="5. Data Retention">
        <p>
          We retain contact form submissions only for as long as necessary to address and process your inquiry, up to a maximum of 12 months, unless a longer retention period is required by law. Technical logs are automatically deleted or anonymized within 90 days.
        </p>
      </LegalSection>

      <LegalSection title="6. Your Rights">
        <p>Depending on your location, you may have specific data protection rights, including the right to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Access and receive a copy of the personal information we hold.</li>
          <li>Request correction of any inaccurate or incomplete data.</li>
          <li>Request the erasure or deletion of your personal data.</li>
          <li>Object to or request restriction of our data processing.</li>
          <li>Withdraw your consent at any time.</li>
        </ul>
        <p>To exercise any of these rights, please contact us at the email address provided below.</p>
      </LegalSection>

      <LegalSection title="7. Third-Party Services">
        <p>
          Our website may contain links to external third-party services (e.g. Vercel for hosting, Google Fonts, and Google Tag Manager). These external services operate independently and have their own privacy practices. We have no control over and assume no responsibility for their policies or actions.
        </p>
      </LegalSection>

      <LegalSection title="8. Changes to This Policy">
        <p>
          We may update our Privacy Policy from time to time to reflect changes in our practices or regulatory requirements. Any updates will be posted on this page with an updated "last updated" date. We recommend checking this page periodically.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact Us">
        <p>
          If you have questions, feedback, or concerns regarding this Privacy Policy, please reach out to us at:{" "}
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
