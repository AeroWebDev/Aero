const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    console.log(entry);
  });
}, {
  threshold: 0.4
});


servcies.forEach(section => observer.observe(section));