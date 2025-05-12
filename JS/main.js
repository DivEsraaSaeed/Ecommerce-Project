
$(function () {
 let users= JSON.parse(localStorage.getItem("currentUser"))
  $(".username").html(users.username);
  $(".lable-message").html(users.username);
  $(".user-id").html(users.email);
  
//   $(".content").load(`/Components/ProductList/ProductList.html`); //for test
  // $(".content").load(`/Components/Overview/Overview.html`); //for test
  $(".content").load(`/Components/products/products.html`); //for test
  // $(".content").load(`/Components/addproduct/product.html`); //for test
  $(".icon-bar-close, .icon-bar-toggle , .icon-bar-toggle-lg , .bar ul li").click(function () {
    const widthLeft = $(".bar").outerWidth(true);
    if ($(".bar").hasClass("d-block")) {
      $(".bar").animate({ left: `-${widthLeft}px` }, function () {
        $(".bar").removeClass(" d-block").addClass("d-none");
        $(".dashboard").removeClass("col-sm-10").addClass("col-sm-12");
        $(".forSmallContent").removeClass("justify-content-end ");
      });
    } else {
      $(".bar")
        .removeClass("d-none")
        .addClass("d-block ")
        .css("left", `-${widthLeft}px`);
      $(".bar").animate({ left: "0px" });
      $(".dashboard").removeClass("col-sm-12 ").addClass("col-sm-10 ");
      $(".forSmallContent").addClass("justify-content-end ");
    }
  });

  $(" ul li").click(function () {
    let page = $(this).data("page");

    $(".content").fadeOut(200, function () {
      $(this).load(`./Components/${page}`, function () {
        $(this).fadeIn(200);
      });
    });
  }); //end dash
});


