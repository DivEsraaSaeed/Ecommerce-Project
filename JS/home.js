//search bar===========================================================
$(document).ready(function () {
  let isOpen = false;
  $("#search-icon").click(function (e) {
    e.stopPropagation();
    if (!isOpen) {
      $("#search-bar").animate({ width: "300px" }, 300).focus();
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
//end search bar=======================================================================

// //start search results===================================================================

$(document).ready(function () {
  let matchedProducts = [];
  let visibleCount = 0;
  const batchSize = 10;
  const searchResultsContainer = $("#search-results");

  // Function to render a batch of search results
  function renderBatch() {
    const nextBatch = matchedProducts.slice(
      visibleCount,
      visibleCount + batchSize
    );

    nextBatch.forEach((product) => {
      const resultItem = `
        <div id="searchResult" class="d-flex align-items-center gap-3 border-bottom py-2">
          <img src="${product.img}" alt="Product Image" style="width: 60px; height: 60px; object-fit: cover;">
          <a href="${product.link}" class="text-white text-decoration-none fw-bold">${product.name}</a>
        </div>
      `;
      searchResultsContainer.append(resultItem);
    });

    visibleCount += batchSize;
  }

  // search bar input event
  $("#search-bar").on("input", function () {
    const keyword = $(this).val().toLowerCase();
    searchResultsContainer.empty().show();
    matchedProducts = [];
    visibleCount = 0;

    // Hide results if the input is empty
    if (keyword.trim() === "") {
      searchResultsContainer.hide();
      return;
    }

    // Get all products from the DOM
    const allProducts = $(".product-stor-item, .product-card");
    allProducts.each(function () {
      const productName = $(this).find("h5 a").text().toLowerCase();
      const productImg = $(this).find("img").attr("src") || "default.jpg";
      const productLink = $(this).find("h5 a").attr("href") || "#";

      if (productName.includes(keyword)) {
        // Check if this product already exists in the array
        const isDuplicate = matchedProducts.some(
          (p) => p.name === productName && p.link === productLink
        );

        if (!isDuplicate) {
          matchedProducts.push({
            name: productName,
            img: productImg,
            link: productLink,
          });
        }
      }
    });

    // Show results or "no results" message
    if (matchedProducts.length === 0) {
      searchResultsContainer.html(
        "<p class='text-white text-center'>No products found</p>"
      );
    } else {
      renderBatch();
    }
  });

  // scroll event to load more results
  searchResultsContainer.on("scroll", function () {
    const container = $(this);
    if (
      container.scrollTop() + container.innerHeight() >=
      container[0].scrollHeight - 50
    ) {
      renderBatch();
    }
  });

  // Escape key to close results
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $("#search-bar").val("");
      searchResultsContainer.empty().hide();
    }
  });

  // Click outside to hide results
  $(document).on("click", function (e) {
    if (
      !$(e.target).closest("#search-bar").length &&
      !$(e.target).closest("#search-results").length
    ) {
      searchResultsContainer.empty().hide();
    }
  });
});
//end search results============================================================



// //start nav bar=====================================================================

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
//end nav bar=======================================================================================


// Carousel 1===========================================================================================
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
//end Carousel 1=======================================================================================================

//start carousel2=========================================================================================================

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
//end carousel2=======================================================================================================================

//start carousel3==========================================================================================================================
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
// //end carousel3==============================================================================================================================

// //start carousel4 ==========================================================================================================================
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
//end carousel4==============================================================================================================================

// start carousel5==========================================================================================================================================
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

// //end carousel5===========================================================================================================================================


// //important data from json file to local storage=======================================================================================

// (async function SaveHomeDataToLocalStorage() {
//   try {
//     const response = await fetch("../home-store.json");
//     const data = await response.json();
//     localStorage.setItem("home-store", JSON.stringify(data));

//     console.log("Data saved to local storage:", data);
//   } catch (error) {
//     console.error("Error in fetching data from json file:", error);
//   }
// })();

// //end important data from json file to local storage==========================================================================================

// // start load data from local storage===========================================================================================

(function loadHomeData() {
  const data = JSON.parse(localStorage.getItem("Store"));
  const men = data.Store.men.ProductCategory.Products;
  const women = data.Store.women.ProductCategory.Products;
  const accessories = data.Store.accessories.ProductCategory.Products;


  const newArrival = [];
  const Trending = [];
  const inStore = [];
  const bestSeller = [];

  //   //start filter data===========================================================================================

  men.forEach((product) => {
    if (product.ProductStatus == "Trending") {
      Trending.push(product);

    } else if (product.ProductStatus == "New Arrival") {
      newArrival.push(product);
    } else if (product.ProductStatus == "InStore") {
      inStore.push(product);
    } else if (product.ProductStatus == "Best Seller") {
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

  const container = document.getElementById("all-new-products");
  const container2 = document.getElementById("trending-products");
  const container3 = document.getElementById("instore-products");
  const container4 = document.getElementById("best-seller-products");
  // new arrival products============================================================================================




//   newArrival.forEach((product) => {
//     const productHTML = `
//       <div class="col-lg-3 col-md-6 new">
//         <div class="product-stor-item shadow-sm">
//           <div class="product-img overflow-hidden position-relative">
//             <img src="${product.ProductImage
//       }" class="position-absolute img-fluid" alt="${product.ProductName}">
//             <ul class="product-size m-0 w-100 align-items-center px-5 justify-content-evenly d-flex list-unstyled position-absolute">
//                ${renderSizes(product.ProductSize)}
//             </ul>
//             <div class="cart-btn hvr-sweep-to-right position-absolute w-100 align-items-center px-4 justify-content-evenly d-flex">
//               <a class="text-decoration-none text-light" href="#">
//                 <i class="fa-solid text-light fa-cart-shopping"></i> Add To Cart
//               </a>
//             </div>
//             <ul class="social-icon list-unstyled position-absolute">

//               <li class="x hvr-rectangle-out d-flex" ><a href="#"><i class="fa-solid text-dark fa-eye"></i></a></li>
//               <li data-id="${product.ProductCode
//       }" class="hvr-rectangle-out shop-btn d-flex"><i class="fa-regular text-dark fa-heart"></i></li>
//             </ul>
//           </div>
//           <div class="product-content pt-3">
//             <div class="content d-flex justify-content-between">
//               <span class="fs-6 fw-light">${product.SubCategory}</span>

//               <div class="star">
//                  ${renderStars(product.ProductRate)}
//               </div>
//             </div>
//             <h5 class="pt-3">
//               <a class="fs-6 text-decoration-none text-dark" href="">${product.ProductName
//       }</a>
//             </h5>
//             <h6 class="fs-5">${product.priceAfterDiscount
//       } <del class="fw-light fs-6">${product.ProductPrice}</del></h6>
//           </div>
//         </div>
//       </div>
//     `;
//     container.innerHTML += productHTML;
    
// //   
//   });
newArrival.forEach((product) => {
  const productCard = document.createElement('div');
  productCard.className = 'col-lg-3 col-md-6 new';

  productCard.innerHTML = `
    <div class="product-stor-item shadow-sm">
      <div class="product-img overflow-hidden position-relative">
        <img src="${product.ProductImage}" class="position-absolute img-fluid" alt="${product.ProductName}">
        <ul class="product-size m-0 w-100 align-items-center px-5 justify-content-evenly d-flex list-unstyled position-absolute">
          ${renderSizes(product.ProductSize)}
        </ul>
        <div class="cart-btn hvr-sweep-to-right position-absolute w-100 align-items-center px-4 justify-content-evenly d-flex">
          <button class="text-decoration-none text-light add-to-cart">
            <i class="fa-solid text-light fa-cart-shopping"></i> Add To Cart
          </button>
        </div>
        <ul class="social-icon list-unstyled position-absolute">
          <li class="hvr-rectangle-out d-flex">
            <button class="quick-view"><i class="fa-solid text-dark fa-eye"></i></button>
          </li>
          <li data-id="${product.ProductCode}" class="hvr-rectangle-out shop-btn d-flex">
            <i class="fa-regular text-dark fa-heart"></i>
          </li>
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
          <a class="fs-6 text-decoration-none text-dark" href="#">${product.ProductName}</a>
        </h5>
        <h6 class="fs-5">${product.priceAfterDiscount} <del class="fw-light fs-6">${product.ProductPrice}</del></h6>
      </div>
    </div>
  `;

  // Attach Quick View Event
  const quickViewBtn = productCard.querySelector('.quick-view');
  quickViewBtn.addEventListener('click', () => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = '/product.html'; // or './product.html' if relative
  });

  // Attach Add To Cart Event
  const addToCartBtn = productCard.querySelector('.add-to-cart');
  addToCartBtn.addEventListener('click', () => {
    console.log("🚀 addToCart called with:", product);
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProductIndex = cart.findIndex(p => p.ProductCode === product.ProductCode);
    
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Also update currentUser's cart
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      currentUser.items = cart.reduce((sum, p) => sum + p.quantity, 0);
      currentUser.cart = cart;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      // Update user list
      let users = JSON.parse(localStorage.getItem('users')) || [];
      let updatedUsers = users.map(u => u.email === currentUser.email ? currentUser : u);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }

    displayCart();
    updateTotalPrice();
  });

  // Finally append to the container
  container.appendChild(productCard);
});

  // trending products=========================================================================================================
  Trending.forEach((product) => {
    const productHTML = `
      <div class="col-lg-3 col-md-6">
        <div class="product-stor-item shadow-sm">
          <div class="product-img overflow-hidden position-relative">
            <img src="${product.ProductImage
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
              <li data-id="${product.ProductCode
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
              <a class="fs-6 text-decoration-none text-dark" href="#">${product.ProductName
      }</a>
            </h5>
           <h6 class="fs-5">${product.priceAfterDiscount
      } <del class="fw-light fs-6">${product.ProductPrice}</del></h6>
          </div>
        </div>
      </div>
    `;
    container2.innerHTML += productHTML;
  //    document.querySelectorAll("#x").forEach((btn)=>{
  //   btn.addEventListener('click',()=>{
  //     // console.log("3aaaaaaaaaaaaaaaaaaa")
  //     console.log(product)
  //   })
  // })
  });
  // in store products=================================================================================================================================
  inStore.forEach((product) => {
    const productHTML = `
      <div class="col-lg-3 col-md-6">
        <div class="product-stor-item shadow-sm">
          <div class="product-img overflow-hidden position-relative">
            <img src="${product.ProductImage
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
              <li data-id="${product.ProductCode
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
              <a class="fs-6 text-decoration-none text-dark" href="#">${product.ProductName
      }</a>
            </h5>
            <h6 class="fs-5">${product.priceAfterDiscount
      } <del class="fw-light fs-6">${product.ProductPrice}</del></h6>
          </div>
        </div>
      </div>
    `;
    container3.innerHTML += productHTML;
  //   document.querySelectorAll("#x").forEach((btn)=>{
  //   btn.addEventListener('click',()=>{
  //     // console.log("3aaaaaaaaaaaaaaaaaaa")
  //     console.log(product)
  //   })
  // })
  });

  // best seller products=================================================================================================================================

  fourBestSeller.forEach((product) => {
    const productHTML = `
      <div class="col-lg-3 mb-2 col-md-6">
        <div class="product-stor-item shadow-sm">
          <div class="product-img overflow-hidden position-relative">
            <img src="${product.ProductImage
      }" class="position-absolute img-fluid" alt="${product.ProductName}">

            <div class="cart-btn hvr-sweep-to-right position-absolute w-100 align-items-center px-4 justify-content-evenly d-flex">
              <a class="text-decoration-none text-light" href="#">
                <i class="fa-solid text-light fa-cart-shopping"></i> Add To Cart
              </a>
            </div>
             <ul class="social-icon list-unstyled position-absolute">

              <li class="hvr-rectangle-out d-flex" id="quick-view"><a href="/product.html"><i class=" fa-solid text-dark fa-eye"></i></a></li>
              <li data-id="${product.ProductCode
      }" class="hvr-rectangle-out shop-btn d-flex"><i class="fa-regular text-dark fa-heart"></i></li>
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
              <a class="fs-6 text-decoration-none text-dark" href="#">${product.ProductName
      }</a>
            </h5>
            <h6 class="fs-5">${product.priceAfterDiscount
      } <del class="fw-light fs-6">${product.ProductPrice}</del></h6>
          </div>
        </div>
      </div>
    `;
    container4.innerHTML += productHTML;
  });
  // accessories products=================================================================================================================================
  const container5 = document.getElementById("discover-Accessories");

  accessories.forEach((product) => {
    const productHTML = `<div class="item  col-12 col-md-12">
      <div
                          class="d-flex flex-column flex-lg-row text-start p-4 justify-content-between product-card w-100">
                          <div class="img-prod w-100 mb-3 mb-lg-0">
                              <img class="w-100 h-100" src="${product.ProductImage
      }" alt="${product.ProductName}" />
                          </div>
                          <div class="content-prod w-100 ps-lg-4">
                              <div class="star mb-2">
                                   ${renderStars(product.ProductRate)}
                              </div>
                              <h5 class="pt-3">
                                  <a class="fs-5 text-decoration-none text-dark" href="#">${product.ProductName
      }</a>
                              </h5>
                              <h6 class="fs-5">${product.priceAfterDiscount
      } <del class="fw-light fs-6">${product.ProductPrice
      }</del></h6>
                              <a href="#" class="hvr-sweep-to-right text-decoration-none px-4 py-2 swep-a">
                                  Shop Now <i class="fa-solid fa-arrow-right"></i>
                              </a>
                          </div>
                      </div>
                  </div>`;
    container5.innerHTML += productHTML;
  });
  //end accessories products=================================================================================================================================

  //start trending women products=================================================================================================================================
  const container6 = document.getElementById("trending-women");
  women.forEach((product) => {
    const productHTML = ` <div class="   col-md-12">
                                <div class="product-stor-item p-0 border-0">
                                    <div class="product-img overflow-hidden position-relative">
                                        <img src="${product.ProductImage
      }" class="position-absolute" alt="${product.ProductName
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
                                            <a class="fs-6 text-decoration-none text-dark" href="#">${product.ProductName
      }</a>
                                        </h5>
                                        <h6 class="fs-5">${product.priceAfterDiscount
      } <del class="fw-light fs-6">${product.ProductPrice
      }</del></h6>
    <a href="#" class="hvr-sweep-to-right text-decoration-none px-4 py-2 swep-a">
                                  Shop Now <i class="fa-solid fa-arrow-right"></i>
                              </a>
                                    </div>
                                </div>
                            </div>`;

    container6.innerHTML += productHTML;

  });
})();

// // start pagination ==============================================================================================================================================================================

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
// // end pagination =================================================================================================================================================================================

// // start function to render stars============================================================================================
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
// //end function to render stars============================================================================================

// //start size function====================================================================================================================================
function renderSizes(sizes) {
  return sizes.map((size) => `<li>${size}</li>`).join("");
}
// //end size function====================================================================================================================================

// //start shopping btn >>>>.................................

$(document).ready(function () {
  let likeCount = 0;
  let likedProducts = new Set();
  const storedProducts = localStorage.getItem("likedProducts");
  if (storedProducts) {
    likedProducts = new Set(JSON.parse(storedProducts));
    likeCount = likedProducts.size;
    $("#like-count").text(likeCount);
    // Update the button icons for liked products
    likedProducts.forEach((id) => {
      $(`.shop-btn[data-id='${id}']`).html(
        '<i class=" text-danger fa-solid fa-heart"></i>'
      );
    });
  }
  // Initialize the like count display
  $(".shop-btn").click(function () {
    const productId = $(this).data("id");

    if (!likedProducts.has(productId)) {
      likeCount++;
      likedProducts.add(productId);
      $(this).html('<i class=" text-danger fa-solid fa-heart"></i>');
    } else {
      likeCount--;
      likedProducts.delete(productId);
      $(this).html('<i class="fa-regular text-dark fa-heart"></i>');
    }
    // Update the like count display
    $("#like-count").text(likeCount);
    localStorage.setItem("likedProducts", JSON.stringify([...likedProducts]));
  });



});

// //end shopping btn >>>>.................................


// $(document).ready(function () {

// })
  document.querySelectorAll(".Ecategory").forEach((category) => {
    category.addEventListener("click", () => {
      const selectedCategory = category.getAttribute("data-category");
      console.log(selectedCategory)
      console.log("qwertyuiop;lkjhbgvfcdxcfvgbhnjkl;lkjnhbgvcxscvbn")

      localStorage.setItem('selectedCategory', selectedCategory);
      window.location.href = '/category copy.html';
    });
  });


// تأثير الإضافة
// const cartIcon = document.querySelector('#');
// cartIcon.classList.add('added-to-cart');
// setTimeout(() => {
//   cartIcon.classList.remove('added-to-cart');
// }, 500);

$(document).ready(function (){
  const quickViewBtn = document.querySelectorAll('#quick-view');
  
  quickViewBtn.addEventListener('click', () => {
    // احفظ المنتج في localStorage
    console.log("selected")
    localStorage.setItem('selectedProduct2', JSON.stringify("product"));
  
    // روح لصفحة التفاصيل
    // window.location.href = '/product.html';
  });


})

$(document).ready(()=>{
 document.querySelector("#login-user-lg").addEventListener("click",()=>{

  if(localStorage.getItem("currentUser")){
    if(JSON.parse(localStorage.getItem("currentUser")).isSeller){
      window.location.href="/index .html"
    }else if (JSON.parse(localStorage.getItem("currentUser")).isAdmin){
      window.location.href="/dashboard-admin.html"
    }else {
    window.location.href="/account.html"
    }

  }else{
    window.location.href='/login.html'
  }
 })
})

$(document).ready(()=>{
  document.querySelector("#login-user-lg").addEventListener("click",()=>{
  
   if(localStorage.getItem("currentUser")){
     if(JSON.parse(localStorage.getItem("currentUser").isSeller)){
       window.location.href="/index .html"
     }else if (JSON.parse(localStorage.getItem("currentUser").isAdmin)){
       window.location.href="/dashboard-admin.html"
     }else {
    //  window.location.href="/account.html"
    alert("3aaaaaaaaaaaaaaaaaaaaa")
     }
     // document.querySelector("#login-user-lg").innerText=" "
   }else{
     window.location.href='/login.html'
   }
  })

})