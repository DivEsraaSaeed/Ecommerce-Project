
$(function () {
 let users= JSON.parse(localStorage.getItem("Login"))
  $(".username").html(users[0].username);
  $(".lable-message").html(users[0].username);
  $(".user-id").html(users[0].email);
  
  // $(".content").load(`/src/Components/Overview/Overview.html`); //for test
  $(".content").load(`/src/Components/products/products.html`); //for test
  // $(".content").load(`/src/Components/addproduct/product.html`); //for test
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


