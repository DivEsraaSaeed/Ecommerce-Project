function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');

    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    toastContainer.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl);
    toast.show();

    // Remove toast after it hides
    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}


// Bootstrap validation
const form = document.getElementById('signupForm');
(() => {
    'use strict'
 

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

form.addEventListener('submit', (e) => {

    if (!form.checkValidity()) return;
    if (document.getElementById('password').value !== document.getElementById('confirmPassword').value) return;

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const isSeller = document.getElementById('isSeller').checked;
    const userID = `#${Date.now()}`
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const emailExists = users.some(user => user.email.toLowerCase() === email);

    if (emailExists) {
        showToast('This email has already been registered', 'info')
        // alert('This email has already been registered. Redirecting to login...');
        window.location.href = "login.html";
        return;
    }

    const newUser = { username, email, password, isSeller, isAdmin: false ,userID};
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
        showToast('Account created successfully!', 'success')
        setTimeout(() => {
            window.location.href = "login.html"
        }, 4000)
    // alert('Account created successfully! Redirecting to login...');
    // window.location.href = "login.html";
});

// localStorage.clear()


// Move toast function to global scope
//33##############################################################
// Bootstrap validation
// (() => {
//     'use strict'
//     const form = document.getElementById('signupForm')

//     form.addEventListener('submit', event => {
//         const password = document.getElementById('password').value
//         const confirmPassword = document.getElementById('confirmPassword').value

//         if (!form.checkValidity()) {
//             event.preventDefault()
//             event.stopPropagation()
//         }

//         if (password !== confirmPassword) {
//             event.preventDefault()
//             event.stopPropagation()
//             const confirmPasswordField = document.getElementById('confirmPassword')
//             const confirmPasswordError = document.getElementById('confirmPasswordError')

//             confirmPasswordField.classList.add('is-invalid')
//             confirmPasswordError.textContent = "Passwords do not match."
//         }

//         form.classList.add('was-validated')
//     }, false)
// })()

// const form = document.getElementById('signupForm')

// form.addEventListener('submit', (e) => {
//     if (!form.checkValidity()) return
//     if (document.getElementById('password').value !== document.getElementById('confirmPassword').value) return

//     e.preventDefault()

//     const username = document.getElementById("username").value.trim()
//     const email = document.getElementById("email").value.trim().toLowerCase()
//     const password = document.getElementById("password").value
//     const isSeller = document.getElementById('isSeller').checked

//     let users = JSON.parse(localStorage.getItem('users') || '[]')

//     const emailExists = users.some(user => user.email.toLowerCase() === email)

//     if (emailExists) {
//         showToast('This email has already been registered. Redirecting to login...', 'warning')
//         setTimeout(() => {
//             window.location.href = "login.html"
//         }, 3000)
//         return
//     }

//     const newUser = { username, email, password, isSeller, isAdmin: false }
//     users.push(newUser)

//     const admin = {
//         username: "amiraabdelhameed",
//         password: "6",
//         email: "admin@admin.com",
//         isSeller: false,
//         isAdmin: true
//     }

//     const adminExists = users.some(user =>
//         user.email.toLowerCase() === admin.email.toLowerCase()
//     )

//     if (!adminExists) {
//         users.push(admin)
//     }

//     localStorage.setItem('users', JSON.stringify(users))

//     showToast('Account created successfully! Redirecting to login...', 'success')
//     setTimeout(() => {
//         window.location.href = "login.html"
//     }, 3000)
// })