const openMenuBtn = document.getElementById('open-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.overlay');

openMenuBtn.addEventListener('click', (e) => {
    mobileMenu.classList.remove('hidden-nav');
    overlay.classList.add('show-overlay');
});

closeMenuBtn.addEventListener('click', (e) => {
    mobileMenu.classList.add('hidden-nav')
    overlay.classList.remove('show-overlay');
})