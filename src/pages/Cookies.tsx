import { useTranslation } from "react-i18next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export default function Cookies() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  if (isArabic) {
    return (
      <LegalLayout
        title="سياسة ملفات تعريف الارتباط"
        subtitle="كيف نستخدم ملفات تعريف الارتباط والتقنيات المشابهة على موقعنا."
        lastUpdated="يونيو 2026"
        canonicalPath="/cookies"
      >
        <LegalSection title="1. ما هي ملفات تعريف الارتباط">
          <p>
            ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة تُخزن على جهاز الكمبيوتر أو الهاتف المحمول عند زيارتك لموقع إلكتروني. وهي تساعد في التعرف على جهازك، وحفظ تفضيلاتك، وجمع البيانات الإحصائية، وتأمين جلستك. ولا يمكن لهذه الملفات تشغيل برامج أو نقل برمجيات ضارة إلى جهازك.
          </p>
        </LegalSection>

        <LegalSection title="2. كيف نستخدم ملفات تعريف الارتباط">
          <p>نستخدم ملفات تعريف الارتباط من أجل:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>حفظ وتثبيت تفضيلات واجهة المستخدم الخاصة بك (مثل الوضع الداكن أو المضيء).</li>
            <li>حفظ لغة التصفح المفضلة لديك (العربية أو الإنجليزية).</li>
            <li>تحليل حركة المرور على الموقع، وتفاعلات المستخدمين، وأداء الصفحات لتحسين محتوانا.</li>
            <li>ضمان عمل موقعنا بشكل آمن وصحيح.</li>
          </ul>
        </LegalSection>

        <LegalSection title="3. أنواع ملفات تعريف الارتباط التي نستخدمها">
          <div className="space-y-4">
            <div>
              <p className="font-medium text-foreground mb-1">ملفات تعريف الارتباط الضرورية</p>
              <p>
                مطلوبة لتشغيل الموقع بشكل صحيح، وتتحكم في العمليات الأساسية مثل التنقل بين الصفحات وحفظ اللغة والمظهر. لا يمكن تعطيل هذه الملفات.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">ملفات تعريف الارتباط التحليلية</p>
              <p>
                تساعدنا في فهم كيفية تفاعل الزوار مع الموقع (مثل الصفحات الأكثر زيارة، ومدة البقاء). نحن نستخدم Google Tag Manager وGoogle Analytics لهذا الغرض، ولا يتم تشغيلها إلا بعد الحصول على موافقتك.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">ملفات تعريف الارتباط للتفضيلات</p>
              <p>
                تقوم بحفظ إعداداتك المخصصة (كلغة التصفح ومظهر الموقع) بحيث لا تحتاج إلى إعادة ضبطها في زياراتك القادمة.
              </p>
            </div>
          </div>
        </LegalSection>

        <LegalSection title="4. ملفات تعريف الارتباط التابعة لأطراف ثالثة">
          <p>
            يتم تشغيل بعض الميزات المدمجة في موقعنا (مثل خطوط Google أو نصوص التتبع والتحليل) بواسطة مزودي خدمات خارجيين. قد يضع هؤلاء المزودون ملفات تعريف ارتباط خاصة بهم على جهازك، وتخضع لسياساتهم الخاصة. ونحن لا نملك القدرة على الوصول إلى هذه الملفات أو التحكم فيها.
          </p>
        </LegalSection>

        <LegalSection title="5. إدارة ملفات تعريف الارتباط">
          <p>
            يمكنك إدارة ملفات تعريف الارتباط أو حظرها أو حذفها في أي وقت عبر إعدادات متصفحك. تتيح لك معظم المتصفحات:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>استعراض ملفات تعريف الارتباط المخزنة حالياً وحذفها بشكل فردي.</li>
            <li>حظر ملفات تعريف الارتباط الخاصة بالأطراف الثالثة أو حظر كافة ملفات تعريف الارتباط تماماً.</li>
            <li>مسح جميع ملفات تعريف الارتباط تلقائياً عند إغلاق المتصفح.</li>
          </ul>
          <p>
            يرجى العلم بأنه إذا اخترت تعطيل ملفات تعريف الارتباط، فقد لا تعمل بعض أجزاء موقعنا بشكل صحيح، ولن تُحفظ تفضيلاتك (مثل اللغة أو وضع المظهر) في زيارتك القادمة.
          </p>
        </LegalSection>

        <LegalSection title="6. التغييرات على هذه السياسة">
          <p>
            قد نقوم بتحديث سياسة ملفات تعريف الارتباط هذه بشكل دوري لتعكس التغييرات في التقنيات المستخدمة، أو ممارسات العمل، أو الإرشادات القانونية. وسيتم نشر أي تحديثات على هذه الصفحة مع تعديل تاريخ "آخر تحديث".
          </p>
        </LegalSection>

        <LegalSection title="7. اتصل بنا">
          <p>
            إذا كانت لديك أي استفسارات أو بحاجة إلى تفاصيل حول كيفية استخدامنا لملفات تعريف الارتباط، يرجى التواصل معنا عبر:{" "}
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
      title="Cookie Policy"
      subtitle="How we use cookies and similar technologies on our website."
      lastUpdated="June 2026"
      canonicalPath="/cookies"
    >
      <LegalSection title="1. What Are Cookies">
        <p>
          Cookies are small text files stored on your computer or mobile device when you visit a website. They serve to recognize your device, remember preferences, compile statistical data, and secure your session. Cookies cannot execute programs or deliver malware to your device.
        </p>
      </LegalSection>

      <LegalSection title="2. How We Use Cookies">
        <p>We use cookies to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Persist your user interface preferences (such as light/dark theme settings).</li>
          <li>Save your language toggle preference (English or Arabic).</li>
          <li>Analyze website traffic, user interactions, and page performance to refine our content.</li>
          <li>Ensure our website runs securely and functions correctly.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Types of Cookies We Use">
        <div className="space-y-4">
          <div>
            <p className="font-medium text-foreground mb-1">Essential Cookies</p>
            <p>
              Necessary for the website to run. They handle basic operations like page navigation and theme/language persistence. These cannot be disabled.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">Analytics Cookies</p>
            <p>
              Help us track how users interact with the site (e.g. pages visited, duration, traffic channels). We use Google Tag Manager and Google Analytics for this. These cookies are set only with your consent.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">Preference Cookies</p>
            <p>
              Remember your custom settings (language, theme) so you don't have to re-configure them on subsequent visits.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="4. Third-Party Cookies">
        <p>
          Certain features or integrations on our site (such as Google Fonts or analytics tracking scripts) are operated by third-party providers. These providers may place cookies on your device, which are subject to their respective cookie policies. We do not have access or control over these third-party cookies.
        </p>
      </LegalSection>

      <LegalSection title="5. Managing Cookies">
        <p>
          You can manage, block, or delete cookies at any time through your browser settings. Most browsers give you the ability to:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>See what cookies are currently stored and delete them individually.</li>
          <li>Block third-party cookies or block all cookies completely.</li>
          <li>Automatically clear all cookies when you close your browser.</li>
        </ul>
        <p>
          Please note that if you choose to disable or block cookies, certain aspects of our website may not function properly, and your preferences (like language or dark mode) will not persist between visits.
        </p>
      </LegalSection>

      <LegalSection title="6. Changes to This Policy">
        <p>
          We may update this Cookie Policy periodically to reflect changes in our technology, business practices, or compliance guidelines. Updates will be posted on this page with the updated "last updated" date.
        </p>
      </LegalSection>

      <LegalSection title="7. Contact Us">
        <p>
          If you have any inquiries or require details on how we use cookies, please contact us at:{" "}
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
