const navToggle = document.getElementById('navToggle');
const navToggleOpen = document.getElementById('navToggleOpen');
const navToggleClose = document.getElementById('navToggleClose');
const navList = document.getElementById('navList');
const overlay = document.getElementById('overlay');

navToggle.addEventListener('click', () => {
  if (navList.classList.contains('hidden')) {
    navList.classList.remove('hidden');
    overlay.style.display = 'block';
    navToggleOpen.classList.add('hidden');
    navToggleClose.classList.remove('hidden');
  } else {
    navList.classList.add('hidden');
    overlay.style.display = 'none';
    navToggleOpen.classList.remove('hidden');
    navToggleClose.classList.add('hidden');
  }
});

const heroTrackMobile = document.querySelector('.hero__mobile .hero__track');
const heroTrackDesktop = document.querySelector('.hero__desktop .hero__track');
const featuresTrack = document.querySelector('.features__track');
const prevBtn = document.getElementById('featuresPrev');
const nextBtn = document.getElementById('featuresNext');

let currentIndex = 0;
const maxIndex = 2;

function updateCarousel() {
  const offset = -currentIndex * 100;
  heroTrackMobile.style.transform = `translateX(${offset}%)`;
  heroTrackDesktop.style.transform = `translateX(${offset}%)`;
  featuresTrack.style.transform = `translateX(${currentIndex * -33.3}%)`;

  // Accessibility: Manage focus and aria-hidden for features items
  const slides = featuresTrack.querySelectorAll('.features__item');

  slides.forEach((slide, index) => {
    if (index === currentIndex) {
      slide.setAttribute('aria-hidden', 'false');
      slide.querySelectorAll('a, button, input, [tabindex]').forEach(el => {
        el.tabIndex = 0; // Focusable
      });
    } else {
      slide.setAttribute('aria-hidden', 'true');
      slide.querySelectorAll('a, button, input, [tabindex]').forEach(el => {
        el.tabIndex = -1; // Not focusable
      });
    }
  });
}

let autoSlide = setInterval(() => {
  currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
  updateCarousel();
}, 5000);

function stopAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = null;
}

prevBtn.addEventListener('click', () => {
  stopAutoSlide();
  currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  stopAutoSlide();
  currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
  updateCarousel();
});

updateCarousel();