document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const message = document.getElementById('message');

    // Clear messages initially
    message.innerHTML = '';

    // Validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        // Must include uppercase, lowercase, number, and special character, with a minimum of 8 characters
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    }

    // Create reusable message update function
    function updateMessage(element, isValid, successMessage, errorMessage) {
        let messageElement = document.querySelector(`#${element.id}-message`);
        if (!messageElement) {
            messageElement = document.createElement('p');
            messageElement.id = `${element.id}-message`;
            message.appendChild(messageElement);
        }
        messageElement.textContent = isValid ? successMessage : errorMessage;
        messageElement.style.color = isValid ? 'green' : 'red';
    }

    // Add event listeners to inputs
    emailInput.addEventListener('input', function () {
        const isValid = validateEmail(emailInput.value.trim());
        updateMessage(emailInput, isValid, 'Email is correct.', 'Enter a valid email address (e.g., example@domain.com).');
    });

    passwordInput.addEventListener('input', function () {
        const isValid = validatePassword(passwordInput.value.trim());
        updateMessage(passwordInput, isValid, 'Password is correct.', 'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.');
    });

    // Form submission (clearing messages on submit)
    document.getElementById('userForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Clear messages on submit
        message.innerHTML = '';

        // Check if all fields are valid
        if (validateEmail(email) && validatePassword(password)) {
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Password:', password);

            const user = { name, email, password };
            console.log('userObject:', user);

            let storedUser = JSON.parse(localStorage.getItem('storedUser')) || [];
            storedUser.push(user);
            localStorage.setItem('storedUser', JSON.stringify(storedUser));

            document.getElementById('userForm').reset();
            alert('Form submitted successfully.');
        } else {
            alert('Please correct the highlighted errors before submitting.');
        }
    });
});
