import data from '/data.js';

// حفظ البيانات في localStorage
localStorage.setItem('Store', JSON.stringify(data));

// إضافة حدث النقر على الأقسام
document.querySelectorAll(".category").forEach((category) => {
    category.addEventListener("click", () => {
        const selectedCategory = category.getAttribute("data-category");
        localStorage.setItem('selectedCategory', selectedCategory);
        window.location.href = 'productsCategory.html';
    });
});