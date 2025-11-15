const textGroup = document.querySelectorAll(".text-group");

textGroup.forEach(text => {
    text.addEventListener("click", () => {
        text.classList.toggle("active");
    })
})