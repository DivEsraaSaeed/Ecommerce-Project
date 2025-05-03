
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
        alert('successed')
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        if (currentUser.isSeller) {
            window.location.href = '../Ecommerce-Project/sellerProfile.html'

        } else if (currentUser.isAdmin) {
            window.location.href = '../Ecommerce-Project/Admin.html'

        } else {
            window.location.href = '../Ecommerce-Project/home.html'

        }
    } else {
        alert('invalid pass or email')
    }
})



