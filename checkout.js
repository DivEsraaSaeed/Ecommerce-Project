
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
//end########################bootstrap form validation ########################

// localStorage.removeItem("orders")

//    let orders = localStorage.setItem("orders", JSON.stringify([
//         {
//            sellerName: "xyz",
//            sellerEmail: "xyz@gmail.com",
//            ProductId: 1,
//            ProductCode: "W001",
//            ProductName: "Black Women's Gown",
//             ProductColors: "Black",
//             ProductPrice: "129.99",
//             ValueDiscount: "0",
//            priceAfterDiscount: 129.99,
//             quantity: "2",

//         },
//         {
//             sellerName: "xyz",
//              sellerEmail: "xyz@gmail.com",
//               ProductId: 1,
//               ProductCode: "A001",
//                ProductName: "Blue Women's Handbag",
//                ProductColors: "Blue",
//                ProductPrice: "400",
//                ValueDiscount: "0",
//               priceAfterDiscount: 400,
//             quantity: "5",
//         },
//         {
//             sellerName: "xyz",
//             sellerEmail: "xyz@gmail.com",
//              ProductId: 2,
//              ProductCode: "A002",
//              ProductName: "Heshe Women's Leather Bag",
//              ProductColors: "Brown",
//              ProductPrice: "899",
//              ValueDiscount: "0",
//              priceAfterDiscount: 899,
//             quantity: "3",
//         },
//         {
//             sellerName: "Abdelfatah",
//               sellerEmail: "Abdelfatah@gmail.com",
//                 ProductId: 1,
//                   ProductCode: "P001",
//                   ProductName: "Classic men's shirt",
//                    ProductColors: "Blue, Black",
//                     ProductPrice: "199",
//                      ValueDiscount: "0",
//                       priceAfterDiscount: 199,
//             quantity: "5",
//         },
//     ]))


//##########################get items from local storage #########################################
//get order confirmed in  cart from  locastorage key 'orders' values productName , quantity , price

let orders = JSON.parse(localStorage.getItem("orders"));

let ProductName = document.querySelector(".product_name");
let productAmount = document.querySelector(".product_amount");
let ProductPrice = document.querySelector(".product_price");
let subtotal = document.querySelector('#subtotal')
let shippingPrice = document.querySelector('#shipping_price')
let total = document.querySelector('#total')

ProductName.innerHTML = "";
productAmount.innerHTML = "";
ProductPrice.innerHTML = "";
let sum = 0;
orders.forEach(order => {
    ProductName.innerHTML += `<p>${order.ProductName}</p>`;
    productAmount.innerHTML += `<p>${order.quantity}</p>`;
    ProductPrice.innerHTML += `<p> ${Number(order.ProductPrice)}</p>`;
    sum += Number(order.ProductPrice) * Number(order.quantity);

});
let shipping = 50;
subtotal.innerHTML += sum;
shippingPrice.innerHTML += shipping;
total.innerHTML += sum + shipping;


const form = document.querySelector('#checkoutForm');




//start###############################confirm button ########################################
document.getElementById('confirm').addEventListener('click', () => {

    //start######################address validation ######################################

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const customerName = `${document.getElementById("firstName").value} ${document.getElementById("lastName").value}`;
    const customerNumbers = `${document.getElementById("phone1").value} / ${document.getElementById("phone2").value}`;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;
    const country = document.getElementById("country").value;
    const notes = document.getElementById("notes").value;

    const customerAddress = {
        customerName,
        customerNumbers,
        streetAddress: address,
        city,
        state,
        zip,
        country,
        notes
    };


    //end######################address validation ######################################

    // start##############check if user choose payment method or not and write the method############
    let paymentMethod = document.querySelector('input[name="payment_method"]:checked');

    if (!paymentMethod) {
        alert("Please choose a payment method.");
        return;
    }


    let paymentData = {};
    if (paymentMethod.id === 'credit') {

        let cardName = document.getElementById('cardName').value;
        let cardNumber = document.getElementById('cardNumber').value;
        let cardExpiry = document.getElementById('cardExpiry').value;
        let cardCVC = document.getElementById('cardCVC').value;


        if (!cardName || !cardNumber || !cardExpiry || !cardCVC) {
            alert("Please fill in all credit card details.");
            return;
        }

        paymentData = {
            method: "Credit Card",
            cardName,
            cardNumber,
            cardExpiry,
            cardCVC
        };
    } else if (paymentMethod.id === 'cash') {
        paymentData = { method: "Cash" };
    }

    // end##############check if user choose payment method or not and write the method############


    //start ##################saving customer order and his name in localstorage in key "confirmed orders"#############
    let customer = JSON.parse(localStorage.getItem("currentUser")).username;

    let order = orders.map(item => ({
        ProductName: item.ProductName,
        quantity: item.quantity,
        ProductPrice: item.ProductPrice,
        sellerName: item.sellerName
    }));
    let orderDate = new Date().toUTCString()
    let confirmedOrders = JSON.parse(localStorage.getItem('confirmed_orders')) || [];
    confirmedOrders.push({ orderDate, order, customer, paymentData, customerAddress });
    localStorage.setItem('confirmed_orders', JSON.stringify(confirmedOrders));
    //end ##################saving customer order and his name in localstorage in key "confirmed orders"#############

    const currentOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const store = JSON.parse(localStorage.getItem('Store'));

    const menProducts = store.Store.men?.ProductCategory?.Products || [];
    const womenProducts = store.Store.women?.ProductCategory?.Products || [];
    const accessoriesProducts = store.Store.accessories?.ProductCategory?.Products || [];


    const allProducts = [...menProducts, ...womenProducts, ...accessoriesProducts];

    currentOrders.forEach(orderedItem => {
        const product = allProducts.find(p =>
            p.ProductName === orderedItem.ProductName &&
            p.sellerName === orderedItem.sellerName
        );

        if (product) {
            const currentCount = Number(product.ProductCount) || 0;
            const orderedQty = Number(orderedItem.quantity) || 0;
            product.ProductCount = Math.max(0, currentCount - orderedQty);

        }
    })
    localStorage.setItem("Store", JSON.stringify(store));

    // //end################decrese quantity logic###################


    //start##############################open rate and review  in modal ##############################
    showToast('your order is ready', 'success')
    setTimeout(() => {
        const reviewModal = new bootstrap.Modal(document.getElementById('reviewModal'));
        reviewModal.show();
    }, 1000)
    //end##############################open rate and review  in modal ##############################

})
//end###############################confirm button ########################################

//start################### customer review logic###################
document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const rating = document.getElementById('rating').value;
    const reviewText = document.getElementById('reviewText').value;
    const customer = JSON.parse(localStorage.getItem("currentUser")).username;
    let review = { customer, rating, reviewText }

    let reviewData = JSON.parse(localStorage.getItem('customerReview')) || [];
    reviewData.push(review);
    localStorage.setItem('customerReview', JSON.stringify(reviewData));

    showToast('Thank you for your review!', 'success')
    // setTimeout(() => {
    //     // window.location.href='home.html'
    // }, 1000)

    const reviewModal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
    reviewModal.hide();
})

document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('#starRating i');
    const ratingInput = document.getElementById('rating');

    stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            resetStars();
            const value = parseInt(star.getAttribute('data-value'));
            highlightStars(value);
        });

        star.addEventListener('mouseleave', () => {
            resetStars();
            if (ratingInput.value) {
                highlightStars(parseInt(ratingInput.value), true);
            }
        });

        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            ratingInput.value = value;
            highlightStars(value, true);
        });
    });

    function highlightStars(count, select = false) {
        for (let i = 0; i < count; i++) {
            stars[i].classList.add(select ? 'selected' : 'hovered');
        }
    }

    function resetStars() {
        stars.forEach(star => {
            star.classList.remove('hovered', 'selected');
        });
    }

    // Bootstrap validation
    document.getElementById('reviewForm').addEventListener('submit', function (e) {
        if (!this.checkValidity() || !ratingInput.value) {
            e.preventDefault();
            e.stopPropagation();
            ratingInput.setCustomValidity(ratingInput.value ? '' : 'Please select a rating.');
        } else {
            ratingInput.setCustomValidity('');
        }
        this.classList.add('was-validated');
    });
});

//end################### customer review logic###################


//start################decrese quantity logic###################

//end################decrese quantity logic###################

