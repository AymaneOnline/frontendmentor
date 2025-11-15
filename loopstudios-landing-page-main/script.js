const navBtn = document.getElementById('nav-btn');
const navMenu = document.getElementById('nav-menu');

navBtn.addEventListener('click', () => {
    const activeImage = navBtn.querySelector('.nav__btn-icon--active');
    const hiddenImage = navBtn.querySelector('.nav__btn-icon:not(.nav__btn-icon--active)');

    activeImage.classList.remove('nav__btn-icon--active');
    hiddenImage.classList.add('nav__btn-icon--active');
    navMenu.classList.toggle('nav__list--active');

    document.body.classList.toggle('--hiddenOverflow');
})