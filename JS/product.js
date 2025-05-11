// document.addEventListener('DOMContentLoaded', function () {


//     document.querySelector(".product-title").innerHTML = JSON.parse(localStorage.getItem('selectedProduct')).ProductName
//     document.querySelector(".product-description").innerHTML = JSON.parse(localStorage.getItem('selectedProduct')).ProductDescription
//     document.querySelector(".product-price").innerHTML = JSON.parse(localStorage.getItem('selectedProduct')).ProductPrice
//     document.querySelector("#main-product-img").src = JSON.parse(localStorage.getItem('selectedProduct')).ProductImage


//     //related Products 
//     let Store = JSON.parse(localStorage.getItem("Store"))
//     let men = Store.Store.men.ProductCategory.Products
//     let women = Store.Store.women.Products
//     let acccessories = Store.Store.accessories.Products
//     let allProducts = [...men, ...women, ...acccessories]
// console.log(allProducts)
// //    let trending= allProducts.filter((trend)=>{
   
// //     // trend.ProductStatus == "Trending"
// //     })
// console.log(trending)
//     // Quantity Control
//     const quantityInput = document.getElementById('quantity');
//     const increaseBtn = document.getElementById('increase');
//     const decreaseBtn = document.getElementById('decrease');

//     increaseBtn.addEventListener('click', function () {
//         quantityInput.value = parseInt(quantityInput.value) + 1;
//     });

//     decreaseBtn.addEventListener('click', function () {
//         if (parseInt(quantityInput.value) > 1) {
//             quantityInput.value = parseInt(quantityInput.value) - 1;
//         }
//     });

//     quantityInput.addEventListener('change', function () {
//         if (parseInt(quantityInput.value) < 1 || isNaN(parseInt(quantityInput.value))) {
//             quantityInput.value = 1;
//         }
//     });

//     // Size Selection
//     document.querySelectorAll('.size-btn').forEach(btn => {
//         btn.addEventListener('click', function () {
//             document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
//             this.classList.add('active');
//             document.getElementById('selected-size').textContent = this.textContent;
//         });
//     });

//     // Color Selection
//     document.querySelectorAll('.color-circle').forEach(circle => {
//         circle.addEventListener('click', function () {
//             document.querySelectorAll('.color-circle').forEach(c => c.classList.remove('selected'));
//             this.classList.add('selected');
//             document.getElementById('selected-color').textContent = this.getAttribute('title');
//         });
//     });

//     // Button Functionality
//     document.querySelector('.btn-add-to-cart').addEventListener('click', function () {
//         const quantity = parseInt(quantityInput.value);
//         const size = document.getElementById('selected-size').textContent;
//         const color = document.getElementById('selected-color').textContent;

//         alert(`Added ${quantity} ${size} ${color} item(s) to your cart`);
//     });

//     document.querySelector('.btn-buy-now').addEventListener('click', function () {
//         const quantity = parseInt(quantityInput.value);
//         const size = document.getElementById('selected-size').textContent;
//         const color = document.getElementById('selected-color').textContent;

//         alert(`Proceeding to checkout with ${quantity} ${size} ${color} item(s)`);
//     });
// });


// //////////////////////////////////////////////


// // تغيير الصورة الرئيسية عند الضغط على الصورة المصغرة
// function changeMainImage(thumbnail, newSrc) {
//     const mainImg = document.getElementById('main-product-img');

//     // إزالة التنشيط من جميع الصور المصغرة
//     document.querySelectorAll('.img-thumbnail').forEach(img => {
//         img.classList.remove('active');
//     });

//     // إضافة التنشيط للصورة المحددة
//     thumbnail.classList.add('active');

//     // تغيير الصورة الرئيسية مع تأثير التدرج
//     mainImg.style.opacity = '0';
//     setTimeout(() => {
//         mainImg.src = newSrc;
//         mainImg.style.opacity = '1';
//     }, 200);
// }

// // تكبير/تصغير الصورة الرئيسية
// function zoomImage(img) {
//     const overlay = document.getElementById('zoom-overlay');

//     if (img.classList.contains('zoomed')) {
//         img.classList.remove('zoomed');
//         overlay.style.display = 'none';
//     } else {
//         img.classList.add('zoomed');
//         overlay.style.display = 'block';
//     }
// }

// // إغلاق التكبير عند النقر خارج الصورة
// document.addEventListener('click', function (e) {
//     const zoomedImg = document.querySelector('.main-product-image.zoomed');
//     const overlay = document.getElementById('zoom-overlay');

//     if (zoomedImg && e.target === overlay) {
//         zoomedImg.classList.remove('zoomed');
//         overlay.style.display = 'none';
//     }
// });

// // إغلاق التكبير عند الضغط على ESC
// document.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape') {
//         const zoomedImg = document.querySelector('.main-product-image.zoomed');
//         const overlay = document.getElementById('zoom-overlay');

//         if (zoomedImg) {
//             zoomedImg.classList.remove('zoomed');
//             overlay.style.display = 'none';
//         }
//     }
// });

// ////////////////////////////////////////






// /* Related Products Section */

// // إذا أردت تحويلها إلى سلايدر
// // أضف هذه الأكواد في ملف JS
// $(document).ready(function () {
//     $('.related-products .row').addClass('owl-carousel owl-theme');

//     $('.owl-carousel').owlCarousel({
//         loop: true,
//         margin: 20,
//         nav: true,
//         responsive: {
//             0: {
//                 items: 1
//             },
//             576: {
//                 items: 2
//             },
//             768: {
//                 items: 3
//             },
//             992: {
//                 items: 4
//             }
//         }
//     });
// });





// $(document).ready(function () {
//     $('.related-products .row').slick({
//         dots: true,
//         infinite: true,
//         speed: 300,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                     slidesToShow: 3,
//                 }
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 2,
//                 }
//             },
//             {
//                 breakpoint: 576,
//                 settings: {
//                     slidesToShow: 1,
//                 }
//             }
//         ]
//     });
// });
// //display data in page  




























// const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
// const selectedCategory = selectedProduct.Category || selectedProduct.SubCategory; // حسب ما انت مسميه
// const store = JSON.parse(localStorage.getItem("Store"));
// const allProducts = [
//   ...store.Store.men.ProductCategory.Products,
//   ...store.Store.women.ProductCategory.Products,
//   ...store.Store.accessories.ProductCategory.Products
// ];

// // فلترة المنتجات من نفس القسم، واستبعاد المنتج الحالي
// const sameCategoryProducts = allProducts.filter(p =>
//   (p.Category === selectedCategory || p.SubCategory === selectedCategory) &&
//   p.ProductCode !== selectedProduct.ProductCode
// );
// function getRandomProducts(products, count) {
//   const shuffled = products.sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// }

// const randomProducts = getRandomProducts(sameCategoryProducts, 4);
// const relatedContainer = document.getElementById('related-products');
// relatedContainer.innerHTML = '';

// randomProducts.forEach(product => {
//   const productCard = document.createElement('div');
//   productCard.className = 'col-lg-3 col-md-6 mb-4';
//   productCard.innerHTML = `
//     <div class="product-card shadow-sm p-3">
//         <div class="product-img mb-2">
//             <img src="${product.ProductImage}" class="img-fluid" alt="${product.ProductName}">
//         </div>
//         <h6 class="product-name">${product.ProductName}</h6>
//         <p class="product-price">${product.priceAfterDiscount} <del>${product.ProductPrice}</del></p>
//         <button class="btn btn-dark btn-sm quick-view" data-id="${product.ProductCode}">
//             عرض سريع
//         </button>
//     </div>
//   `;
//   relatedContainer.appendChild(productCard);
// });

// // تفعيل عرض سريع
// document.querySelectorAll('.quick-view').forEach(btn => {
//   btn.addEventListener('click', function () {
//     const id = this.dataset.id;
//     const product = allProducts.find(p => p.ProductCode === id);
//     if (product) {
//       localStorage.setItem('selectedProduct', JSON.stringify(product));
//       window.location.href = '/product.html';
//     }
//   });
// });
















const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
const selectedCategory = selectedProduct.Category || selectedProduct.SubCategory;

const store = JSON.parse(localStorage.getItem("Store"));
const allProducts = [
  ...store.Store.men.ProductCategory.Products,
  ...store.Store.women.ProductCategory.Products,
  ...store.Store.accessories.ProductCategory.Products
];

// فلترة المنتجات من نفس القسم، واستبعاد المنتج الحالي
const sameCategoryProducts = allProducts.filter(p =>
  (p.Category === selectedCategory || p.SubCategory === selectedCategory) &&
  p.ProductCode !== selectedProduct.ProductCode
);

function getRandomProducts(products, count) {
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const randomProducts = getRandomProducts(sameCategoryProducts, 4);
const relatedContainer = document.getElementById('related-products');
relatedContainer.innerHTML = '';

randomProducts.forEach(product => {
  const productCard = document.createElement('div');
  productCard.className = 'col-lg-3 col-md-6 mb-4';
  productCard.innerHTML = `
    <div class="product-card shadow-sm p-3 position-relative">
      <div class="position-absolute top-0 end-0 m-2">
        <i class="fa fa-heart text-danger me-2 cursor-pointer" title="أضف للمفضلة"></i>
        <i class="fa fa-cart-plus text-dark cursor-pointer" title="أضف إلى السلة"></i>
      </div>
      <div class="product-img mb-2 mt-4">
        <img src="${product.ProductImage}" class="img-fluid" alt="${product.ProductName}">
      </div>
      <h6 class="product-name mt-2">${product.ProductName}</h6>
      <p class="product-price">${product.priceAfterDiscount} <del>${product.ProductPrice}</del></p>
      <button class="btn btn-dark btn-sm quick-view" data-id="${product.ProductCode}">
        عرض سريع
      </button>
    </div>
  `;
  relatedContainer.appendChild(productCard);
});

// تفعيل عرض سريع
document.querySelectorAll('.quick-view').forEach(btn => {
  btn.addEventListener('click', function () {
    const id = this.dataset.id;
    const product = allProducts.find(p => p.ProductCode === id);
    if (product) {
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = '/product.html';
    }
  });
});











































// JS/product.js

// استرجاع المستخدم الحالي من localStorage
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    alert("Please log in to continue.");
    window.location.href = "login.html";
}

// بيانات المنتج الحالي (ممكن تجي من URL أو ملف JSON خارجي - هنا هنعمل مثال ثابت)
// const product = {
//     id: "p001",
//     name: "Sulwhasoo Essential Cream",
//     description: "A luxurious moisturizing cream for radiant skin.",
//     price: 1260.00,
//     image: "./images/black.jpg",
//     sku: "124224",
//     categories: ["Crux", "Indoor", "Fast", "Easy"],
//     tags: ["Accessories", "Business"]
// };
const product=JSON.parse(localStorage.getItem('selectedProduct'))
    document.querySelector(".product-title").innerHTML = JSON.parse(localStorage.getItem('selectedProduct')).ProductName
    document.querySelector(".product-description").innerHTML = JSON.parse(localStorage.getItem('selectedProduct')).ProductDescription
    document.querySelector(".product-price").innerHTML = JSON.parse(localStorage.getItem('selectedProduct')).ProductPrice
    document.querySelector("#main-product-img").src = JSON.parse(localStorage.getItem('selectedProduct')).ProductImage


// عرض بيانات المنتج على الصفحة
// document.querySelector(".product-title").textContent = product.name;
// document.querySelector(".product-description").textContent = product.description;
// document.querySelector(".product-price").textContent = `$${product.price.toFixed(2)}`;

// التحكم في الحجم المختار
let selectedSize = "M";
document.querySelectorAll(".size-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedSize = btn.textContent;
        document.getElementById("selected-size").textContent = selectedSize;
    });
});

// التحكم في اللون المختار
let selectedColor = "Black";
document.querySelectorAll(".color-circle").forEach(circle => {
    circle.addEventListener("click", () => {
        document.querySelectorAll(".color-circle").forEach(c => c.classList.remove("selected"));
        circle.classList.add("selected");
        selectedColor = circle.getAttribute("title");
        document.getElementById("selected-color").textContent = selectedColor;
    });
});

// التحكم في الكمية
const quantityInput = document.getElementById("quantity");
document.getElementById("increase").addEventListener("click", () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
});
document.getElementById("decrease").addEventListener("click", () => {
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
});

// عند الضغط على "Add To Cart"
// document.querySelector(".btn-add-to-cart").addEventListener("click", () => {
//     // const quantity = parseInt(quantityInput.value);
//     const cartItem = JSON.parse(localStorage.getItem('selectedProduct'))
// console.log(JSON.parse(localStorage.getItem('selectedProduct')))
//     // تحميل السلة من localStorage
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     console.log(cart)
// cart.push(cartItem);
//     // localStorage.setItem("cart", JSON.stringify(cart));

//     // إضافة المنتج مع تحديد إذا كان موجود بنفس الحجم واللون
//     const existingItemIndex = cart.findIndex(
//         item => item.ProductCode === product.ProductCode && item.size === selectedSize && item.color === selectedColor
//     );

//     if (existingItemIndex > -1) {
//         cart[existingItemIndex].quantity += quantityInput.value;
//     } else {
//         cart.push(cartItem);
//         console.log(quantityInput.value)
//     }

//     // حفظ السلة في localStorage
//     localStorage.setItem("cart", JSON.stringify(cart));

//     // // ربط المنتج بالمستخدم الحالي
   
//     alert("Product added to cart!");
// });
document.querySelector(".btn-add-to-cart").addEventListener("click", () => {
    const cartItem = {
        ...JSON.parse(localStorage.getItem('selectedProduct')),
        size: selectedSize,
        color: selectedColor,
        quantity: parseInt(quantityInput.value)
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex(
        item => item.ProductCode === cartItem.ProductCode &&
                item.size === cartItem.size &&
                item.color === cartItem.color
    );

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += cartItem.quantity;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
});

// عند الضغط على "Buy Now"
document.querySelector(".btn-buy-now").addEventListener("click", () => {
    document.querySelector(".btn-add-to-cart").click();
    window.location.href = "cart.html";
});

// تغيير الصورة الرئيسية
function changeMainImage(thumbnail, imageUrl) {
    document.getElementById("main-product-img").src = imageUrl;

    document.querySelectorAll(".thumbnail-gallery img").forEach(img => {
        img.classList.remove("active");
    });
    thumbnail.classList.add("active");
}

// تكبير الصورة الرئيسية
function zoomImage(img) {
    window.open(img.src, '_blank');
}







