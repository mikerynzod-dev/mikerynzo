/* ======================================================
   Navbar Dropdown Menu — Vanilla JavaScript only
   Concepts used: querySelector()/getElementById(),
   addEventListener(), classList.toggle()
   No Bootstrap, jQuery, Tailwind JS, or any framework.
   ====================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM element selection
  const workButton = document.querySelector('#workDropdownBtn');
  const workMenu = document.querySelector('#workDropdownMenu');
  const servicesButton = document.getElementById('servicesDropdownBtn');
  const servicesMenu = document.getElementById('servicesDropdownMenu');

  // Bonus 3 — two independent dropdowns
  const dropdowns = [
    { button: workButton, menu: workMenu },
    { button: servicesButton, menu: servicesMenu }
  ].filter(d => d.button && d.menu);

  if (!dropdowns.length) return;

  function setArrow(button, isOpen) {
    const arrow = button.querySelector('[data-dropdown-arrow]');
    if (arrow) arrow.innerHTML = isOpen ? '&#9650;' : '&#9660;'; // Bonus 2: ▼ ↔ ▲
  }

  function closeDropdown(d) {
    d.menu.classList.remove('show');
    d.button.classList.remove('is-open');
    d.button.setAttribute('aria-expanded', 'false');
    setArrow(d.button, false);
  }

  dropdowns.forEach((d) => {
    // 2 & 3. Click event + classList.toggle() to show/hide
    d.button.addEventListener('click', () => {
      dropdowns.forEach((other) => { if (other !== d) closeDropdown(other); });

      const isOpen = d.menu.classList.toggle('show');
      d.button.classList.toggle('is-open', isOpen);
      d.button.setAttribute('aria-expanded', String(isOpen));
      setArrow(d.button, isOpen);
    });

    // Clicking a dropdown item: close menu, scroll to section, flash the matching card
    d.menu.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      closeDropdown(d);

      const targetId = link.dataset.workTarget || link.dataset.serviceTarget;
      if (!targetId) return;
      const card = document.getElementById(targetId);
      if (card) {
        card.classList.add('is-flash');
        setTimeout(() => card.classList.remove('is-flash'), 1500);
      }
    });
  });

  // Bonus 1 — close when clicking outside
  document.addEventListener('click', (e) => {
    dropdowns.forEach((d) => {
      const clickedInside = d.menu.contains(e.target) || d.button.contains(e.target);
      if (!clickedInside) closeDropdown(d);
    });
  });

  // Close with Escape key too
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    dropdowns.forEach(closeDropdown);
  });
});
