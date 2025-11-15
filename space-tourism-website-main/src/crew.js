document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const openMenuBtn = document.getElementById('open-menu-btn');
    const menuNav = document.getElementById('menu-nav');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const crewBtn = document.getElementById('crew-btn');
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

    crewBtn.addEventListener('click', () => {
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


    const crewList = document.getElementById('crew-list');
    const crewItems = crewList.querySelectorAll('button');
    const crewName = document.getElementById('crew-name');
    const crewImg = document.getElementById('crew-img');
    const crewRole = document.getElementById('crew-role');
    const crewBio = document.getElementById('crew-bio');

    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Use the JSON data here
        crewItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                crewImg.setAttribute('src', data.crew[index].images['png']);
                crewName.innerText = data.crew[index].name;
                crewRole.innerText = data.crew[index].role;
                crewBio.innerText = data.crew[index].bio;

                addClasses(item, ['bg-white']);
                removeClasses(item, ['cursor-pointer', 'bg-[rgba(255,255,255,0.5)]', 'hover:bg-white', 'transition-colors', 'duration-300', 'ease-in']);

                crewItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        removeClasses(otherItem, ['bg-white']);
                        addClasses(otherItem, ['cursor-pointer', 'bg-[rgba(255,255,255,0.5)]', 'hover:bg-white', 'transition-colors', 'duration-300', 'ease-in']);
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