// قراءة البيانات من localStorage
const storeData = JSON.parse(localStorage.getItem("Store"));
const categoryName = new URLSearchParams(window.location.search).get('cat') || 'men'; // قراءة القسم من URL
const category = storeData[categoryName];
const products = category.ProductCategory?.Products || category.Products;

// عناصر الـ DOM
const productList = document.getElementById('product-list');
const priceMinInput = document.getElementById('priceMin');
const priceMaxInput = document.getElementById('priceMax');

// عرض المنتجات
function renderProducts(productsArray) {
    productList.innerHTML = "";
    productsArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = "col-lg-4 col-md-6 mb-4";
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.ProductImage}" class="card-img-top" style="height: 250px; object-fit: cover;">
                <div class="card-body text-center">
                    <h5 class="card-title">${product.ProductName}</h5>
                    <p class="card-text">${product.priceAfterDiscount} EGP</p>
                    
                    <!-- عرض حالة الخصم -->
                    <p class="text-success">${product.ValueDiscount > 0 ? "خصم: " + product.ValueDiscount + "%" : "بدون خصم"}</p>
                    
                    <button class="btn btn-primary add-to-cart">أضف إلى السلة</button>
                    <button class="btn btn-outline-secondary quick-view">عرض سريع</button>
                </div>
            </div>
        `;
        
        // ربط زر عرض التفاصيل
        productCard.querySelector('.quick-view').addEventListener('click', () => {
            localStorage.setItem('selectedProductId', product.ProductId);
            window.location.href = 'product.html';
        });

        // زر إضافة للسلة
        productCard.querySelector('.add-to-cart').addEventListener('click', () => {
            addToCart(product);
        });

        productList.appendChild(productCard);
    });
}

// فلترة المنتجات حسب السعر
function filterProducts() {
    let filtered = products;

    // فلتر السعر
    const minPrice = parseFloat(priceMinInput.value) || 0;
    const maxPrice = parseFloat(priceMaxInput.value) || Infinity;
    filtered = filtered.filter(product => {
        const price = parseFloat(product.priceAfterDiscount || product.ProductPrice);
        return price >= minPrice && price <= maxPrice;
    });

    // عرض المنتجات بعد الفلترة
    renderProducts(filtered);
}

// إضافة المنتج إلى السلة
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    cart.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

// ربط الفلاتر مع الأحداث
priceMinInput.addEventListener('input', filterProducts);
priceMaxInput.addEventListener('input', filterProducts);

// تحميل المنتجات عند أول زيارة
renderProducts(products);
