const resources = {
  en: {
    translation: {
      // header
      "Home": "Home",
      "Projects": "Projects",
      "Contact Us": "Contact Us",

      // main
      "Get Started": "Get Started",
      "Servcies" : "Our Servcies",
      "Aero – We Build Clean & Powerful Websites": "Aero – We Build Clean & Powerful Websites",

      // footer
      "“Dev team crafting clean digital work.”": "“Dev team crafting clean digital work.”",
      "Privacy Policy": "Privacy Policy",
      "Terms of Service": "Terms of Service",
      "Cookie Policy": "Cookie Policy",
      "PROJECT": "PROJECTS",
      "OUR SERVICES": "OUR SERVICES",

      // contact
      "Let's get in touch": "Let's get in touch",
      "We would love to hear": "We would love to hear from you! You can reach out to us by clicking on any of the links below, or by filling out the forms on the right side of the page.",
      "Contact us": "Contact us",
      "Username": "Username",
      "Email": "Email",
      "Phone (optional)": "Phone (optional)",
      "Message": "Message",
      "Send": "Send",
      "Call": "Call",
      "Send mail": "Send mail!",

      // services
      "UI/UX Design": "UI/UX Design",
      "Designing innovative": "Designing innovative and engaging user interfaces that create memorable experiences and drive user engagement",
      "Web Development": "Web Development",
      "Building responsive": "Building responsive and scalable web applications using modern technologies and best practices",
      "Desktop App Development": "Desktop App Development",
      "Build fast, smart, and reliable": "Build fast, smart, and reliable desktop solutions tailored to your specific business needs",

      "Design": "Design",
      "Starter": "Starter",
      "Business": "Business",
      "Pro": "Pro",
      "Compare": "Compare",

      "What Our Clients Say" : "What Our Clients Say",
      "Great team, fast Work!" : "Great team, fast Work!" ,
      "Beautiful design & clean code." : "Beautiful design & clean code.",
      "Very professional and responsive." : "Very professional and responsive.",

      "We deliver cutting-edge" : "We deliver cutting-edge digital solutions tailored to your business needs",
    }
  },
  ar: {
    translation: {
      "Home": "الرئيسية",
      "Projects": "المشاريع",
      "Contact Us": "اتصل بنا",
      "Get Started": "ابدأ الآن",
      "Servcies" : "خدماتنا",
      "Aero – We Build Clean & Powerful Websites": "Aero – نبني مواقع نظيفة وقوية",
      "“Dev team crafting clean digital work.”": "فريق التطوير يصنع أعمال رقمية نظيفة.",
      "Privacy Policy": "سياسة الخصوصية",
      "Terms of Service": "شروط الخدمة",
      "Cookie Policy": "سياسة الكوكيز",
      "PROJECT": "المشاريع",
      "OUR SERVICES": "خدماتنا",
      "Let's get in touch": "دعنا نتواصل",
      "We would love to hear": "نود أن نسمع منك! يمكنك التواصل معنا من خلال النقر على أي من الروابط أدناه، أو عن طريق ملء النماذج على الجانب الأيمن من الصفحة.",
      "Contact us": "اتصل بنا",
      "Username": "اسم المستخدم",
      "Email": "البريد الإلكتروني",
      "Phone (optional)": "الهاتف (اختياري)",
      "Message": "الرسالة",
      "Send": "إرسال",
      "Call": "اتصل",
      "Send mail": "أرسل بريدًا!",
      "UI/UX Design": "تصميم واجهة المستخدم وتجربة المستخدم",
      "Designing innovative": "تصميم واجهات مستخدم مبتكرة وجذابة",
      "Web Development": "تطوير الويب",
      "Building responsive": "بناء تطبيقات ويب متجاوبة وقابلة للتوسع",
      "Desktop App Development": "تطوير تطبيقات سطح المكتب",
      "Build fast, smart, and reliable": "بناء حلول سطح مكتب سريعة وذكية وموثوقة مصممة حسب احتياجاتك",
      "Press here to see details": "اضغط هنا لرؤية التفاصيل",
      "Design Only": "تصميم فقط",
      "Starter": "المبتدئ",
      "Business": "الأعمال",
      "Pro": "المحترف",
      "Compare": "قارن",
      "What Our Clients Say" : "اراء العملاء السابقون",
      "Great team, fast Work!" : "Great team, fast Work!" ,
      "Beautiful design & clean code." : "Beautiful design & clean code.",
      "Very professional and responsive." :"Very professional and responsive.",
      "We deliver cutting-edge" : "نقدم أحدث الحلول الرقمية المصممة خصيصًا لتلبية احتياجات أعمالك"
    }
  }
};

// Change language function
function changeLang(lang) {
  i18next.changeLanguage(lang, () => {
    updateContent();
  });
  setFlag(lang);
  localStorage.setItem("lang", lang);
}

// Update content in page + iframes
function updateContent() {
  // Main document
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = i18next.t(key);
  });

  // Inside iframes (same-origin only)
  document.querySelectorAll("iframe").forEach(frame => {
    try {
      const doc = frame.contentDocument || frame.contentWindow.document;
      if (doc) {
        doc.querySelectorAll("[data-i18n]").forEach(el => {
          const key = el.getAttribute("data-i18n");
          el.innerHTML = i18next.t(key);
        });
      }
    } catch (e) {
      console.warn("Cannot access iframe due to cross-origin:", frame.src);
    }
  });
}

// Flag setter
function setFlag(lang) {
  const langBtn = document.querySelector(".lang-btn");
  if (!langBtn) return;

  switch (lang) {
    case "ar":
      langBtn.innerHTML = "🇪🇬 العربية <span class='arrow'>▼</span>";
      break;
    case "en":
      langBtn.innerHTML = "🇬🇧 English <span class='arrow'>▼</span>";
      break;
  }
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  i18next.init({
    lng: localStorage.getItem("lang") || "en",
    debug: false,
    resources
  }, function () {
    updateContent();
    setFlag(i18next.language);
  });

  // Dropdown toggle
  const langSwitcher = document.querySelector('.language-switcher');
  const langBtn = document.querySelector('.lang-btn');
  const langMenu = document.querySelector('.lang-menu');

  if (langBtn && langMenu) {
    langBtn.addEventListener('click', () => {
      langSwitcher.classList.toggle('active');
    });

    langMenu.querySelectorAll("li").forEach(li => {
      li.addEventListener("click", () => {
        const newLang = li.getAttribute("data-lang");
        changeLang(newLang);
        langSwitcher.classList.remove("active");
      });
    });
  }

  // Make sure iframes update when they load
  document.querySelectorAll("iframe").forEach(frame => {
    frame.addEventListener("load", () => {
      updateContent();
    });
  });
});
