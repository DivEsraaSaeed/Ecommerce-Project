$(function () {
  let users = JSON.parse(localStorage.getItem("currentUser"));
  localStorage.setItem("currentUser", JSON.stringify(users));
  let ProductSize = "";
  let discount = "";
  let priceAfterDiscount = "";
  let SellerData = users;
$("#iconUP").addClass("d-none")
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

  let ProductPriceForDiscount = parseFloat($("#ProductPriceForDiscount").val());
  let ValueDiscount = parseFloat($("#ValueDiscount").val());

  if (
    isNaN(ProductPriceForDiscount) ||
    isNaN(ValueDiscount) ||
    ProductPriceForDiscount <= 0 ||
    ValueDiscount <= 0 ||
    ValueDiscount > 100
  ) {
    Toastify({
      text: '<i class="fas fa-exclamation-circle"></i> Enter valid values (Price > 0 and Discount between 1-100)!',
      duration: 3000,
      escapeMarkup: false,
      style: {
        background: "#dc3545", 
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
  if (discount && discount > 0) {
    Toastify({
      text: '<i class="fas fa-check-circle"></i> Deducted',
      duration: 3000,
      escapeMarkup: false,
      style: {
        background: "#28a745",
        fontSize: "16px",
      },
    }).showToast();

    $("#DiscountPrice").val(discount.toFixed(2)); // Update discounted price
  } else {
    Toastify({
      text: '<i class="fas fa-exclamation-circle"></i> Please calculate the discount first!',
      duration: 3000,
      escapeMarkup: false,
      style: {
        background: "#ffc107", // Yellow for warning
        fontSize: "16px",
      },
    }).showToast();
  }
});



       function updatePreview() {
        const input = document.getElementById("image-input");
        const previewContainer = document.getElementById("Preview-container");
        var imagesArray = input.value.split(",");
        previewContainer.innerHTML = "";
        imagesArray.forEach((url) => {
          const img = document.createElement("img");
          img.src = url;
          img.className = "img-thumbnail m-1";
          img.style = "width: 100px; height: 100px; object-fit: cover;";
          previewContainer.appendChild(img);
        });
      }
   $("#image-input").on("input", updatePreview);

   function updateColorPreview() {
  const input = document.getElementById("color-input");
  const previewContainer = document.getElementById("color-preview");
  let colorsArray = input.value.split(",").map(color => color.trim());

  previewContainer.innerHTML = "";

  colorsArray.forEach((color) => {
    const colorBox = document.createElement("div");
    colorBox.style = `width: 50px; height: 50px; background-color: ${color}; margin: 5px; border: 1px solid #ccc;`;
    previewContainer.appendChild(colorBox);
  });
}

$("#color-input").on("input", updateColorPreview);


  $("#add").on("click", function (e) {
    e.preventDefault();

    let form = $(".formAdd")[0];

    if (!form.checkValidity()) {
      // form.reportValidity(); //Testtttt
      form.classList.add("was-validated");



      return;
    }

    let ProductCode = generateProductCode();
    // let ProductCode = $("#ProductCode").val();
    let ProductName = $("#ProductName").val();
    let ProductColors = $("#ProductColors").val().split(",").map((cl) => cl.trim()).filter((cl) => cl !== "") || "No Colors";

    
    let ProductPrice = $("#ProductPrice").val();
    let ProductCount = $("#ProductCount").val();
    let DiscountPrice = $("#DiscountPrice").val();

    let ProductStatus = $("input[name='ProductStatus']:checked").val();
    let ValueDiscount = $("#ValueDiscount").val() || 0;
    let ProductDescription = $("#ProductDescription").val();
    let ProductCategory = $("#ProductCategory").val();
    let SubCategory = $("#SubCategory").val();
    // let ProductImage = $("#ProductImage").val().split("\\").pop();
    let ProductImage =  $("#image-input").val().split(",").map((img) => img.trim()).filter((img) => img !== "");
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
      women:
        "https://f.nooncdn.com/mpcms/EN0003/assets/28aca5b8-e0f5-4514-bfec-817c22625f09.png",
      // accessories: "https://market-resized.envatousercontent.com/photodune.net/EVA/TRX/88/c3/3d/58/f2/v1_E10/E109KVRF.jpg?auto=format&q=94&mark=https%3A%2F%2Fassets.market-storefront.envato-static.com%2Fwatermarks%2Fphoto-260724.png&opacity=0.2&cf_fit=cover&w=500&s=54f91335d47d7f9cdef8078ab988abb91941d428b593ac58eac4d6a41c92fa56",
      // men:"/src/Components/img/men.jpg",
      // women: "/src/Components/img/women.jpg ",
      accessories: "/Components/img/accessories.jpg",

      default: "/Components/img/Category.webp",
    };
    let finalNewProductCategory = newProductCategory || ProductCategory;
    let normalizedCategory = finalNewProductCategory;
    let selectedCategoryImage =
      categoryImages[normalizedCategory] || categoryImages["default"];
    if (!ProductsList.Store[finalNewProductCategory]) {
      ProductsList.Store[finalNewProductCategory] = {
        CategoryImage: CategoryImage
          ? `/Components/img/${CategoryImage}`
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
      ProductImage,
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
document.getElementById("Preview-container").innerHTML = "";
document.getElementsByClassName("priceAfterDiscount").innerHTML = "";

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
