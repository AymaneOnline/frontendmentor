// 🟢 Mobile Navigation
// Toggles mobile menu and overlay visibility
document.getElementById('open-menu').addEventListener('click', () => toggleMenu(true));
document.getElementById('close-menu').addEventListener('click', () => toggleMenu(false));

function toggleMenu(isOpen) {
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('overlay');

    // Toggle visibility classes based on the isOpen flag
    mobileNav.classList.toggle('show-mobile-nav', isOpen);
    overlay.classList.toggle('show-overlay', isOpen);
}

// 🛒 Cart Toggle
// Shows or hides the cart dropdown when the cart icon is clicked
document.getElementById('cart').addEventListener('click', () => {
    const cartBox = document.getElementById('cart-box');
    cartBox.classList.toggle('hidden');
});

// 🔢 Quantity Input Controls
// Buttons and input control for changing product quantity
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const quantityInput = document.getElementById('quantity');

// Adjust quantity when minus or plus is clicked
minusBtn.addEventListener('click', () => updateQuantity(-1));
plusBtn.addEventListener('click', () => updateQuantity(1));

// Ensure quantity stays within 0-10 range when manually edited
quantityInput.addEventListener('input', enforceQuantityLimits);

function updateQuantity(change) {
    let newValue = parseInt(quantityInput.value) + change;
    quantityInput.value = Math.max(0, Math.min(10, newValue));
}

function enforceQuantityLimits() {
    quantityInput.value = Math.max(0, Math.min(10, quantityInput.value));
}

// 🎠 Carousel Navigation
// Navigate between image slides using next/previous buttons
const mainElement = document.querySelector("main");
mainElement.querySelectorAll("[data-carousel-button]").forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
        const activeSlide = slides.querySelector("[data-active]");

        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        newIndex = (newIndex + slides.children.length) % slides.children.length;

        // Activate new slide and remove the current one
        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    });
});

// 🎠 Carousel Navigation
// Navigate between image slides using next/previous buttons
document.querySelectorAll("[data-carousel-button]").forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");

    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    newIndex = (newIndex + slides.children.length) % slides.children.length;

    // Activate new slide and remove the current one
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});


// 🖼️ Thumbnail Click Handling (Event Delegation)
// Clicking a thumbnail image changes the active slide
mainElement.querySelector("[data-thumbnails]").addEventListener("click", (event) => {
    const button = event.target.closest("[data-thumbnail-button]");
    if (!button) return;

    const index = button.dataset.thumbnailButton;
    const slidesContainer = mainElement.querySelector("[data-slides]");
    const thumbnailContainer = mainElement.querySelector("[data-thumbnails]");
    
    const activeSlide = slidesContainer.querySelector("[data-active]");
    const activeThumbnail = thumbnailContainer.querySelector("[data-active]");

    // Prevent reactivating the already active slide
    if (slidesContainer.children[index] === activeSlide) return;

    // Set the new active slide and thumbnail
    slidesContainer.children[index].dataset.active = true;
    button.dataset.active = true;

    delete activeSlide.dataset.active;
    delete activeThumbnail.dataset.active;
});

// 🛒 Cart Handling
// Handles add-to-cart logic, updates the UI based on quantity
const addCartBtn = document.getElementById("addBtn");
const cartQuantitySpans = document.querySelectorAll(".cart-quantity");
const emptyCart = document.getElementById("empty");
const filledCart = document.getElementById("filled");
const deleteProductBtn = document.getElementById("delete-product");

addCartBtn.addEventListener("click", () => {
    if (quantityInput.value == 0) {
        // Show empty cart if quantity is zero
        cartQuantitySpans.forEach(cartQuantitySpan => {
            cartQuantitySpan.innerHTML = null;
            cartQuantitySpan.classList.add("hidden");
        });
        emptyCart.classList.remove("hidden");
        filledCart.classList.add("hidden");
        return;
    }

    // Show updated quantity in cart and toggle UI
    cartQuantitySpans.forEach(cartQuantitySpan => {
        cartQuantitySpan.innerHTML = quantityInput.value;
        cartQuantitySpan.classList.remove("hidden");
    });

    emptyCart.classList.add("hidden");
    filledCart.classList.remove("hidden");
});

// Handles removing product from cart
deleteProductBtn.addEventListener("click", () => {
    quantityInput.value = 0;

    cartQuantitySpans.forEach(cartQuantitySpan => {
        cartQuantitySpan.innerHTML = null;
        cartQuantitySpan.classList.add("hidden");
    });

    emptyCart.classList.remove("hidden");
    filledCart.classList.add("hidden");
});

// // 🎠 Lightbox Carousel Navigation
// // Opens the lightbox when carousel thumbnails are clicked
// mainElement.querySelectorAll(".carousel ul button").forEach((button) => {
//     button.addEventListener("click", () => {
//         document.getElementById("lightbox").classList.remove("hidden");
//         document.getElementById("overlay").classList.add("show-overlay");

//         // Disable page scroll when lightbox is open
//         document.body.style.overflow = 'hidden';
//     });
// });

// 🎠 Lightbox Carousel Navigation
// Opens the lightbox when carousel thumbnails are clicked, showing the currently active image
mainElement.querySelectorAll(".carousel ul button").forEach((button) => {
    button.addEventListener("click", () => {
        const lightbox = document.getElementById("lightbox");
        const overlay = document.getElementById("overlay");
        
        // Get the index of the active slide in the main carousel
        const mainCarouselSlides = mainElement.querySelector("[data-slides]");
        const activeSlide = mainCarouselSlides.querySelector("[data-active]");
        const activeIndex = [...mainCarouselSlides.children].indexOf(activeSlide);
        
        // Show the lightbox
        lightbox.classList.remove("hidden");
        overlay.classList.add("show-overlay");
        
        // Set the same active slide in the lightbox carousel
        const lightboxSlides = lightbox.querySelector("[data-slides]");
        const lightboxActiveSlide = lightboxSlides.querySelector("[data-active]");
        
        // Remove active state from current lightbox slide
        if (lightboxActiveSlide) {
            delete lightboxActiveSlide.dataset.active;
        }
        
        // Set active state on the correct lightbox slide
        lightboxSlides.children[activeIndex].dataset.active = true;
        
        // If thumbnails exist in lightbox, update those too
        const lightboxThumbnails = lightbox.querySelector("[data-thumbnails]");
        if (lightboxThumbnails) {
            const lightboxActiveThumbnail = lightboxThumbnails.querySelector("[data-active]");
            if (lightboxActiveThumbnail) {
                delete lightboxActiveThumbnail.dataset.active;
            }
            
            // Find the thumbnail with the matching index and activate it
            const thumbnailToActivate = lightboxThumbnails.querySelector(`[data-thumbnail-button="${activeIndex}"]`);
            if (thumbnailToActivate) {
                thumbnailToActivate.dataset.active = true;
            }
        }
        
        // Disable page scroll when lightbox is open
        document.body.style.overflow = 'hidden';
    });
});

// Close the lightbox and re-enable scrolling
document.getElementById("close-lightbox").addEventListener("click", () => {
    document.getElementById("lightbox").classList.add("hidden");
    document.getElementById("overlay").classList.remove("show-overlay");

    document.body.style.overflow = '';
});

document.querySelector("[data-thumbnails]").addEventListener("click", (event) => {
    const button = event.target.closest("[data-thumbnail-button]");
    if (!button) return;

    const index = button.dataset.thumbnailButton;
    const slidesContainer = document.querySelector("[data-slides]");
    const thumbnailContainer = document.querySelector("[data-thumbnails]");
    
    const activeSlide = slidesContainer.querySelector("[data-active]");
    const activeThumbnail = thumbnailContainer.querySelector("[data-active]");

    if (slidesContainer.children[index] === activeSlide) return;

    slidesContainer.children[index].dataset.active = true;
    button.dataset.active = true;

    delete activeSlide.dataset.active;
    delete activeThumbnail.dataset.active;
});
