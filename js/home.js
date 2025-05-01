// Carousel
$(document).ready(function () {
  const owl = $(".carousel1").owlCarousel({
    loop: true,
    // nav: true,
    smartSpeed:1000,
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
  const owl = $(".carousel2").owlCarousel({
    loop: true,
    margin: 30,
    // nav: true,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed:2000,
    items:3,
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
//carousel3
$(document).ready(function () {
  const owl = $(".carousel3").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed:2000,
    navText: [
      '<i class="fa-solid fa-arrow-left "></i>',
      '<i class="fa-solid fa-arrow-right "></i>'
    ],
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