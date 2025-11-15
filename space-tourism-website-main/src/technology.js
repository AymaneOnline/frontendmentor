document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const openMenuBtn = document.getElementById('open-menu-btn');
    const menuNav = document.getElementById('menu-nav');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const technologyBtn = document.getElementById('technology-btn');
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

    technologyBtn.addEventListener('click', () => {
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


    const technologyList = document.getElementById('technology-list');
    const technologyItems = technologyList.querySelectorAll('button');
    const technologyName = document.getElementById('technology-name');
    const technologyImg = document.getElementById('technology-img');
    const technologyDesc = document.getElementById('technology-desc');

    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Use the JSON data here
        technologyItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                technologyImg.setAttribute('src', data.technology[index].images['portrait']);
                technologyName.innerText = data.technology[index].name;
                technologyDesc.innerText = data.technology[index].description;

                addClasses(item, ['text-[#0B0D17]', 'bg-white']);
                removeClasses(item, ['text-white', 'hover:outline-white', 'cursor-pointer', 'outline-1', 'outline-[rgba(255,255,255,0.25)]', 'transition-colors', 'duration-300', 'ease-in']);

                technologyItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        removeClasses(otherItem, ['text-[#0B0D17]', 'bg-white']);
                        addClasses(otherItem, ['text-white', 'hover:outline-white', 'cursor-pointer', 'outline-1', 'outline-[rgba(255,255,255,0.25)]', 'transition-colors', 'duration-300', 'ease-in']);
                    }
                });
            });
        })
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });
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