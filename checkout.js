//start########################bootstrap form validation ########################
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
//             productName: "t-shirt",
//             price: "400",
//             quantity: "2",
//             color:'brown',
//              sellerName:'seller1'
//         },
//         {
//             productName: "bag",
//             price: "200",
//             quantity: "4",
//             color:'brown',
//              sellerName:'seller1'
//         },
//         {
//             productName: "shoes",
//             price: "300",
//             quantity: "1",
//             color:'brown',
//              sellerName:'seller1'
//         }
//         ,
//         // {
//         //     productName: "pants",
//         //     price: "300",
//         //     quantity: "3",
//         //     color:'brown',
//         //      sellerName:'seller1'
//         // }
//     ]))
//##########################get items from local storage #########################################
//get order confirmed in  cart from  locastorage key 'orders' values productName , quantity , price

let orders = JSON.parse(localStorage.getItem("orders"));

let productName = document.querySelector(".product_name");
let productAmount = document.querySelector(".product_amount");
let productPrice = document.querySelector(".product_price");
let subtotal = document.querySelector('#subtotal')
let shippingPrice = document.querySelector('#shipping_price')
let total = document.querySelector('#total')

productName.innerHTML = "";
productAmount.innerHTML = "";
productPrice.innerHTML = "";
let sum = 0;
orders.forEach(order => {
    productName.innerHTML += `<p>${order.productName}</p>`;
    productAmount.innerHTML += `<p>${order.quantity}</p>`;
    productPrice.innerHTML += `<p> ${Number(order.price)}</p>`;
    sum += Number(order.price) * Number(order.quantity);

});
let shipping = 50;
subtotal.innerHTML += sum;
shippingPrice.innerHTML += shipping;
total.innerHTML += sum + shipping;

//start######################address form ######################################

const form = document.querySelector('#checkoutForm');

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    // Collect values
    const customerName = `${document.getElementById("firstName").value} ${document.getElementById("lastName").value}`;
    const customerNumbers = `${document.getElementById("phone1").value} / ${document.getElementById("phone2").value}`;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;
    const country = document.getElementById("country").value;

    const customerAddress = {
        customerName,
        customerNumbers,
        streetAddress: address,
        city,
        state,
        zip,
        country
    };

    // Save to localStorage
    localStorage.setItem("customerAddress", JSON.stringify(customerAddress));


    alert("Shipping address saved successfully!");

});

//end######################address form ######################################



//start###############################confirm button ########################################
document.getElementById('confirm').addEventListener('click', () => {

    //start#############################check if address form valid #####################################
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    if (!localStorage.getItem("customerAddress")) {
        alert("save your address")
        return;
    }
    //end#############################check if address form valid #####################################

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
    console.log(productName.innerText + customer)
    let order = orders.map(item => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        color: item.color,
        sellerName: item.sellerName
    }));

    localStorage.setItem('confirmed orders', JSON.stringify({ order, customer, paymentData }));
    //end ##################saving customer order and his name in localstorage in key "confirmed orders"#############

    //start##############################rate and review  in modal ##############################
    alert('your order is ready')
    const reviewModal = new bootstrap.Modal(document.getElementById('reviewModal'));
    reviewModal.show();
    //end##############################rate and review  in modal ##############################

})
//end###############################confirm button ########################################

//start################### customer review logic###################
document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const rating = document.getElementById('rating').value;
    const reviewText = document.getElementById('reviewText').value;
    const customer = JSON.parse(localStorage.getItem("currentUser")).username;


    const reviewData = { customer, rating, reviewText };
    localStorage.setItem('customerReview', JSON.stringify(reviewData));

    alert("Thank you for your review!");


    const reviewModal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
    reviewModal.hide();
})
//end################### customer review logic###################
