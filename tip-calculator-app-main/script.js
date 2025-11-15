// inputs
const billInput = document.querySelector("#bill");
const tipButtons = document.querySelectorAll('.tip-button');
const tipCustomInput = document.querySelector('#custom');
const personInput = document.querySelector("#people-number");

// outputs
const tipAmount = document.querySelector("#tip-amount-value");
const total = document.querySelector("#total");

// forms 
const calculateForm = document.querySelector("#calculate");
const resetForm = document.querySelector("#reset");

// values
let billValue = 0;
let tipValue = 0;
let personNumber = 1;

// Set the default value of Tip amoutn and Total to $0.
window.addEventListener('DOMContentLoaded', () => {
    tipAmount.textContent = "$0.00";
    total.textContent = "$0.00";
})

function deactivateAllButtons() {
    tipButtons.forEach(tipButton => {
        tipButton.classList.remove("active");
    })
}

function calculateTip() {
    if (billValue > 0 && personNumber > 0) {
        const tipPerPerson = (billValue * (tipValue / 100)) / personNumber;
        const totalPerPerson = (billValue / personNumber) + tipPerPerson;

        tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
        total.textContent = `$${totalPerPerson.toFixed(2)}`;
    } else {
        tipAmount.textContent = "$0.00";
        total.textContent = "$0.00";
    }
}

billInput.addEventListener('input', () => {
    const errorMessage = document.querySelector(".bill-error");
    if (billInput.value == 0) {
        errorMessage.classList.remove("hidden");
    } else if (billInput.value == "") {
        billInput.value = 0;
    } else {
        errorMessage.classList.add("hidden");
        billValue = parseFloat(billInput.value);
        calculateTip();
    }
});

tipButtons.forEach((tipButton) => {
    tipButton.addEventListener('click', (e) => {
        e.preventDefault();
        deactivateAllButtons();
        tipButton.classList.add("active");
        tipButton.addEventListener('click', (e) => {
            tipButton.classList.add('active');
        });
        tipCustomInput.value = '';
        tipValue = tipButton.getAttribute('name');
        calculateTip();
    });
});

tipCustomInput.addEventListener('input', () => {
    deactivateAllButtons();
    if (tipCustomInput.value > 100) {
        tipCustomInput.value = 100;
    }
    tipValue = parseFloat(tipCustomInput.value) || 0;
    calculateTip();
});

personInput.addEventListener('input', (e) => {
    const errorMessage = document.querySelector(".person-error");
    if (personInput.value == 0) {
        errorMessage.classList.remove("hidden");
    } else {
        errorMessage.classList.add("hidden");
        personNumber = parseInt(personInput.value) || 1;
        calculateTip();
    }
});