const resources = {
  en: {
    translation: {
      "Home": "Home",
      "Projects": "Projects",
      "Contact Us": "Contact Us",
      "Get Started": "Get Started",
      "Aero – We Build Clean & Powerful Websites": "Aero – We Build Clean & Powerful Websites",
      "“Dev team crafting clean digital work.”": "“Dev team crafting clean digital work.”",
      "Privacy Policy": "Privacy Policy",
      "Terms of Service": "Terms of Service",
      "Cookie Policy": "Cookie Policy",
      "PROJECT": "PROJECTS",
      "OUR SERVICES": "OUR SERVICES",
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
      "UI/UX Design": "UI/UX Design",
      "Designing  initiative": "Designing innovative and engaging user interfaces",
      "Web Development": "Web Development",
      "Busing responsive": "Building responsive and scalable web applications",
      "DeskTop app Development": "Desktop App Development",
      "Build fast, smart, and reliable": "Build fast, smart, and reliable desktop solutions tailored to your needs",
      "press here to see details": "Press here to see details",
      "Design Only": "Design Only",
      "Starter": "Starter",
      "Business": "Business",
      "Pro": "Pro",
      "commpare": "Commpare",
    }
  },
  ar: {
    translation: {
      "Home": "الرئيسية",
      "Projects": "المشاريع",
      "Contact Us": "اتصل بنا",
      "Get Started": "ابدأ الآن",
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
      "Designing  initiative": "تصميم واجهات مستخدم مبتكرة وجذابة",
      "Web Development": "تطوير الويب",
      "Busing responsive": "بناء تطبيقات ويب متجاوبة وقابلة للتوسع",
      "DeskTop app Development": "تطوير تطبيقات سطح المكتب",
      "Build fast, smart, and reliable": "بناء حلول سطح مكتب سريعة وذكية وموثوقة مصممة حسب احتياجاتك",
      "Press here to see details": "اضغط هنا لرؤية التفاصيل",
      "Design Only": "تصميم فقط",
      "Starter": "المبتدئ",
      "Business": "الأعمال",
      "Pro": "المحترف",
      "commpare": "قارن",
    }
  }
};

function changeLang(lang) {
  i18next.changeLanguage(lang, updateContent);
  console.log(lang);

}


i18next.init({
  lng: 'en',
  debug: false,
  resources
}, function () {
  updateContent();
});

function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = i18next.t(key);
  });
}

changeLang('en');
setFlag('en')

const langSwitch = document.getElementById("langSwitch");
const langFlag = document.getElementById("langPic")

langSwitch.addEventListener("click", () => {
  let getCurruntLang = localStorage.get("lang") || "en";

  switch (getCurruntLang) {
    case "en":
      localStorage.set("lang", "ar");
      changeLang('ar');
      setFlag('ar')
      break;

    case "ar":
      localStorage.set("lang", "en");
      changeLang('en');
      setFlag('en')
      break;
  
    default:
      localStorage.set("lang", "en");
      changeLang('en');
      setFlag('en')
      break;
  }
})

function setFlag(lang) {
  switch (lang) {
    case "ar":
      langFlag.src = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Flag_of_the_Arabic_language.svg";
      break;

    case "en":
      langFlag.src = "https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg";
      break;
  
    default:
      break;
  }
}

// Set default language
document.querySelectorAll(".headerLink").forEach(link => {
    link.addEventListener("click", function() {
        const lang = this.getAttribute("data-lang");
        if (lang) {
            changeLang(lang);
        }
    });
});
document.querySelectorAll(".lang-switch").forEach(button => {
    button.addEventListener("click", function() {
        const lang = this.getAttribute("data-lang");
        changeLang(lang);
    });
}