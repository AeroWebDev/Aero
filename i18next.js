function changeLang(lang) {
    i18next.changeLanguage(lang, updateContent);
}

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
            
        }
      }
    };



i18next.init({
        lng: 'en',
        debug: false,
        resources
    }, function() {
      updateContent();
});

function updateContent() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.innerHTML = i18next.t(key);
    });
}

changeLang('ar'); // Set default language
// document.querySelectorAll(".headerLink").forEach(link => {
//     link.addEventListener("click", function() {
//         const lang = this.getAttribute("data-lang");
//         if (lang) {
//             changeLang(lang);
//         }
//     });
// });
// document.querySelectorAll(".lang-switch").forEach(button => {
//     button.addEventListener("click", function() {
//         const lang = this.getAttribute("data-lang");
//         changeLang(lang);
//     });
// }