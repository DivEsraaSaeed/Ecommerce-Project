

// Bootstrap validation
(() => {
    'use strict'
    const form = document.getElementById('signupForm')

    form.addEventListener('submit', event => {
        const password = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirmPassword').value

        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        if (password !== confirmPassword) {
            event.preventDefault()
            event.stopPropagation()
            const confirmPasswordField = document.getElementById('confirmPassword')
            const confirmPasswordError = document.getElementById('confirmPasswordError')

            confirmPasswordField.classList.add('is-invalid')
            confirmPasswordError.textContent = "Passwords do not match."
        }

        form.classList.add('was-validated')
    }, false)
})()
const form = document.getElementById('signupForm');

form.addEventListener('submit', (e) => {

    if (!form.checkValidity()) return;
    if (document.getElementById('password').value !== document.getElementById('confirmPassword').value) return;

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const isSeller = document.getElementById('isSeller').checked;

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const emailExists = users.some(user => user.email.toLowerCase() === email);

    if (emailExists) {
        alert('This email has already been registered. Redirecting to login...');
        window.location.href = "login.html";
        return;
    }

    const newUser = { username, email, password, isSeller, isAdmin: false };
    users.push(newUser);

    const admin = {
        username: "amiraabdelhameed",
        password: "6",
        email: "admin@admin.com",
        isSeller: false,
        isAdmin: true
    };

    const adminExists = users.some(user =>
        user.email.toLowerCase() === admin.email.toLowerCase()
    );

    if (!adminExists) {
        users.push(admin);
    }

    localStorage.setItem('users', JSON.stringify(users));

    alert('Account created successfully! Redirecting to login...');
    window.location.href = "login.html";
});

// localStorage.clear()

