function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
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

//start######################bootstrap form validation#############################
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
// let orders = localStorage.setItem("orders",JSON.stringify( [
//     {
//         "sellerName": "xyz",
//         "sellerEmail": "xyz@gmail.com",
//         "ProductId": 1,
//         "ProductCode": "A001",
//         "ProductName": "Blue Women's Handbag",
//         "ProductColors": "Blue",
//         "ProductPrice": "400",
//         "ValueDiscount": "0",
//         "priceAfterDiscount": 400,
//         "quantity": 5,
//         "ProductSize": "S",
//         "ProductCategory": "accessories",
//         "SubCategory": "accessories",
//         "ProductStatus": "InStore",
//         "ProductImage": "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/1.webp",
//         "ProductDescription": "The Blue Women's Handbag is a stylish and spacious accessory for everyday use. With a vibrant blue color and multiple compartments, it combines fashion and functionality.",
//         "ProductRate": 0,
//         "ProductReviews": 0
//     },
//     {
//         "sellerName": "xyz",
//         "sellerEmail": "xyz@gmail.com",
//         "ProductId": 10,
//         "ProductCode": "W010",
//         "ProductName": "Red Shoes",
//         "ProductColors": "Red",
//         "ProductPrice": "599",
//         "ValueDiscount": "0",
//         "priceAfterDiscount": 599,
//         "quantity": 3,
//         "ProductSize": [
//             "S",
//             "M",
//             "L",
//             "XL"
//         ],
//         "ProductCategory": "women",
//         "SubCategory": "womenFashion",
//         "ProductStatus": "New Arrival",
//         "ProductImage": "https://cdn.dummyjson.com/product-images/womens-shoes/red-shoes/1.webp",
//         "ProductDescription": "The Red Shoes make a bold statement with their vibrant red color. Whether for a party or a casual outing, these shoes add a pop of color and style to your wardrobe.",
//         "ProductRate": 4.7,
//         "ProductReviews": 0
//     },
//     {
//         "sellerName": "Abdelfatah",
//         "sellerEmail": "Abdelfatah@gmail.com",
//         "ProductId": 2,
//         "ProductCode": "P002",
//         "ProductName": "Gigabyte Aorus Men Tshirt",
//         "ProductColors": "Black",
//         "ProductPrice": "450",
//         "ValueDiscount": "0",
//         "priceAfterDiscount": 450,
//         "quantity": 4,
//         "ProductSize": [
//             "S",
//             "M",
//             "L",
//             "XL"
//         ],
//         "ProductCategory": "men",
//         "SubCategory": "menFashion",
//         "ProductStatus": "Trending",
//         "ProductImage": "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
//         "ProductDescription": "The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it's perfect for expressing your gaming style.",
//         "ProductRate": 4.5,
//         "ProductReviews": 0
//     },
//     {
//         "sellerName": "Abdelfatah",
//         "sellerEmail": "Abdelfatah@gmail.com",
//         "ProductId": 1,
//         "ProductCode": "P001",
//         "ProductName": "Classic men's shirt",
//         "ProductColors": "Blue, Black",
//         "ProductPrice": "199",
//         "ValueDiscount": "0",
//         "priceAfterDiscount": 199,
//         "quantity": 6,
//         "ProductSize": [
//             "S",
//             "M",
//             "L",
//             "XL"
//         ],
//         "ProductCategory": "men",
//         "SubCategory": "menFashion",
//         "ProductStatus": "InStore",
//         "ProductImage": "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
//         "ProductDescription": "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern. Made from high-quality fabric, it's suitable for both casual and semi-formal occasions.",
//         "ProductRate": 0,
//         "ProductReviews": 0
//     },
// ]))

//get order confirmed in  cart from  locastorage key 'orders' 

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
document.getElementById('confirm').addEventListener('click', (e) => {

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
        showToast('Please choose a payment method.', 'danger')
        return;
    }


    let paymentData = {};
    if (paymentMethod.id === 'credit') {

        let cardName = document.getElementById('cardName').value;
        let cardNumber = document.getElementById('cardNumber').value;
        let cardExpiry = document.getElementById('cardExpiry').value;
        let cardCVC = document.getElementById('cardCVC').value;


        if (!cardName || !cardNumber || !cardExpiry || !cardCVC) {
            showToast('Please fill in all credit card details.', 'danger')
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
    let customerID = JSON.parse(localStorage.getItem("currentUser")).userID;

    let order = orders.map(item => ({
        ProductName: item.ProductName,
        quantity: item.quantity,
        ProductPrice: item.ProductPrice,
        sellerName: item.sellerName,
        sellerEmail: item.sellerEmail,
        ProductCode: item.ProductCode,
        ProductId: item.ProductId,
        ProductCategory: item.ProductCategory,
    }));
    let totalPaid=total.innerHTML
    let orderDate = new Date().toUTCString()
    let orderID=`#${Date.now()}`
    let confirmedOrders = JSON.parse(localStorage.getItem('confirmed_orders')) || [];
    confirmedOrders.push({ orderDate, order, customer, paymentData, customerAddress, orderID, customerID, totalPaid });
    localStorage.setItem('confirmed_orders', JSON.stringify(confirmedOrders));
    //end ##################saving customer order and his name in localstorage in key "confirmed orders"#############


    //start################decrese quantity logic###################

    const currentOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const store = JSON.parse(localStorage.getItem('Store'));

    const menProducts = store.Store.men?.ProductCategory?.Products || [];
    const womenProducts = store.Store.women?.ProductCategory?.Products || [];
    const accessoriesProducts = store.Store.accessories?.ProductCategory?.Products || [];


    const allProducts = [...menProducts, ...womenProducts, ...accessoriesProducts];

    currentOrders.forEach(orderedItem => {
        const product = allProducts.find(p =>
            p.ProductName === orderedItem.ProductName &&
            p.sellerName === orderedItem.sellerName &&
            p.ProductCode === orderedItem.ProductCode
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
        console.log(e.target);
        e.target.setAttribute("data-bs-target", "#reviewModal");
        e.target.setAttribute("data-bs-toggle", "modal");
        e.target.click();
    }, 1000);


}, { once: true })
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
    setTimeout(() => {
        window.location.href = 'home.html'
    }, 2000)

    const reviewModal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
    reviewModal.hide();
})


    const stars = document.querySelectorAll('#starRating i');
    const ratingInput = document.getElementById('rating');

    stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            stars.forEach(star => {
                star.classList.remove('hovered', 'selected');
            });
            const value = parseInt(star.getAttribute('data-value'));
            highlightStars(value);
        });

        star.addEventListener('mouseleave', () => {
            stars.forEach(star => {
                star.classList.remove('hovered', 'selected');
            });
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

//end################### customer review logic###################




