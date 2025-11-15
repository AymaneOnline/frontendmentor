document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const openMenuBtn = document.getElementById('open-menu-btn');
    const menuNav = document.getElementById('menu-nav');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const destinationBtn = document.getElementById('destination-btn');
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

    destinationBtn.addEventListener('click', () => {
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


    const destinationList = document.getElementById('destination-list');
    const destinationItems = destinationList.querySelectorAll('button');
    const destinationImg = document.getElementById('destination-img');
    const destinationName = document.getElementById('destination-name');
    const destinationDesc = document.getElementById('destination-desc');
    const destinationDistance = document.getElementById('destination-distance'); 
    const destinationTravel = document.getElementById('destination-travel'); 
    const separator = document.getElementById('separator');

    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Use the JSON data here
        destinationItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                destinationImg.setAttribute('src', data.destinations[index].images['png']);
                destinationName.innerText = data.destinations[index].name;
                destinationDesc.innerText = data.destinations[index].description;
                destinationDistance.innerText = data.destinations[index].distance;
                destinationTravel.innerText = data.destinations[index].travel;

                addClasses(item, ['border-b-[3px]' ,'text-white']);
                removeClasses(item, ['cursor-pointer', 'border-transparent', 'hover:border-[rgba(255,255,255,0.5)]', 'hover:border-b-[1px]', 'transition-colors', 'duration-300', 'ease-in']);

                destinationItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        removeClasses(otherItem, ['border-b-[3px]' ,'text-white']);
                        addClasses(otherItem, ['cursor-pointer', 'border-transparent', 'hover:border-[rgba(255,255,255,0.5)]', 'hover:border-b-[1px]', 'transition-colors', 'duration-300', 'ease-in']);
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