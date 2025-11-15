const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const logo = document.getElementById('logo');
const headerDiv = document.getElementById('headerDiv');
const loginBtn = document.getElementById('login-btn');

const filledElements = logo.querySelectorAll('[fill]');
const originalFills = Array.from(filledElements).map(el => el.getAttribute('fill'));

let filled = false;

menuBtn.addEventListener('click', toggleMenu);


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

function toggleMenu() {
  // Toggle scroll lock on document and body
  toggleClasses(document.documentElement, ['overflow-hidden']);
  toggleClasses(document.body, ['overflow-hidden']);

  // Toggle multiple classes on menu
  toggleClasses(menu, [
    'bg-blue-950', 'opacity-90', 'flex-col', 'absolute', 'z-11', 
    'top-0', 'right-0', 'w-full', 'h-screen', 'justify-between'
  ]);

  // Toggle header margin
  toggleClasses(headerDiv, ['mt-[145px]']);

  // Toggle menu button position classes
  toggleClasses(menuBtn, ['absolute', 'top-11', 'right-6']);

  // Toggle icons inside the button
  const menuBtnIcons = menuBtn.querySelectorAll('svg');
  menuBtnIcons.forEach(icon => icon.classList.toggle('hidden'));

  // Update logo fills
  filledElements.forEach((el, i) => {
    el.setAttribute('fill', filled
      ? originalFills[i]
      : (i === filledElements.length - 1 ? '#172554' : '#ffffff'));
  });
  filled = !filled;

  // Toggle menu lists
  const menuLists = menu.querySelectorAll('ul');
  menuLists.forEach(list => {
    list.classList.toggle('hidden');
    list.addEventListener('click', toggleMenu);
  });

  toggleClasses(menuLists[0], ['mt-10', 'flex', 'flex-col']);
  toggleClasses(menuLists[1], ['flex', 'justify-center', 'items-center', 'mt-auto', 'gap-10']);

  // Toggle login button visibility
  loginBtn.classList.toggle('hidden');
  loginBtn.addEventListener('click', toggleMenu);

  // Update aria-expanded attribute (true if menuLists[0] visible)
  const isExpanded = !menuLists[0].classList.contains('hidden');
  menuBtn.setAttribute('aria-expanded', isExpanded.toString());
}

const featuresNav = document.getElementById("features-nav-list");
const featuresNavItems = featuresNav.querySelectorAll("li");
const featuresImages = document.querySelectorAll(".feature-image");
const featuresTexts = document.querySelectorAll(".feature-text");

featuresNavItems.forEach((item, index) => {
    // Function to handle the common logic for both click and Enter keydown
    const handleItemActivation = () => {
        // Activate selected nav item
        addClasses(featuresNavItems[index], [
            "after:content-['']",
            "after:absolute",
            "after:bg-red-400",
            "after:w-[8rem]",
            "after:h-1",
            "after:bottom-0",
            "after:left-1/2",
            "after:-translate-x-1/2",
            "sm:after:w-full",
            "sm:text-blue-950"
        ]);
        removeClasses(featuresNavItems[index], ["text-gray-500"]);

        // Deactivate other nav items
        featuresNavItems.forEach((otherItem, otherIndex) => {
            if (otherItem !== item) {
                removeClasses(otherItem, [
                    "after:content-['']",
                    "after:absolute",
                    "after:bg-red-400",
                    "after:w-[8rem]",
                    "after:h-1",
                    "after:bottom-0",
                    "after:left-1/2",
                    "after:-translate-x-1/2",
                    "sm:after:w-full",
                    "sm:text-blue-950"
                ]);
                addClasses(otherItem, ["text-gray-500"]);
            }
        });

        // Deactivate all feature images and texts first
        featuresImages.forEach((img, i) => {
            if (i !== index) {
                img.classList.remove('z-10', 'opacity-100');
                img.classList.add('z-0', 'opacity-0');
            }
        });

        featuresTexts.forEach((text, i) => {
            if (i !== index) {
                text.classList.remove('opacity-100');
                text.classList.add('absolute');
                text.classList.add('opacity-0');
            }
        });

        // Activate selected feature image and text
        featuresImages[index].classList.add('z-10', 'opacity-100');
        featuresImages[index].classList.remove('opacity-0');

        featuresTexts[index].classList.add('opacity-100');
        featuresTexts[index].classList.remove('opacity-0');
        featuresTexts[index].classList.remove('absolute');
    };

    // Mouse click
    item.addEventListener("click", handleItemActivation);

    // Keyboard: Enter key
    item.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleItemActivation();
        }
    });
});


const questions = document.querySelectorAll('.question');

questions.forEach((q) => {
    q.addEventListener('click', () => {
        const answer = q.nextElementSibling;
        const arrow = q.querySelector('span');
        const isExpanded = q.getAttribute('aria-expanded') === 'true';
                
        // Toggle ARIA attributes
        q.setAttribute('aria-expanded', !isExpanded);
        answer.setAttribute('aria-hidden', isExpanded);
                
        if (isExpanded) {
            // Closing: set max-height to 0
            answer.style.maxHeight = '0px';
            answer.classList.remove('pt-2', 'pb-8');
        } else {
            // Opening: calculate actual height and set it
            answer.classList.add('pt-2', 'pb-8');
            const scrollHeight = answer.scrollHeight;
            answer.style.maxHeight = scrollHeight + 'px';
        }
                
        toggleClasses(arrow, ['rotate-180']);
    });
            
    // Add keyboard support
    q.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            q.click();
        }
    });
});

const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('email');
const emailHelp = document.getElementById('emailHelp');
const emailAlert = document.getElementById('emailAlert');

emailForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual form submission

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        addClasses(emailInput, ['border-2', 'border-red-400', 'rounded-t-md']);
        removeClasses(emailInput, ['rounded-md']);
        removeClasses(emailHelp, ['hidden']);
        removeClasses(emailAlert, ['hidden']);
    } else {
        removeClasses(emailInput, ['border-2', 'border-red-400', 'rounded-t-md']);
        addClasses(emailHelp, ['hidden']);
        addClasses(emailAlert, ['hidden']);
        emailInput.value = null;
    }
});