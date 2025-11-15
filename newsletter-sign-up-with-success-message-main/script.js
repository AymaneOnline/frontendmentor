const form = document.getElementById('form');
const signUp = document.querySelector('.sign-up');
const emailInput = document.querySelector('#email');
const errorMessage = document.querySelector('.error-message');
const successMessage = document.getElementById('success-message');
const successEmail = document.getElementById('success-email');
const dismissBtn = document.getElementById('dismiss-btn');

function validateEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
}

function handleSubmit(event) {
    event.preventDefault();

    const email = emailInput.value;

    if (!validateEmail(email) || email === "") {
        emailInput.classList.add('error');
        errorMessage.classList.remove('hidden');

    } else {
        successEmail.innerText = email;

        signUp.classList.add('hidden');
        successMessage.classList.remove('hidden');

        emailInput.classList.remove('error');
        errorMessage.classList.add('hidden');
        emailInput.value = "";
    }
}

function dismissMessage(event) {
    signUp.classList.remove('hidden');
    successMessage.classList.add('hidden');
}

form.addEventListener('submit', handleSubmit);
dismissBtn.addEventListener('click', dismissMessage);