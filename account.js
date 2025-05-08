//Toast functionality
function showToast(message, type = 'info') {
    const toastElement = document.getElementById('toast');
    toastElement.className = 'toast align-items-center text-white border-0 mb-2 p-2';
    toastElement.classList.add(`bg-${type}`);

    toastElement.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}
// ##################################################### 
$(document).ready(function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Populate profile data
    $("#username, #headerUsername").text(currentUser.username);
    $("#email").text(currentUser.email);
    $("#phone-display").text(currentUser.phone);
    $("#birthdate-display").text(currentUser.birthdate)
    $("#fullname").val(currentUser.username);
    $("#user-email").val(currentUser.email);
    $("#phone").val(currentUser.phone);
    $("#birthdate").val(currentUser.birthdate)

    // Toggle edit mode
    $('#edit-profile-btn').click(function () {
        $('#personal-info-view, #account-settings-form').toggleClass('d-none');
    });

    // Cancel edit
    $('#cancel-personal-info').click(function () {
        $('#personal-info-view').removeClass('d-none');
        $('#account-settings-form').addClass('d-none');
    });

    // Save changes
    $('#save-personal-info').click(function () {
        try {
            const newName = $('#fullname').val().trim();
            const email = $('#user-email').val().trim();
            const phone = $('#phone').val().trim();
            const birthdate = $('#birthdate').val();
            const currentPass = $('#current-password').val();
            const newPass = $('#new-password').val();
            const confirmPass = $('#confirm-password').val();

            if (!newName || !email) throw new Error('Name and email are required');

            const originalEmail = currentUser.email;
            let updatedUsers = users.map(user =>
                user.email === originalEmail ? {
                    ...user,
                    username: newName,
                    email,
                    phone: phone || user.phone,
                    birthdate: birthdate || user.birthdate
                } : user
            );

            let updatedCurrentUser = {
                ...currentUser,
                username: newName,
                email,
                phone: phone || currentUser.phone,
                birthdate: birthdate || currentUser.birthdate
            };

            let passwordChanged = false;
            if (currentPass || newPass || confirmPass) {
                if (!currentPass || !newPass || !confirmPass)
                    throw new Error('All password fields are required for password change');

                if (newPass !== confirmPass) {
                    $('#confirm-password').addClass('is-invalid');
                    throw new Error('New passwords do not match');
                }

                if (newPass.length < 8) throw new Error('Password must be at least 8 characters');
                if (currentPass !== currentUser.password) throw new Error('Current password is incorrect');

                updatedUsers = updatedUsers.map(user =>
                    user.email === email ? { ...user, password: newPass } : user
                );
                updatedCurrentUser.password = newPass;
                localStorage.setItem('Users', JSON.stringify(updatedUsers));
                passwordChanged = true;
                document.getElementById('password-form')?.reset();
            }

            localStorage.setItem('users', JSON.stringify(updatedUsers));
            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));

            $("#username, #headerUsername").text(newName);
            $('#email').text(email);
            if (phone) $('#phone-display').text(phone);
            if (birthdate) $('#birthdate-display').text(birthdate);
            $('#personal-info-view').removeClass('d-none');
            $('#account-settings-form').addClass('d-none');
            $('#confirm-password').removeClass('is-invalid');
            showToast('Profile updated successfully' + (passwordChanged ? ' and password changed!' : '!'), 'success')

        } catch (error) {
            console.error('Update failed:', error);
            showToast(error.message, 'danger');
            return false;
        }
    });

    // Sidebar behavior
    $('.sidebar-header').click(function () {
        $('.account-sidebar .nav').toggleClass('show');
    });

    $('.account-sidebar .nav-link').click(function (e) {
        e.preventDefault();
        $('.account-sidebar .nav-link').removeClass('active');
        $(this).addClass('active');

        const tabId = $(this).data('tab');
        $('.tab-content').addClass('d-none');
        $(`#${tabId}`).removeClass('d-none');

        if ($(window).width() < 768) {
            $('.account-sidebar .nav').removeClass('show');
        }
    });

    // Order display logic
    const allConfirmedOrders = JSON.parse(localStorage.getItem("confirmed_orders")) || [];
    const matchedOrders = allConfirmedOrders.filter(order => order.customerID == currentUser.userID);
    const ordersContainer = document.getElementById('order-item');
    ordersContainer.innerHTML = '';

    matchedOrders.forEach((order, index) => {
        ordersContainer.innerHTML += `
                <div class="order-item mb-4">
                    <div class="d-flex flex-column flex-md-row justify-content-between">
                        <div class="mb-2 mb-md-0">
                            <h5 class="mb-1">Order ${order.orderID}</h5>
                            <span class="order-status status-delivered">${order.status || "Pending"}</span>
                        </div>
                        <div class="text-md-end">
                            <p class="mb-1 fw-bold totalMoney">$${order.totalPaid}</p>
                            <button class="btn btn-sm btn-outline-dark orderDetailBtn" data-index="${index}">View Details</button>
                        </div>
                    </div>
                    <hr>
                </div>
            `;
    });

    document.querySelectorAll(".orderDetailBtn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            const order = matchedOrders[index];

            const orderDetails = new bootstrap.Modal(document.getElementById('orderDetails'));
            orderDetails.show();

            const ProductName = document.querySelector(".product_name");
            const productAmount = document.querySelector(".product_amount");
            const ProductPrice = document.querySelector(".product_price");

            ProductName.innerHTML = "";
            productAmount.innerHTML = "";
            ProductPrice.innerHTML = "";

            order.order.forEach(product => {
                ProductName.innerHTML += `<p>${product.ProductName}</p>`;
                productAmount.innerHTML += `<p>${product.quantity}</p>`;
                ProductPrice.innerHTML += `<p>${product.ProductPrice}</p>`;
            });
        });
    });

    // Summary totals (if needed outside modal)
    const ProductName = document.querySelector(".product_name");
    const productAmount = document.querySelector(".product_amount");
    const ProductPrice = document.querySelector(".product_price");
    const subtotal = document.querySelector('#subtotal');
    const shippingPrice = document.querySelector('#shipping_price');
    const total = document.querySelector('#total');

    ProductName.innerHTML = "";
    productAmount.innerHTML = "";
    ProductPrice.innerHTML = "";

    let sum = 0;
    matchedOrders.forEach(order => {
        ProductName.innerHTML += `<p>${order.ProductName}</p>`;
        productAmount.innerHTML += `<p>${order.quantity}</p>`;
        ProductPrice.innerHTML += `<p>${Number(order.ProductPrice)}</p>`;
        sum += Number(order.ProductPrice) * Number(order.quantity);
    });


    //#########################################logout button#########################################

    $('.logoutBtn').click(()=>{
        showToast('Logging out.....', 'warning')
        localStorage.removeItem("currentUser")
        setTimeout(()=>{
            window.location.href="home.html"

        },1000)
    })

    //#####################################save complains ##############################################
    $(".sendComplainBtn").click((e)=>{
        e.preventDefault()
        
        let customersComplains = JSON.parse(localStorage.getItem("customerComplains") || '[]') ;
        let customerName = JSON.parse(localStorage.getItem("currentUser")).username 
        let customerID =  JSON.parse(localStorage.getItem("currentUser")).userID;
        const complain = $("#complainArea").val()
        let newComplain ={complain, date: new Date().toISOString() , customerName , customerID }
        if(complain){
            showToast('Your complain has been send to Admins we will contact you soon to solve your problems', 'info')
            customersComplains.push(newComplain)
            localStorage.setItem("customerComplains", JSON.stringify(customersComplains))
        }else{
            showToast('Please write your complain first', 'warning')            
        }
    }) 
});

