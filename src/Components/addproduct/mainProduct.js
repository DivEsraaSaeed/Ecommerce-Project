$(function () {
  let ProductName = "";
  let ProductPrice = "";
  let ProductCategory = "";
  let CategoryImg = "";
  let ProductDes = "";
  let fileName = "";
  $("#ProductName , #ProductPrice , #ProductCategory ,#ProductDes").on(
    "keyup",
    function () {
      ProductName = $("#ProductName").val();
      ProductPrice = $("#ProductPrice").val();
      ProductCategory = $("#ProductCategory").val();
      CategoryImg = $("#CategoryImg").val();
      ProductDes = $("#ProductDes").val();
    }
  );

  $("#ProductImage").change(function () {
    fileName = $(this).val().split("\\").pop();
    $("#fakeInput").val(fileName);
    console.log(fileName);
  }); //end
  // $("#CategoryImg").change(function () {
  //   fileName = $(this).val().split("\\").pop();
  //   $("#fakeInput").val(fileName);
  //   console.log(fileName);
  // }); //end

  $("#add").on("click", function () {
    let ProductsList = JSON.parse(localStorage.getItem("Products")) || {
      Products: {},
    };

    if (!ProductsList.Products[ProductCategory]) {
      ProductsList.Products[ProductCategory] = {
        CategoryImg: "/src/Components/img/Category.webp", 
        products: [],
      };
    }
    

    let lastCategoryList = ProductsList.Products[ProductCategory].products;

    let id =
      lastCategoryList.length > 0
        ? lastCategoryList[lastCategoryList.length - 1].productListId + 1
        : 1;

    let Product = {
      productListId: id,
      ProductName: ProductName,
      ProductPrice: ProductPrice,
      ProductCategory: ProductCategory,
      ProductImg: fileName,
      ProductDes: ProductDes,
    };

    ProductsList.Products[ProductCategory].products.push(Product);


    localStorage.setItem("Products", JSON.stringify(ProductsList));
  }); // End Of Add
});
