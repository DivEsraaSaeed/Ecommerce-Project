import data from './data.js';

let products = JSON.parse(localStorage.getItem("products")) || [];

// حفظ البيانات في localStorage لأول مرة إذا لم تكن موجودة
if (!localStorage.getItem("Store")) {
    localStorage.setItem("Store", JSON.stringify(data.Store));
}

const storeData = JSON.parse(localStorage.getItem("Store"));
if (!storeData) {
    console.error("لا توجد بيانات في localStorage");
}

const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get("cat") || "men"; // افتراض "men" كفئة في حال عدم وجود فئة في الرابط

// استخراج المنتجات حسب الفئة
const productsArray = storeData[categoryName]?.ProductCategory?.Products || storeData[categoryName]?.Products || [];

const productList = document.getElementById("productsContainer");
const priceRangeInput = document.getElementById("priceRange");
const maxPrice = document.getElementById("maxPrice");

// عرض اسم القسم بالعربي
const categoryTitle = document.getElementById("categoryTitle");
const arabicCategoryNames = {
    men: "قسم الرجال",
    women: "قسم النساء",
    accessories: "قسم الإكسسوارات"
};
categoryTitle.textContent = arabicCategoryNames[categoryName] || "منتجات";

// دالة لعرض المنتجات
function renderProducts(productsArray) {
    productList.innerHTML = ""; // تنظيف الحاوية قبل إضافة المنتجات

    if (productsArray.length === 0) {
        productList.innerHTML = `<p style="text-align: center; font-size: 18px;">لا توجد منتجات متاحة حالياً في هذا القسم.</p>`;
        return;
    }

    productsArray.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.ProductImage}" style="width: 100%; height: 250px; object-fit: cover;">
            <h3>${product.ProductName}</h3>
            <p>السعر: ${product.priceAfterDiscount} جنيه</p>
            <p>الخصم: ${product.ValueDiscount}%</p>
            <p>الحالة: ${product.ProductStatus}</p>
            <button class="quick-view">عرض سريع</button>
        `;

        // إضافة حدث للعرض السريع
        productCard.querySelector('.quick-view').addEventListener('click', () => {
            localStorage.setItem('selectedProductId', product.ProductId);
            window.location.href = 'product.html'; // إعادة التوجيه لصفحة المنتج
        });

        productList.appendChild(productCard);
    });
}

// دالة لتصفية المنتجات حسب السعر
function filterByPrice() {
    const max = parseFloat(priceRangeInput.value);
    maxPrice.textContent = max;
    const filtered = productsArray.filter(p => parseFloat(p.priceAfterDiscount || p.ProductPrice) <= max);
    renderProducts(filtered);
}

// تفعيل الفلتر عند تغيير السلايدر
priceRangeInput.addEventListener("input", filterByPrice);

// عرض المنتجات لأول مرة
renderProducts(productsArray);
