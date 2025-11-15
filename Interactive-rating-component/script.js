const mainContainer = document.getElementById("main");
const thanksContainer = document.getElementById("thanks");
const scoreBtn = document.querySelector(".button-bg");
const submitBtn = document.getElementById("submit");
const rates = document.querySelectorAll(".button");
const rating = document.getElementById("rating");


submitBtn.addEventListener("click", () => {
    thanksContainer.classList.remove("hidden");
    mainContainer.style.display = "none";
})

rates.forEach((rate) => {
    rate.addEventListener("click", () => {
        rating.innerHTML = rate.innerHTML;
    })
});