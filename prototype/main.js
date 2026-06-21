/* ============================================================
   Aero Studio — Prototype JavaScript
   Handles mobile menu toggle and any interactive UI behaviours
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile menu toggle ─────────────────────────────────── */
  const menuIcon   = document.getElementById('mobile-menu-icon');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuIcon && mobileMenu) {
    menuIcon.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('hidden');
      menuIcon.textContent = isOpen ? 'menu' : 'close';
    });
  }

  /* ── Contact form submission (placeholder) ───────────────── */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Message Sent ✓';
      btn.disabled = true;
      btn.style.opacity = '0.7';
    });
  }

});
