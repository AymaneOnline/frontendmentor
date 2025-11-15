const shareButton = document.querySelector(".share-button");
const shareOption = document.querySelector(".share-option");

shareButton.addEventListener('click', (event) => {
    event.stopPropagation();
    shareButton.classList.add('active');
    shareOption.classList.add('active');
})

document.addEventListener('click', (event) => {
    // Check if the click is outside of .share-option and not on the .share-button
    if (!shareOption.contains(event.target) && event.target !== shareButton) {
        if (shareOption.classList.contains('active') && shareButton.classList.contains('active')) {
            shareButton.classList.remove('active');
            shareOption.classList.remove('active');
        }
    }
})

// Prevent the click inside the shareOption from triggering the document's click event
shareOption.addEventListener('click', (event) => {
    event.stopPropagation();
});
