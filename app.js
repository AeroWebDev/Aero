let lastScrollTop = 0;
const header = document.querySelector("header");

const modeSwitch = document.getElementById("modeSwitch");
const root = document.documentElement;

window.addEventListener("scroll", function () {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scrolling down
    header.classList.add("header--hidden");
  } else {
    // Scrolling up
    header.classList.remove("header--hidden");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

const snapSections = document.querySelectorAll('.snap-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.target.id === "services" && entry.isIntersecting) {
      console.log("Found cards:", cards.length);
      const cards = entry.target.getElementsByClassName("servcies");
      for (let card of cards) {
        console.log(3);
        card.style.animation = "slideIn 0.8s forwards";
      }
    }

    
    
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.4
});

snapSections.forEach(section => observer.observe(section));

  // استعادة الثيم عند تحميل الصفحة
  if(localStorage.theme === "dark"){
    root.setAttribute("data-theme","dark");
    modeSwitch.classList.replace("fa-moon","fa-sun");
  }

  modeSwitch.addEventListener("click", ()=>{
    const dark = root.getAttribute("data-theme") === "dark";
    if(dark){
      root.removeAttribute("data-theme");
      localStorage.theme = "light";
      modeSwitch.classList.replace("fa-sun","fa-moon");
    }else{
      root.setAttribute("data-theme","dark");
      localStorage.theme = "dark";
      modeSwitch.classList.replace("fa-moon","fa-sun");
    }
  });

const testimonialsData = [
  {name: "Omar", text: "Great team, fast delivery!"},
  {name: "Sara", text: "Beautiful design & clean code."},
  {name: "Ali", text: "Very professional and responsive."},
  {name: "Lina", text: "Loved the modern design approach!"},
  {name: "Hassan", text: "Support was excellent even after project delivery."},
  {name: "Nour", text: "Clean UI, smooth UX. Exactly what I needed."},
  {name: "David", text: "They understood my vision perfectly."},
  {name: "Mona", text: "Website speed and performance are top-notch."},
  {name: "Khaled", text: "Creative team with amazing attention to detail."},
  {name: "Sophia", text: "They delivered earlier than expected!"},
  {name: "Ahmed", text: "My business sales increased after the redesign."},
  {name: "Yara", text: "The communication was clear and easy throughout."},
  {name: "John", text: "They combined design and functionality beautifully."}
];


const container = document.querySelector(".testimonials");
testimonialsData.forEach(t => {
  let div = document.createElement("div");
  div.className = "testimonial";
  div.innerHTML = `<p data-i18n="${t.text}"></p><h4>- ${t.name}</h4>`;
  container.appendChild(div);
});
