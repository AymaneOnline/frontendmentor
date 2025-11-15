const accessLabels = document.querySelectorAll('.faq-item label');

accessLabels.forEach((label) => {
    const checkbox = document.getElementById(label.getAttribute('for'));
    const answer = label.nextElementSibling;

    label.addEventListener('keydown', (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            checkbox.checked = !checkbox.checked;
            label.setAttribute('aria-expanded', checkbox.checked);

            if (checkbox.checked) {
                answer.setAttribute('tabindex', '0');
                answer.setAttribute('aria-hidden', 'false');
                answer.focus();
            } else {
                answer.setAttribute('tabindex', '-1');
                answer.setAttribute('aria-hidden', 'true');
            }
        }
    })
})