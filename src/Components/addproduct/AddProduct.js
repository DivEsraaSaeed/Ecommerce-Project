$(function () {
  let users = JSON.parse(localStorage.getItem("Login"));
  localStorage.setItem("Login", JSON.stringify(users));
  let ProductSize = "";
  let discount = "";
  let priceAfterDiscount = "";
  let SellerData = users[0];

  function generateProductCode(length = 4) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const existingCodes = new Set(getAllProductCodes());
    let code;

    do {
      code = "";
      for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } while (existingCodes.has(code));

    return code;
  }

  function getAllProductCodes() {
    let ProductsList = JSON.parse(localStorage.getItem("Store")) || {
      Store: {},
      Sellers: [],
    };
    let codes = [];
    for (const category in ProductsList.Store) {
      ProductsList.Store[category].ProductCategory.Products.forEach(
        (product) => {
          if (product.ProductCode) {
            codes.push(product.ProductCode);
          }
        }
      );
      return codes;
    }
  }

  $(`input[name="productSize"]`).on("change", function () {
    ProductSize = $(`input[name="productSize"]:checked`)
      .map(function () {
        return $(this).val();
      })
      .get();
  });

  $("#CheckPrice").on("click", function (e) {
    e.preventDefault();
    let ProductPriceForDiscount = parseFloat(
      $("#ProductPriceForDiscount").val()
    );

    let ValueDiscount = parseFloat($("#ValueDiscount").val());

    if (isNaN(ProductPriceForDiscount) || isNaN(ValueDiscount)) {
      Toastify({
        text: '<i class="fas fa-check-circle"></i> enter valid values for price and discount !',
        duration: 3000,
        escapeMarkup: false,
        style: {
          background: "#28a745",
          fontSize: "16px",
        },
      }).showToast();

      return;
    }

    let discountAmount = (ProductPriceForDiscount * ValueDiscount) / 100;
    discount = ProductPriceForDiscount - discountAmount;

    $(".priceAfterDiscount").text(discount.toFixed(2));
  });
  $("#Discount").on("click", function () {
    priceAfterDiscount = discount;
    $("#DiscountPrice").val(priceAfterDiscount);
  });

  $("#add").on("click", function (e) {
    e.preventDefault();

    let form = $(".formAdd")[0];

    if (!form.checkValidity()) {
      form.reportValidity(); //Testtttt
      form.classList.add("was-validated");



      return;
    }

    let ProductCode = generateProductCode();
    // let ProductCode = $("#ProductCode").val();
    let ProductName = $("#ProductName").val();
    let ProductColors = $("#ProductColors").val() || "Colors";
    let ProductPrice = $("#ProductPrice").val();
    let ProductCount = $("#ProductCount").val();
    let DiscountPrice =    $("#DiscountPrice").val();

    let ProductStatus = $("input[name='ProductStatus']:checked").val();
    let ValueDiscount = $("#ValueDiscount").val() || 0;
    let ProductDescription = $("#ProductDescription").val();
    let ProductCategory = $("#ProductCategory").val();
    let SubCategory = $("#SubCategory").val();
    let ProductImage = $("#ProductImage").val().split("\\").pop();
    let CategoryImage = $("#CategoryImage").val().split("\\").pop();
    let newProductCategory = $("#newProductCategory").val();
    let ProductRate = $("#ProductRate").val() || 0;
    let ProductReviews = $("#ProductReviews").val() || 0;
    let SellerName = SellerData.username;
    let SellerEmail = SellerData.email;

    let ProductsList = JSON.parse(localStorage.getItem("Store")) || {
      Store: {},
      Sellers: [],
    };
    const categoryImages = {
      men: "https://f.nooncdn.com/mpcms/EN0003/assets/ad1e812d-4463-4c8b-a39e-4f130c3e7ae9.png",
      women: "https://f.nooncdn.com/mpcms/EN0003/assets/28aca5b8-e0f5-4514-bfec-817c22625f09.png",
      accessories: "https://f.nooncdn.com/mpcms/EN0003/assets/28aca5b8-e0f5-4514-bfec-817c22625f09.png",
      
      default: "/src/Components/img/Category.webp"
    };
    let finalNewProductCategory = newProductCategory || ProductCategory;
    let normalizedCategory = finalNewProductCategory.toLowerCase();
    let selectedCategoryImage = categoryImages[normalizedCategory] || categoryImages["default"];
    if (!ProductsList.Store[finalNewProductCategory]) {
      ProductsList.Store[finalNewProductCategory] = {
        CategoryImage: CategoryImage
          ? `/src/Components/img/${CategoryImage}`
          : selectedCategoryImage,
        ProductCategory: {
          Products: [],
        },
      };
    }

    let lastProduct =
      ProductsList.Store[finalNewProductCategory].ProductCategory.Products;

    let id =
      lastProduct.length > 0
        ? lastProduct[lastProduct.length - 1].ProductId + 1
        : 1;

    let Product = {
      ProductId: id,
      SellerName,
      SellerEmail,
      ProductCode,
      ProductName,
      ProductColors,
      ProductPrice,
      ValueDiscount,
      DiscountPrice,
      priceAfterDiscount: Number($("#DiscountPrice").val(priceAfterDiscount)),
      ProductCount,
      ProductSize,
      ProductCategory,
      SubCategory,
      ProductStatus,
      ProductImage: `/src/Components/img/${ProductImage}`,
      ProductDescription,
      ProductRate,
      ProductReviews,
    };

    ProductsList.Store[finalNewProductCategory].ProductCategory.Products.push(
      Product
    );
    if (
      !ProductsList.Sellers.some((seller) => seller.email === SellerData.email)
    ) {
      ProductsList.Sellers.push(SellerData);
    }

    localStorage.setItem("Store", JSON.stringify(ProductsList));

    form.reset();
    $(form).removeClass("was-validated");

    Toastify({
      text: '<i class="fas fa-check-circle"></i> Product added successfully!',
      duration: 3000,
      escapeMarkup: false,
      style: {
        background: "#28a745",
        fontSize: "16px",
      },
    }).showToast();
  });
});
