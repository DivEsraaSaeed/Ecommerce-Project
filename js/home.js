//search bar
$(document).ready(function () {
  let isOpen = false;
  $("#search-icon").click(function (e) {
    e.stopPropagation();
    if (!isOpen) {
      $("#search-bar").animate({ width: "270px" }, 300).focus();
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

  //start search
});
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

//test===========================================================================================
// fetch('/date-store.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data); 
    // console.log(data.Store.women);
//   })
//   .catch(error => console.error('Error fetching data:', error));


// Fetch data-store.json
fetch('/date-store.json')
.then(response => response.json())
.then(data => {
    const productsContainer = document.getElementById('products-container');
    const categories = data.Store;

    // Loop 3la koloh(men, women, accessories)
    for (const category in categories) {
        const products = categories[category].ProductCategory[category === 'men' ? 'menFashion' : category === 'women' ? 'womenFashion' : 'accessories'].Products;

        // Loop 
        products.forEach(product => {
          
            const sizes = product.ProductSize.includes(',') ? product.ProductSize.split(', ').map(size => `<li>${size}</li>`).join('') : `<li>${product.ProductSize}</li>`;

            
            const rating = product.ProductRate;
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                stars += `<i class="fa-solid text-warning fa-star${i <= Math.floor(rating) ? '' : ' fa-regular fa-star'}"></i>`;
            }

            
            const productHTML = `
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="product-stor-item">
                        <div class="product-img overflow-hidden position-relative">
                            <img src="${product.ProductImage}" class="position-absolute" alt="${product.ProductName}">
                            <ul class="product-size m-0 w-100 align-items-center px-5 justify-content-evenly d-flex list-unstyled position-absolute">
                                ${sizes}
                            </ul>
                            <div class="cart-btn hvr-s Stuart Little (1999) hvr-sweep-to-right position-absolute w-100 align-items-center px-5 justify-content-evenly d-flex">
                                <a class="text-decoration-none text-light" href="#"><i class="fa-solid text-light fa-cart-shopping"></i> Add To Cart</a>
                            </div>
                            <ul class="social-icon list-unstyled position-absolute">
                                <li class="hvr-rectangle-out d-flex"><a href="#"><i class="fa-solid text-dark fa-cart-shopping"></i></a></li>
                                <li class="hvr-rectangle-out d-flex"><a href="#"><i class="fa-solid text-dark fa-eye"></i></a></li>
                                <li class="hvr-rectangle-out d-flex"><a href="#"><i class="fa-regular text-dark fa-heart"></i></a></li>
                            </ul>
                        </div>
                        <div class="product-content pt-3">
                            <div class="content d-flex justify-content-between">
                                <span class="fs-6 fw-light">${product.ProductCategory}</span>
                                <div class="star">
                                    ${stars}
                                </div>
                            </div>
                            <h5 class="pt-3">
                                <a class="fs-6 text-decoration-none text-dark" href="#">${product.ProductName}</a>
                            </h5>
                            <h6 class="fs-5">$${product.ProductPrice}</h6>
                        </div>
                    </div>
                </div>
            `;

           
            productsContainer.innerHTML += productHTML;
        });
    }
})
.catch(error => console.error('Error fetching data:', error));