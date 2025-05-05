//search bar
$(document).ready(function () {
  let isOpen = false;
  $("#search-icon").click(function (e) {
    e.stopPropagation();
    if (!isOpen) {
      $("#search-bar").animate({ width: "173px" }, 300).focus();
      isOpen = true;
    } else {
      $("#search-bar").animate({ width: "0" }, 300);
      isOpen = false;
    }
  });
  $(document).click(function (e) {
    if (!$(e.target).closest("#search-icon, #search-bar").length) {
      $("#search-bar").animate({ width: "0" }, 300);
      isOpen = false;
    }
  });
 

});
 //end search bar



//start search


// $(document).ready(function () {
//   $("#search-bar").on("input", function () {
//     let keyword = $(this).val().toLowerCase();
//     if (keyword === "") {
//       $(".Our-Product").hide();
//     } else {
//       $(".Our-Product").each(function () {
//         let text = $(this).text().toLowerCase();
//         if (text.includes(keyword)) {
//           $(this).show();
//         } else {
//           $(this).hide();
//         }
//       });
//     }
//   });
// });

//nav bar=====================
$(document).ready(function () {
  let shown = false;

  $(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
      if (!shown) {
        $("#snapbuy-nav")
          .removeClass("animate__fadeOutUp")
          .addClass("animate__animated animate__fadeInDown")
          .fadeIn(300);
        shown = true;
      }
    } else {
      if (shown) {
        $("#snapbuy-nav")
          .removeClass("animate__fadeInDown")
          .addClass("animate__animated animate__fadeOutUp")
          .fadeOut(300);
        shown = false;
      }
    }
  });
});

// Carousel===================
$(document).ready(function () {
  const owl = $(".carousel1").owlCarousel({
    loop: true,
    smartSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 5000,
    items: 1,
  });

  function triggerOverlayAnimation() {
    $(".overlay-content").removeClass("show");

    $(".owl-item.active .overlay-content").addClass("show");
  }
  triggerOverlayAnimation();
  owl.on("changed.owl.carousel", function () {
    setTimeout(() => {
      triggerOverlayAnimation();
    }, 1000);
  });
});
//end Carousel ==============================

//carousel2

$(document).ready(function () {
  const owl2 = $(".carousel2").owlCarousel({
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed: 2000,
    items: 3,
    stagePadding: 100,
    responsive: {
      0: {
        items: 1,
        stagePadding: 0,
      },
      600: {
        items: 2,
        stagePadding: 70,
      },
    },
  });
});
//carousel3==============================
$(document).ready(function () {
  const owl3 = $(".carousel3").owlCarousel({
    loop: true,
    margin: 30,
    rtl: true,
    nav: true,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed: 2000,

    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
    },
  });
});
//carousel4 ============================
$(document).ready(function () {
  const owl4 = $(".carousel4").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed: 2000,
    items: 1,
  });
});
//carousel5=============================
$(document).ready(function () {
  const owl5 = $(".carousel5").owlCarousel({
    loop: true,
    rtl: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },

      1000: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });
});

//dark mood==============
// document.getElementById("toggle-dark").addEventListener("click", function () {
//   document.body.classList.toggle("dark-mode");
// });

//=========================

//important data from json file to local storage================================================

(async function SaveHomeDataToLocalStorage() {
  try {
    const response = await fetch("../home-store.json");
    const data = await response.json();
    localStorage.setItem("home-store", JSON.stringify(data));

    console.log("Data saved to local storage:", data);
  } catch (error) {
    console.error("Error in fetching data from json file:", error);
  }
})();

//end important data from json file to local storage==================

// start load data from local storage===================

(function loadHomeData() {
  const data = JSON.parse(localStorage.getItem("home-store"));
  const men = data.Store.men.ProductCategory.Products;
  const women = data.Store.women.Products;
  const accessories = data.Store.accessories.Products;

  const newArrival = [];
  const Trending = [];
  const inStore = [];
  const bestSeller = [];
  console.log(bestSeller);

  //start filter data===================

  men.forEach((product) => {
    if (product.ProductStatus === "Trending") {
      Trending.push(product);
    } else if (product.ProductStatus === "New Arrival") {
      newArrival.push(product);
    } else if (product.ProductStatus === "InStore") {
      inStore.push(product);
    } else if (product.ProductStatus === "Best Seller") {
      bestSeller.push(product);
    }
  });
  women.forEach((product) => {
    if (product.ProductStatus === "Trending") {
      Trending.push(product);
    } else if (product.ProductStatus === "New Arrival") {
      newArrival.push(product);
    } else if (product.ProductStatus === "InStore") {
      inStore.push(product);
    } else if (product.ProductStatus === "Best Seller") {
      bestSeller.push(product);
    }
  });
  accessories.forEach((product) => {
    if (product.ProductStatus === "Trending") {
      Trending.push(product);
    } else if (product.ProductStatus === "New Arrival") {
      newArrival.push(product);
    } else if (product.ProductStatus === "InStore") {
      inStore.push(product);
    } else if (product.ProductStatus === "Best Seller") {
      bestSeller.push(product);
    }
  });
  const fourBestSeller = bestSeller.slice(0, 4);
  console.log(fourBestSeller);

  const container = document.getElementById("all-new-products");
  const container2 = document.getElementById("trending-products");
  const container3 = document.getElementById("instore-products");
  const container4 = document.getElementById("best-seller-products");
  // new arrival products====================
  newArrival.forEach((product) => {
    const productHTML = `
      <div class="col-lg-3 col-md-6">
        <div class="product-stor-item shadow-sm">
          <div class="product-img overflow-hidden position-relative">
            <img src="${
              product.ProductImage
            }" class="position-absolute img-fluid" alt="${product.ProductName}">
            <ul class="product-size m-0 w-100 align-items-center px-5 justify-content-evenly d-flex list-unstyled position-absolute">
               ${renderSizes(product.ProductSize)}
            </ul>
            <div class="cart-btn hvr-sweep-to-right position-absolute w-100 align-items-center px-4 justify-content-evenly d-flex">
              <a class="text-decoration-none text-light" href="#">
                <i class="fa-solid text-light fa-cart-shopping"></i> Add To Cart
              </a>
            </div>
            <ul class="social-icon list-unstyled position-absolute">
              
              <li class="hvr-rectangle-out d-flex"><a href="#"><i class="fa-solid text-dark fa-eye"></i></a></li>
              <li data-id="${
                product.ProductCode
              }" class="hvr-rectangle-out shop-btn d-flex"><i class="fa-solid text-dark fa-cart-shopping"></i></li>
            </ul>
          </div>
          <div class="product-content pt-3">
            <div class="content d-flex justify-content-between">
              <span class="fs-6 fw-light">${product.SubCategory}</span>
              
              <div class="star">
                 ${renderStars(product.ProductRate)}
              </div>
            </div>
            <h5 class="pt-3">
              <a class="fs-6 text-decoration-none text-dark" href="#">${
                product.ProductName
              }</a>
            </h5>
            <h6 class="fs-5">${
              product.priceAfterDiscount
            } <del class="fw-light fs-6">${product.ProductPrice}</del></h6>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += productHTML;
  });
  // trending products=============================
  Trending.forEach((product) => {
    const productHTML = `
      <div class="col-lg-3 col-md-6">
        <div class="product-stor-item shadow-sm">
          <div class="product-img overflow-hidden position-relative">
            <img src="${
              product.ProductImage
            }" class="position-absolute img-fluid" alt="${product.ProductName}">
            <ul class="product-size m-0 w-100 align-items-center px-5 justify-content-evenly d-flex list-unstyled position-absolute">
              ${renderSizes(product.ProductSize)}
            </ul>
            <div class="cart-btn hvr-sweep-to-right position-absolute w-100 align-items-center px-4 justify-content-evenly d-flex">
              <a class="text-decoration-none text-light" href="#">
                <i class="fa-solid text-light fa-cart-shopping"></i> Add To Cart
              </a>
            </div>
           <ul class="social-icon list-unstyled position-absolute">
              
              <li class="hvr-rectangle-out d-flex"><a href="#"><i class="fa-solid text-dark fa-eye"></i></a></li>
              <li data-id="${
                product.ProductCode
              }" class="hvr-rectangle-out shop-btn d-flex"><i class="fa-solid text-dark fa-cart-shopping"></i></li>
            </ul>
          </div>
          <div class="product-content pt-3">
            <div class="content d-flex justify-content-between">
              <span class="fs-6 fw-light">${product.SubCategory}</span>
              <div class="star">
                 ${renderStars(product.ProductRate)}
              </div>
            </div>
            <h5 class="pt-3">
              <a class="fs-6 text-decoration-none text-dark" href="#">${
                product.ProductName
              }</a>
            </h5>
           <h6 class="fs-5">${
             product.priceAfterDiscount
           } <del class="fw-light fs-6">${product.ProductPrice}</del></h6>
          </div>
        </div>
      </div>
    `;
    container2.innerHTML += productHTML;
  });
  // in store products=====================
  inStore.forEach((product) => {
    const productHTML = `
      <div class="col-lg-3 col-md-6">
        <div class="product-stor-item shadow-sm">
          <div class="product-img overflow-hidden position-relative">
            <img src="${
              product.ProductImage
            }" class="position-absolute img-fluid" alt="${product.ProductName}">
            <ul class="product-size m-0 w-100 align-items-center px-5 justify-content-evenly d-flex list-unstyled position-absolute">
             ${renderSizes(product.ProductSize)}
            </ul>
            <div class="cart-btn hvr-sweep-to-right position-absolute w-100 align-items-center px-4 justify-content-evenly d-flex">
              <a class="text-decoration-none text-light" href="#">
                <i class="fa-solid text-light fa-cart-shopping"></i> Add To Cart
              </a>
            </div>
            <ul class="social-icon list-unstyled position-absolute">
              
              <li class="hvr-rectangle-out d-flex"><a href="#"><i class="fa-solid text-dark fa-eye"></i></a></li>
              <li data-id="${
                product.ProductCode
              }" class="hvr-rectangle-out shop-btn d-flex"><i class="fa-solid text-dark fa-cart-shopping"></i></li>
            </ul>
          </div>
          <div class="product-content pt-3">
            <div class="content d-flex justify-content-between">
              <span class="fs-6 fw-light">${product.SubCategory}</span>
              <div class="star">
                 ${renderStars(product.ProductRate)}
              </div>
            </div>
            <h5 class="pt-3">
              <a class="fs-6 text-decoration-none text-dark" href="#">${
                product.ProductName
              }</a>
            </h5>
            <h6 class="fs-5">${
              product.priceAfterDiscount
            } <del class="fw-light fs-6">${product.ProductPrice}</del></h6>
          </div>
        </div>
      </div>
    `;
    container3.innerHTML += productHTML;
  });

  // best seller products=====================

  fourBestSeller.forEach((product) => {
    const productHTML = `
      <div class="col-lg-3 mb-2 col-md-6">
        <div class="product-stor-item shadow-sm">
          <div class="product-img overflow-hidden position-relative">
            <img src="${
              product.ProductImage
            }" class="position-absolute img-fluid" alt="${product.ProductName}">
            <ul class="product-size m-0 w-100 align-items-center px-5 justify-content-evenly d-flex list-unstyled position-absolute">
             ${renderSizes(product.ProductSize)}
            </ul>
            <div class="cart-btn hvr-sweep-to-right position-absolute w-100 align-items-center px-4 justify-content-evenly d-flex">
              <a class="text-decoration-none text-light" href="#">
                <i class="fa-solid text-light fa-cart-shopping"></i> Add To Cart
              </a>
            </div>
             <ul class="social-icon list-unstyled position-absolute">
              
              <li class="hvr-rectangle-out d-flex"><a href="#"><i class="fa-solid text-dark fa-eye"></i></a></li>
              <li data-id="${
                product.ProductCode
              }" class="hvr-rectangle-out shop-btn d-flex"><i class="fa-solid text-dark fa-cart-shopping"></i></li>
            </ul>
          </div>
          <div class="product-content pt-3">
            <div class="content d-flex justify-content-between">
              <span class="fs-6 fw-light">${product.SubCategory}</span>
              <div class="star">
                 ${renderStars(product.ProductRate)}
              </div>
            </div>
            <h5 class="pt-3">
              <a class="fs-6 text-decoration-none text-dark" href="#">${
                product.ProductName
              }</a>
            </h5>
            <h6 class="fs-5">${
              product.priceAfterDiscount
            } <del class="fw-light fs-6">${product.ProductPrice}</del></h6>
          </div>
        </div>
      </div>
    `;
    container4.innerHTML += productHTML;
  });
  // accessories products=====================
  const container5 = document.getElementById("discover-Accessories");

  accessories.forEach((product) => {
    const productHTML = `<div class="item  col-12 col-md-12">
                      <div
                          class="d-flex flex-column flex-lg-row text-start p-4 justify-content-between product-card w-100">
                          <div class="img-prod w-100 mb-3 mb-lg-0">
                              <img class="w-100 h-100" src="${
                                product.ProductImage
                              }" alt="${product.ProductName}" />
                          </div>
                          <div class="content-prod w-100 ps-lg-4">
                              <div class="star mb-2">
                                   ${renderStars(product.ProductRate)}
                              </div>
                              <h5 class="pt-3">
                                  <a class="fs-5 text-decoration-none text-dark" href="#">${
                                    product.ProductName
                                  }</a>
                              </h5>
                              <h6 class="fs-5">${
                                product.priceAfterDiscount
                              } <del class="fw-light fs-6">${
      product.ProductPrice
    }</del></h6>
                              <a href="#" class="hvr-sweep-to-right text-decoration-none px-4 py-2 swep-a">
                                  Shop Now <i class="fa-solid fa-arrow-right"></i>
                              </a>
                          </div>
                      </div>
                  </div>`;
    container5.innerHTML += productHTML;
  });
  //end accessories products=====================
  //start trending women products=====================
  const container6 = document.getElementById("trending-women");
  women.forEach((product) => {
    const productHTML = ` <div class="   col-md-12">
                                <div class="product-stor-item p-0 border-0">
                                    <div class="product-img overflow-hidden position-relative">
                                        <img src="${
                                          product.ProductImage
                                        }" class="position-absolute" alt="${
      product.ProductName
    }">
                                    </div>
                                    <div class="product-content pt-3">
                                        <div class="content d-flex flex-column ">
                                            <span class="fs-6 fw-light">Casual Wear</span>
                                            <div class="star">
                                                 ${renderStars(
                                                   product.ProductRate
                                                 )}
                                            </div>
                                        </div>
                                        <h5 class="pt-3">
                                            <a class="fs-6 text-decoration-none text-dark" href="#">${
                                              product.ProductName
                                            }</a>
                                        </h5>
                                        <h6 class="fs-5">${
                                          product.priceAfterDiscount
                                        } <del class="fw-light fs-6">${
      product.ProductPrice
    }</del></h6>
                                    </div>
                                </div>
                            </div>`;

    container6.innerHTML += productHTML;
  });
})();

// start pagination ==============================

function setupPagination(tabElement, itemsPerPage = 4) {
  const productList = tabElement.querySelector(".product-list");
  const products = Array.from(
    productList.querySelectorAll(".col-lg-3")
  ).reverse();
  const pagination = tabElement.querySelector(".pagination-container");
  const totalPages = Math.ceil(products.length / itemsPerPage);
  let currentPage = 1;

  function showPage(page) {
    products.forEach((product, index) => {
      product.style.display =
        index >= (page - 1) * itemsPerPage && index < page * itemsPerPage
          ? "block"
          : "none";
    });
    renderPagination(page);
  }

  function renderPagination(activePage) {
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = "btn btn-outline-dark mx-1";
      if (i === activePage) btn.classList.add("active");
      btn.onclick = () => showPage(i);
      pagination.appendChild(btn);
    }
  }
  showPage(currentPage);
}
document.querySelectorAll(".product-tab").forEach((tab) => {
  setupPagination(tab);
});
// end pagination =================================
// function to render stars====================
function renderStars(rate) {
  let starsHTML = "";
  for (let i = 1; i <= 5; i++) {
    if (rate >= i) {
      starsHTML += `<i class="fa-solid fa-star text-warning"></i>`;
    } else if (rate >= i - 0.5) {
      starsHTML += `<i class="fa-solid fa-star-half-stroke text-warning"></i>`;
    } else {
      starsHTML += `<i class="fa-regular fa-star text-warning"></i>`;
    }
  }
  return `<div >${starsHTML}</div>`;
}
//end function to render stars====================
//start size fuction========================
function renderSizes(sizes) {
  return sizes.map((size) => `<li>${size}</li>`).join("");
}
//end size function========================
//start shopping btn >>>>.................................

$(document).ready(function () {
  let likeCount = 0;
  let likedProducts = new Set();
  const storedProducts = localStorage.getItem("likedProducts");
  if (storedProducts) {
    likedProducts = new Set(JSON.parse(storedProducts));
    likeCount = likedProducts.size;
    $("#shop-count").text(likeCount);
  
    likedProducts.forEach((id) => {
      $(`.shop-btn[data-id='${id}']`).html(
        '<i class=" text-danger fa-solid fa-cart-shopping"></i>'
      );
    });
  }

  $(".shop-btn").click(function () {
    const productId = $(this).data("id");

    if (!likedProducts.has(productId)) {
      likeCount++;
      likedProducts.add(productId);
      $(this).html('<i class=" text-danger fa-solid fa-cart-shopping"></i>');
    } else {
      likeCount--;
      likedProducts.delete(productId);
      $(this).html('<i class="fa-solid fa-cart-shopping"></i>');
    }

    $("#shop-count").text(likeCount);
    localStorage.setItem("likedProducts", JSON.stringify([...likedProducts]));
  });
});

//end like btn >>>>.................................
