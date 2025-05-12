document.addEventListener('DOMContentLoaded', function () {
    // 1. جلب البيانات
    const selectedCategory = localStorage.getItem('selectedCategory');
    // const selectedCategory = "accessories";

    const storedData = JSON.parse(localStorage.getItem('Store'));
    // const allProducts = storedData.Store[selectedCategory].Products;
    // const allProducts = storedData.Store.women.ProductCategory.Products;
    const allProducts = storedData.Store[selectedCategory].ProductCategory.Products;

    // 2. عناصر DOM
    const productsContainer = document.getElementById('productsContainer');
    const priceSlider = document.getElementById('priceRange');
    const maxPriceDisplay = document.getElementById('maxPrice');
    const viewButtons = document.querySelectorAll('.view-options button');
    const cartCountElement = document.querySelector('.cart-count');

    // 3. إدارة سلة التسوق
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        cartCountElement.textContent = cartItems.length;
    }

    function addToCart(product) {
        cartItems.push(product);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartCount();

        // تأثير الإضافة
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.classList.add('added-to-cart');
        setTimeout(() => {
            cartIcon.classList.remove('added-to-cart');
        }, 500);
    }

    // 4. حساب نطاق الأسعار
    const prices = allProducts.map(p => parseFloat(p.ProductPrice));
    const maxPrice = Math.max(...prices);
    priceSlider.min = Math.min(...prices);
    priceSlider.max = maxPrice;
    priceSlider.value = maxPrice;
    maxPriceDisplay.textContent = maxPrice;

    // 5. دالة عرض المنتجات
    function renderProducts(maxPriceFilter = maxPrice, viewType = 'grid') {
        productsContainer.innerHTML = '';
        productsContainer.className = viewType === 'grid' ? 'products-grid' : 'products-list';

        const filteredProducts = allProducts.filter(product => {
            return parseFloat(product.ProductPrice) <= maxPriceFilter;
        });

        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-box-open"></i>
                    <p>لا توجد منتجات في هذا النطاق السعري</p>
                </div>
            `;
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            console.log(product.ProductImage);
            productCard.innerHTML = viewType === 'list' ? `
                <div class="product-img">
                    <img src="${product.ProductImage}" alt="${product.ProductName}"/>
                    ${product.ProductStatus !== 'InStore' ?
                    `<span class="product-badge">${product.ProductStatus}</span>` : ''}
                    <div class="product-actions">
                        <button class="action-btn quick-view" title="عرض سريع">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn add-to-wishlist" title="إضافة للمفضلة">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.ProductName}</h3>
                    <p class="product-desc">${product.ProductDescription}</p>
                    <div class="product-footer">
                        <p class="product-price">${parseFloat(product.ProductPrice).toFixed(2)} جنيه</p>
                        <button class="add-to-cart">Add To Card</button>
                    </div>
                </div>
            ` : `
                <div class="product-img">
                    <img src="${product.ProductImage}" alt="${product.ProductName}">
                    ${product.ProductStatus !== 'InStore' ?
                `<span class="product-badge">${product.ProductStatus}</span>` : ''}
                    <div class="product-actions">
                        <button class="action-btn quick-view" title="عرض سريع">
                            <i id="showproduct" class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn add-to-wishlist" title="إضافة للمفضلة">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.ProductName}</h3>
                    <p class="product-price">${parseFloat(product.ProductPrice).toFixed(2)} جنيه</p>
                    <button class="add-to-cart" data-id="${product.ProductCode}">Add To Cart</button>
                </div>
            `;



            const quickViewBtn = productCard.querySelector('.quick-view');

            quickViewBtn.addEventListener('click', () => {
                // احفظ المنتج في localStorage
                localStorage.setItem('selectedProduct', JSON.stringify(product));

                // روح لصفحة التفاصيل
                window.location.href = '/product.html';
            });


            // إضافة حدث السلة
            // const addBtn = productCard.querySelector('.add-to-cart');
            // addBtn.addEventListener('click', () => addToCart(product));



            const addBtn = productCard.querySelectorAll('.add-to-cart');
            addBtn.forEach((btn) => {

                btn.addEventListener('click', () => {

                   
                        console.log("🚀 addToCart called with:", product); // Debug 1
                    
                        let cart = JSON.parse(localStorage.getItem("cart")) || [];
                        console.log("🛒 Current cart:", cart); // Debug 2
                    
                        console.log("🔍 Searching for ProductCode:", product.ProductCode); // Debug 3
                    
                        let existingProductIndex = cart.findIndex(p => p.ProductCode === product.ProductCode);
                        console.log("📌 existingProductIndex:", existingProductIndex); // Debug 4
                    
                        if (existingProductIndex !== -1) {
                            cart[existingProductIndex].quantity += 1;
                        } else {
                            product.quantity = 1;
                            cart.push(product);
                        }
                    
                        localStorage.setItem("cart", JSON.stringify(cart));
                    
                        currentUser.items = cart.reduce((sum, p) => sum + p.quantity, 0);
                        currentUser.cart = cart;
                        localStorage.setItem("currentUser", JSON.stringify(currentUser));
                    
                        let users = JSON.parse(localStorage.getItem('users')) || [];
                        let updatedUsers = users.map(u => u.email === currentUser.email ? currentUser : u);
                        localStorage.setItem('users', JSON.stringify(updatedUsers));
                    
                        displayCart();
                        updateTotalPrice();
                
                    
                    
                    // let id;
                    // id = btn.dataset.id;
                    // let Store = JSON.parse(localStorage.getItem("Store"))
                    // // console.log(Store)
                    // let men = Store.Store.men.ProductCategory.Products
                    // let women = Store.Store.women.ProductCategory.Products
                    // let acccessories = Store.Store.accessories.ProductCategory.Products
                    // let allProduct = [...men, ...women, ...acccessories]

                    // let filteredData = allProduct.filter((p) => {
                    //     return p.ProductCode == id;

                    // })
                    // filteredData[0].quantity = 1
                    // let cart = JSON.parse(localStorage.getItem("cart"))
                    // if(cart){
                    //     for(i in cart){
                    //         if(cart[i].ProductCode == filteredData[0].ProductCode){
                    //             filteredData[0].quantity+=1
                    //         }
                    //     }


                    //     // cart.forEach((p)=>{
                    //     //     if(p.ProductCode== filteredData[0].ProductCode){
                    //     //         filteredData[0].quantity+=1
                    //     //     }
                    //     // })
                    // }
                    // addToCart(filteredData[0])
                   
                });
            })
            // addBtn.addEventListener('click', () => addToCart(product));

            productsContainer.appendChild(productCard);
        });
    }

    // 6. أحداث السلايدر
    priceSlider.addEventListener('input', function () {
        const selectedPrice = parseFloat(this.value);
        maxPriceDisplay.textContent = selectedPrice;
        const currentView = document.querySelector('.view-options button.active').dataset.view;
        renderProducts(selectedPrice, currentView);
    });

    // 7. أحداث أزرار العرض
    viewButtons.forEach(button => {
        button.addEventListener('click', function () {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const viewType = this.dataset.view;
            renderProducts(parseFloat(priceSlider.value), viewType);
        });
    });



    // function addToCart(product) {
    //     let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    //     if (!currentUser) return alert("سجّل دخول الأول ✋");

    //     if (!Array.isArray(currentUser.cart)) {
    //         currentUser.cart = [];
    //     }

    //     const index = currentUser.cart.findIndex(item => item.id === product.id);
    //     if (index > -1) {
    //         currentUser.cart[index].quantity += 1;
    //     } else {
    //         product.quantity = 1;
    //         currentUser.cart.push(product);
    //     }

    //     currentUser.items = currentUser.cart.reduce((sum, item) => sum + item.quantity, 0);

    //     localStorage.setItem("currentUser", JSON.stringify(currentUser));

    //     let users = JSON.parse(localStorage.getItem("users")) || [];
    //     users = users.map(u => u.email === currentUser.email ? currentUser : u);
    //     localStorage.setItem("users", JSON.stringify(users));

    //     alert("✅ تمت إضافة المنتج للسلة");
    // }






    // 8. التهيئة الأولية
    updateCartCount();
    renderProducts();
});







// $(document).ready(function () {
//     let likeCount = 0;
//     let likedProducts = new Set();
//     const storedProducts = localStorage.getItem("likedProducts");
//     if (storedProducts) {
//       likedProducts = new Set(JSON.parse(storedProducts));
//       likeCount = likedProducts.size;
//       $("#shop-count").text(likeCount);
//       // Update the button icons for liked products
//       likedProducts.forEach((id) => {
//         $(`.shop-btn[data-id='${id}']`).html(
//           '<i class=" text-danger fa-solid fa-cart-shopping"></i>'
//         );
//       });
//     }});