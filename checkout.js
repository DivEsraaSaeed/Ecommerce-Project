

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

let orders = JSON.parse(localStorage.getItem("orders"));
// localStorage.removeItem("orders")
//    let orders = localStorage.setItem("orders", JSON.stringify([
//         {
//             productName: "t-shirt",
//             price: "200",
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
//             quantity: "3",
//             color:'brown',
//              sellerName:'seller1'
//         },
//         {
//             productName: "pants",
//             price: "300",
//             quantity: "3",
//             color:'brown',
//              sellerName:'seller1'
//         }
//     ]))

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
    productPrice.innerHTML += `<p>Price ${order.price}</p>`;
    sum += parseInt(order.price) * parseInt(order.quantity);

});
let shipping = 50;
subtotal.innerHTML += sum;
shippingPrice.innerHTML += shipping;
total.innerHTML += sum + shipping;

let form = document.querySelector('form');
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let customerName = document.getElementById("firstName").value + " " + document.getElementById("lastName").value
    let customerNumbers = document.getElementById("phone1").value + " / " + document.getElementById("phone2").value
    let address = document.getElementById("address").value
    let customerAddress = {
        customerName: customerName,
        customerNumbers: customerNumbers,
        address: address
    }
    if (form.checkValidity()) {
        console.log(customerName)
        localStorage.setItem("customerAddress", JSON.stringify(customerAddress))
    }

})
let checkoutbtn = document.querySelector('#checkout');
checkoutbtn.addEventListener('click', () => {
    const form = document.getElementById('checkoutForm');
    if (form.checkValidity()) {
        window.location.href = "payment.html";
    } else {
        form.classList.add('was-validated');
    }
})
