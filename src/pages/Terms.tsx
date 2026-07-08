import { useTranslation } from "react-i18next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export default function Terms() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  if (isArabic) {
    return (
      <LegalLayout
        title="شروط الخدمة"
        subtitle="يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا."
        lastUpdated="يونيو 2026"
        canonicalPath="/terms"
      >
        <LegalSection title="1. قبول الشروط">
          <p>
            بدخولك إلى موقع "أيرو تيم" (Aero Team) أو استخدامك لبرمجياتنا أو خدماتنا الرقمية، فإنك توافق على الالتزام بشروط الخدمة هذه، بالإضافة إلى سياسة الخصوصية وسياسة ملفات تعريف الارتباط الخاصة بنا. إذا كنت لا توافق على هذه الشروط، فيرجى التوقف عن استخدام خدماتنا فوراً.
          </p>
        </LegalSection>

        <LegalSection title="2. وصف الخدمات">
          <p>
            يقدم فريق "أيرو تيم" خدمات متخصصة في تطوير الويب، تصميم واجهات وتجربة المستخدم (UI/UX)، تطوير منصات SaaS، الاستشارات التقنية، وتطوير المنتجات الرقمية. يتم تحديد نطاق العمل، الجداول الزمنية، الميزانية، والمخرجات لكل مشروع بموجب اتفاقية مشروع منفصلة يتم توقيعها بين أيرو تيم والعميل.
          </p>
        </LegalSection>

        <LegalSection title="3. مسؤوليات المستخدم">
          <p>عند استخدام موقعنا أو خدماتنا، فإنك توافق على:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>تقديم معلومات اتصال ومشروع دقيقة ومحدثة وكاملة.</li>
            <li>عدم استخدام الموقع أو الخدمات لأي أغراض غير قانونية أو احتيالية.</li>
            <li>عدم محاولة اختراق أو تجاوز أو الوصول غير المصرح به إلى البنية التحتية لموقعنا أو أنظمتنا أو بياناتنا.</li>
            <li>عدم إرسال أو إدخال أي فيروسات أو برمجيات خبيثة أو محتوى رقمي ضار.</li>
          </ul>
        </LegalSection>

        <LegalSection title="4. الملكية الفكرية">
          <p>
            جميع المحتويات المعروضة على هذا الموقع — بما في ذلك الهوية البصرية، الرسومات، النصوص، الأكواد البرمجية، التصاميم، والبرمجيات — هي ملكية حصرية لفريق "أيرو تيم" ومحمية بموجب قوانين حقوق النشر والعلامات التجارية والملكية الفكرية الدولية.
          </p>
          <p>
            تخضع الأكواد المصدرية والتصاميم النهائية المسلمة للعملاء بموجب اتفاقية مشروع لشروط الملكية المحددة في ذلك العقد. ما لم يُتفق على خلاف ذلك كتابةً، يحتفظ فريق "أيرو تيم" بالحق في عرض لقطات الشاشة ودراسات الحالة للأعمال المنجزة في معرض أعمالنا المهني.
          </p>
        </LegalSection>

        <LegalSection title="5. الدفع والاسترداد">
          <p>
            يتم تحديد شروط الدفع، ومواعيد الفواتير، والعملات المعتمدة في اتفاقية المشروع الفردية. ما لم يُنص على خلاف ذلك، فإننا نطلب دفعة مقدمة قبل البدء في أي أعمال تطوير. يتم التعامل مع طلبات الاسترداد كل حالة على حدة، وتُحسب بناءً على ساعات العمل المسجلة أو المراحل المنجزة قبل إلغاء المشروع.
          </p>
        </LegalSection>

        <LegalSection title="6. حدود المسؤولية">
          <p>
            إلى أقصى حد يسمح به القانون، لا يتحمل فريق "أيرو تيم" أو شركاؤه أو موظفوه أي مسؤولية عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية (بما في ذلك خسارة الأرباح أو البيانات أو فرص العمل) الناتجة عن استخدام أو عدم القدرة على استخدام هذا الموقع أو خدماتنا. وفي كل الأحوال، لا تتجاوز مسؤوليتنا الإجمالية المبلغ الذي دفعه العميل مقابل الخدمة المحددة محل النزاع.
          </p>
        </LegalSection>

        <LegalSection title="7. إخلاء المسؤولية">
          <p>
            يتم تقديم هذا الموقع ومحتوياته "كما هي" و"كما تتوفر" دون أي ضمانات من أي نوع، سواء كانت صريحة أو ضمنية. نحن لا نضمن أن الموقع سيعمل دون انقطاع، أو أنه سيكون خالياً من الأخطاء، أو خالياً تماماً من الفيروسات أو التهديدات الأمنية.
          </p>
        </LegalSection>

        <LegalSection title="8. إنهاء الخدمة">
          <p>
            نحتفظ بالحق، دون إشعار مسبق أو مسؤولية قانونية، في تعليق أو إنهاء أو تقييد وصولك إلى موقعنا أو خدماتنا بسبب أي سلوك نرى، وفقاً لتقديرنا الخاص، أنه ينتهك شروط الخدمة هذه، أو يضر بمستخدمين آخرين، أو يسيء إلى سمعة فريق "أيرو تيم".
          </p>
        </LegalSection>

        <LegalSection title="9. القانون الواجب التطبيق">
          <p>
            تخضع شروط الخدمة هذه وتُفسر وفقاً لقوانين جمهورية مصر العربية. وتخضع أي نزاعات أو مطالبات قانونية تنشأ عنها للاختصاص القضائي الحصري للمحاكم المختصة في القاهرة، مصر.
          </p>
        </LegalSection>

        <LegalSection title="10. التغييرات على هذه الشروط">
          <p>
            نحتفظ بالحق في مراجعة أو تحديث شروط الخدمة هذه في أي وقت. وتصبح التغييرات سارية المفعول فور نشرها. ويشكل استمرار استخدامك للموقع أو الخدمات بعد هذا التحديث قبولاً منك للشروط المعدلة.
          </p>
        </LegalSection>

        <LegalSection title="11. اتصل بنا">
          <p>
            إذا كانت لديك أي أسئلة أو بحاجة إلى استفسار بشأن شروط الخدمة هذه، يرجى التواصل معنا عبر:{" "}
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
      title="Terms of Service"
      subtitle="Please read these terms carefully before using our services."
      lastUpdated="June 2026"
      canonicalPath="/terms"
    >
      <LegalSection title="1. Acceptance of Terms">
        <p>
          By accessing or using the Aero Team website, software, or digital services, you agree to be bound by these Terms of Service, along with our Privacy Policy and Cookie Policy. If you do not agree to all of these terms, you are prohibited from using our services.
        </p>
      </LegalSection>

      <LegalSection title="2. Services Description">
        <p>
          Aero Team provides specialized web development, custom UI/UX design, SaaS development, technical consulting, and digital product services. The detailed scope, timeline, budget, and deliverables of any project are governed by a separate, bilateral Project Agreement or Statement of Work signed between Aero Team and the client.
        </p>
      </LegalSection>

      <LegalSection title="3. User Responsibilities">
        <p>When utilizing our website, client portals, or services, you agree to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Provide accurate, current, and complete contact and project information.</li>
          <li>Abstain from utilizing the website or services for any unlawful, deceptive, or fraudulent purposes.</li>
          <li>Not attempt to breach, bypass, or gain unauthorized access to our web infrastructure, systems, or data.</li>
          <li>Not transmit or introduce viruses, malware, or any other destructive digital content.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Intellectual Property">
        <p>
          All content featured on this website—including but not limited to brand identity, graphics, text, custom illustrations, code structure, layouts, and software—is the exclusive property of Aero Team and is protected by international copyright, trademark, and intellectual property laws.
        </p>
        <p>
          Final source code and design assets delivered to clients under a signed Project Agreement will be subject to the ownership terms defined in that specific contract. Unless explicitly agreed otherwise in writing, Aero Team retains the right to display screenshots and case studies of completed work in our professional portfolio.
        </p>
      </LegalSection>

      <LegalSection title="5. Payment and Refunds">
        <p>
          Payment milestones, invoice schedules, and currency specifications are defined in the individual Project Agreement. Unless stated otherwise, a retainer deposit is required before any development work begins. Refunds are handled on a case-by-case basis and are calculated based on the hours logged or milestones achieved prior to any project cancellation.
        </p>
      </LegalSection>

      <LegalSection title="6. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Aero Team, its partners, and employees shall not be liable for any direct, indirect, incidental, special, or consequential damages (including loss of profits, data, or business opportunities) arising out of or in connection with the use or inability to use this website, portfolio, or our services. In no event shall our total aggregate liability exceed the total amount paid by the client for the specific service under dispute.
        </p>
      </LegalSection>

      <LegalSection title="7. Disclaimers">
        <p>
          This website and all contents are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not guarantee that the website will run uninterrupted, be error-free, or be completely free of security threats or viruses.
        </p>
      </LegalSection>

      <LegalSection title="8. Termination">
        <p>
          We reserve the right, without prior notice or liability, to suspend, terminate, or restrict your access to our website or services for any conduct that we determine, in our sole discretion, violates these Terms of Service, harms other users, or damages the reputation of Aero Team.
        </p>
      </LegalSection>

      <LegalSection title="9. Governing Law">
        <p>
          These Terms of Service are governed by and construed in accordance with the laws of the Arab Republic of Egypt. Any legal disputes or claims arising out of these terms shall be subject to the exclusive jurisdiction of the competent courts in Cairo, Egypt.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to These Terms">
        <p>
          We reserve the right to revise or update these Terms of Service at any time. Any changes will become effective immediately upon posting. Your continued use of our website or services after such updates constitutes your acceptance of the revised terms.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact Us">
        <p>
          If you have any questions or require clarification regarding these Terms of Service, please contact us at:{" "}
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
