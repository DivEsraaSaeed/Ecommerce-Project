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
(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})()
//login validation
const form = document.querySelector('#loginForm');
form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) return;
    e.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    const users = JSON.parse(localStorage.getItem('users'));

    let accountExists = false;
    let matchedUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            accountExists = true;
            matchedUser = users[i];
            break;
        }
    }
    if (accountExists) {
        let currentUser = {
            email: matchedUser.email,
            password: matchedUser.password,
            username: matchedUser.username,
            isSeller: matchedUser.isSeller,
            isAdmin: matchedUser.isAdmin
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        if (currentUser.isSeller) {
            showToast('Login success! Redirecting seller profile ', 'success')
            setTimeout(() => {
                window.location.href = '/sellerProfile.html'
            }, 2000)

        } else if (currentUser.isAdmin) {
                  showToast('Login success! Redirecting to dashboard', 'success')
        setTimeout(() => {
            window.location.href = '/Admin.html'
        }, 2000)

        } else {
            showToast('Login success! Redirecting to home page ', 'success')
            setTimeout(() => {
                window.location.href = '/home.html'
            }, 2000)
            
        }
    } else {
        showToast('invalid password or email', 'danger')
    }
})



