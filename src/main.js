$(function () {
  $(".content").load(`/src/Components/products/products.html`) //for test
  $(".icon-bar-close, .icon-bar-toggle , .bar ul li").click(function () {
    const widthLeft = $(".bar").outerWidth(true);

    if ($(".bar").hasClass("d-block")) {
      $(".bar").animate({ left: `-${widthLeft}px` }, function () {
        $(".bar").removeClass(" d-block").addClass("d-none");
      });
      // $(".dashboard").removeClass("col-sm-10").addClass("col-sm-12");
    } else {
      $(".bar")
        .removeClass("d-none")
        .addClass("d-block ")
        .css("left", `-${widthLeft}px`);
      $(".bar").animate({ left: "0px" });
      // $(".dashboard").removeClass("col-sm-12").addClass("col-sm-10");
    }
  });

  $(".bar ul li").click(function () {
    let page = $(this).data("page");

    $(".content").fadeOut(200, function () {
      $(this).load(`./Components/${page}`, function () {
        $(this).fadeIn(200);
      });
    });
  }); //end dash
});
