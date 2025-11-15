// VALIDATION
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("contact");
    const fields = {
        firstname: form.querySelector("#firstname"),
        lastname: form.querySelector("#lastname"),
        email: form.querySelector("#email"),
        query: form.querySelectorAll("input[name='query']"),
        message: form.querySelector("#message"),
        consent: form.querySelector("#consent-input"),
    };

    const errorMessages = {
        firstname: form.querySelector("#required-firstname"),
        lastname: form.querySelector("#required-lastname"),
        emailRequired: form.querySelector("#required-email"),
        emailValid: form.querySelector("#valid-email"),
        query: form.querySelector("#required-query"),
        message: form.querySelector("#required-message"),
        consent: form.querySelector("#required-consent"),
    };

    // Helper function to show or hide error messages
    function toggleError(element, showError, errorMessage) {
        if (showError) {
            errorMessage.classList.remove("visually-hidden");
            element.classList.add("error");
        } else {
            errorMessage.classList.add("visually-hidden");
            element.classList.remove("error");
        }
    };

    // Field-specific validation functions
    function validateTextField(field, errorElement) {
        const isValid = field.value.trim() !== "";
        toggleError(field, !isValid, errorElement);
        return isValid;
    };

    function validateEmail() {
        const email = fields.email;
        const isEmpty = email.value.trim() === "";
        const isValid = email.validity.valid;
        
        toggleError(email, isEmpty, errorMessages.emailRequired);
        toggleError(email, !isEmpty && !isValid, errorMessages.emailValid);
        return isValid && !isEmpty;
    }

    function validateRadioButtons() {
        const selected = Array.from(fields.query).some(radio => radio.checked);
        toggleError(fields.query[0], !selected, errorMessages.query);
        return selected;
    }

    function validateConsent() {
        const isChecked = fields.consent.checked;
        toggleError(fields.consent, !isChecked, errorMessages.consent);
        return isChecked;
    }

    // Form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const isFormValid =
            validateTextField(fields.firstname, errorMessages.firstname) &
            validateTextField(fields.lastname, errorMessages.lastname) &
            validateEmail() &
            validateRadioButtons() &
            validateTextField(fields.message, errorMessages.message) &
            validateConsent();

        if (isFormValid) {
            // Hide the form and show success message
            form.querySelector("button[type='submit']").disabled = true;
            form.reset();
            document.querySelector(".success").classList.remove("hidden-success");
            document.querySelector(".success").focus();
        }
    });
});

// Styles
document.addEventListener('change', (event) => {
    if (event.target.matches('input[type="radio"][name="query"]')) {
        // Clear 'checked' class from all radio divs
        document.querySelectorAll('.radio.checked').forEach(div => div.classList.remove('checked'));

        // Add 'checked' class the the parent div of the selected radio button
        event.target.closest('.radio').classList.add('checked');
    }
})

// Accessibility

// Select all radio container divs
document.querySelectorAll('.input-control.radio').forEach(radioDiv => {
    radioDiv.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Prevent scrolling with Space key
            // Find the radio input inside this div and check it
            const radioInput = radioDiv.querySelector('input[type="radio"]');
            if (radioInput) {
                radioInput.checked = true;
                // Optionally trigger a change event to apply any styles or logic
                radioInput.dispatchEvent(new Event('change'));
            }
        }
    });
});


document.querySelector('.checkmark').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();  // Prevent default scrolling with Space
      const checkbox = document.getElementById('consent-input');
      checkbox.checked = !checkbox.checked;
    }
});
  