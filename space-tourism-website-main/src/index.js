document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const openMenuBtn = document.getElementById('open-menu-btn');
    const menuNav = document.getElementById('menu-nav');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const homeBtn = document.getElementById('home-btn');
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    openMenuBtn.addEventListener('click', () => {
        menuNav.classList.remove('translate-x-[254px]');
        menuNav.classList.add('translate-x-0');
        menuNav.setAttribute('tabindex', '0');
        menuNav.removeAttribute('inert');
    });

    closeMenuBtn.addEventListener('click', () => {
        menuNav.classList.add('translate-x-[254px]');
        menuNav.classList.remove('translate-x-0');
        menuNav.setAttribute('tabindex', '-1');
        menuNav.setAttribute('inert', '');
    });

    homeBtn.addEventListener('click', () => {
        menuNav.classList.add('translate-x-[254px]');
        menuNav.classList.remove('translate-x-0');
        menuNav.setAttribute('tabindex', '-1');
        menuNav.setAttribute('inert', '');
    });

    function toggleInert(e) {
      menuNav.inert = !e.matches; // This sets inert = true on md and up
    }

    toggleInert(mediaQuery);
    mediaQuery.addListener(toggleInert);
});


// Helper: toggle multiple classes on an element
function toggleClasses(el, classes) {
  classes.forEach(cls => el.classList.toggle(cls));
}

// Helper: remove multiple classes on an element
function removeClasses(el, classes) {
  classes.forEach(cls => el.classList.remove(cls));
}

// Helper: add multiple classes on an element
function addClasses(el, classes) {
  classes.forEach(cls => el.classList.add(cls));
}