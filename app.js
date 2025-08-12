let lastScrollTop = 0;
const header = document.querySelector("header");

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