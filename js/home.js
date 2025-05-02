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
  const owl4 = $(".carousel5").owlCarousel({
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
document.getElementById("toggle-dark").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});
