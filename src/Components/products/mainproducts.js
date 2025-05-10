$(function () {
  let user = JSON.parse(localStorage.getItem("Login"));
  let userEmail = user ? user[0].email : "";

  let { Store } = JSON.parse(localStorage.getItem("Store"));

  if (Store) {
    for (const key in Store) {
      let categoryImg = Store[key]?.CategoryImage || "default.jpg";
      let categoryHTML = `
      
      <div class="col-sm-3">
      
  <div class="container">
    <div class="row justify-content-center">
      <img style="width: 100%; height: 200px; object-fit: cover;"
        class="w-50 h-20 mb-2 mt-4 "
        src="${categoryImg}"
        alt="${key}"
      />
      <button
        type="button"
        class="btn btn-outline-primary openCategory mb-4"
        data-category="${key}"
      >
         ${key.toUpperCase()}
      </button>
    </div>
  </div>
</div>

`;
      $(".allCategory").append(categoryHTML);
    } // End Of Catehory

    $(".openCategory").on("click", function () {
      let categoryWannaShow = $(this).attr("data-category");

      showCategoryProducts(categoryWannaShow);

      function showCategoryProducts(categoryName) {
        $(".Products").empty();

        let Products = Store[categoryName]?.ProductCategory?.Products || [];

        let SellerProducts = Products.filter(
          (product) => product.SellerEmail === userEmail
        );

    let ProductHTML = SellerProducts.map((product) => {
  let collapseId = `collapse-${product.ProductId}`;
  let carouselId = `productImagesCarousel-${product.ProductId}`;

  let images = product.ProductImage || [];

  let carouselItems = images.map((img, index) => `
    <div class="carousel-item ${index === 0 ? "active" : ""}">
      <img src="${img}" class="d-block w-100 rounded" alt="Product Image ${index + 1}">
    </div>
  `).join("");

  let indicators = images.map((_, index) => `
    <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${index}" ${index === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${index + 1}"></button>
  `).join("");

  return `
    <div class="col-sm-12 d-flex p mb-3">
      <div class="card" productID="${product.ProductId}" style="width: 100%;">
        <div class="card-header" data-bs-toggle="collapse" data-bs-target="#${collapseId}" style="cursor: pointer;">
          <div class="d-flex justify-content-between">
            <h5 class="mb-0 pt-1">Product Code : ${product.ProductCode}</h5>
          </div>
        </div>

        <div id="${collapseId}" productCode="${product.ProductCode}" class="collapse show">
          <div class="d-flex flex-column flex-md-row">
            <div class="me-3" style="flex: 0 0 30%;">
              <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  ${carouselItems}
                </div>
                ${images.length > 1 ? `
                  <button class="carousel-control-prev bg-gray" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                  <div class="carousel-indicators">
                    ${indicators}
                  </div>` : ''}
              </div>
            </div>

            <div class="card-body" style="flex: 1;">
              <div class="d-flex flex-column w-100 border p-3">
                <span><strong>Product Name:</strong> ${product.ProductName}</span>
                <span><strong>Price:</strong> ${product.ProductPrice} EGP</span>
                <span><strong>Discount:</strong> ${product.priceAfterDiscount} EGP </span>
                <span><strong>Value Discount:</strong> ${product.ValueDiscount} %</span>
                <span><strong>Available:</strong> ${product.ProductCount} pieces</span>
                <span><strong>Status:</strong> ${product.ProductStatus}</span>
                <span><strong>Colors:</strong> ${product.ProductColors}</span>
                <span><strong>Size:</strong> ${product.ProductSize}</span>
                <span><strong>Description:</strong></span>
                <p class="text-muted">${product.ProductDescription}</p>
                <hr>

                <div class="d-flex flex-row-reverse mt-3 p-3">
                  <button class="btn CloseBtn ms-3 deleteProduct"
                    data-productid="${product.ProductId}"
                    data-productcategory="${product.ProductCategory}"
                    data-bs-toggle="modal"
                    data-bs-target="#DeleteBtn">
                    <i class="fa-solid fa-trash"></i> Delete
                  </button>
                  <button class="btn btn-outline-primary updateProduct"
                    data-page="addproduct/product.html"
                    data-productid="${product.ProductId}"
                    data-productcategory="${product.ProductCategory}"
                    data-bs-toggle="modal"
                    data-bs-target="#UpdateBtn">
                    <i class="fas fa-edit me-2"></i> Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}).join("");


        $(".Products").append(ProductHTML);
      }
      if ($(".Products .card").length === 0) {
        $(".Products").html(
          `<div class="alert alert-warning">No products ${categoryWannaShow} to display.</div>`
        );
      }


$("#searchByCodeForm").on("keyup", function (e) {
  e.preventDefault();
  const searchCode = $("#searchByCodeInput").val().trim().toLowerCase();

  if (!searchCode) {
    $(".Products .card").show(); 
    return;
  }

  $(".Products .card").each(function () {
    const productCode = $(this)
      .find(".card-header h5")
      .text()
      .replace("#", "")
      .trim()
      .toLowerCase();

    if (productCode.includes(searchCode)) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
});




      
    }); // End Of Show Category and product

    $(document).on("click", ".updateProduct", function () {
      let page = $(this).data("page");
      let productIdUpdate = $(this).data("productid");
      let productCategoryUpdate = $(this).data("productcategory");

      let productNeedUpdate = Store[
        productCategoryUpdate
      ].ProductCategory.Products.filter(
        (el) => el.ProductId === productIdUpdate
      );

      if ($("#UpdateBtn").length === 0) {
        let ModalUpdate = `
          <div class="modal fade modal-fullscreen" id="UpdateBtn" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updateProductLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
              <div class="modal-content col-sm-12">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="updateProductLabel">Update Product</h1>
                  <button type="button" class="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                  <button type="button" class="btn CloseBtn p-3 CloseUpdate" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-outline-primary SaveUpdate p-3" >Save</button>
                </div>
              </div>
            </div>
          </div>
        `;
        $("body").append(ModalUpdate);
      }

      $(".modal-body").load(`/src/Components/${page}`, function () {
        $("#UpdateBtn").modal("show");
        $(".titleHeaderProduct").html(
          `<h1> <i class="fa-solid fa-wrench"></i> Update Product </h1>`
        );
        $("#add").addClass("d-none");
        // $("#PriceDiscount").addClass("d-none");
        $(".PriceDiscount").addClass("d-none");

        // let productNameInput = document.getElementById('ProductName');
        // if (productNameInput) {
        //   productNameInput.value = 'ssss';
        // }

        $("#UpdateBtn").on("shown.bs.modal", function () {
     console.log(productNeedUpdate[0].priceAfterDiscount);

  // Existing fields
  $("#ProductCode").val(productNeedUpdate[0].ProductCode);
  $("#ProductName").val(productNeedUpdate[0].ProductName);
  $("#ProductColors").val(productNeedUpdate[0].ProductColors) || "Colors";
  $("#ProductPrice").val(productNeedUpdate[0].ProductPrice);
  $("#ProductCount").val(productNeedUpdate[0].ProductCount);
  $("input[name='ProductStatus']:checked").val(
    productNeedUpdate[0].ProductStatus
  );
  
  // Sizes
  let currentSizes = productNeedUpdate[0].ProductSize || [];
  $(`input[name="productSize"]`).prop('checked', false); 
  currentSizes.forEach(size => {
    $(`input[name="productSize"][value="${size}"]`).prop('checked', true);
  });
  
  // Discount fields
  $("#DiscountPrice").val(productNeedUpdate[0].priceAfterDiscount)
  $("#ValueDiscount").val(productNeedUpdate[0].ValueDiscount) || " No Discount";
  
  // Description and categories
  $("#ProductDescription").val(productNeedUpdate[0].ProductDescription);
  $("#ProductCategory").val(productNeedUpdate[0].ProductCategory);
  $("#SubCategory").val(productNeedUpdate[0].SubCategory);
  
  // Image handling - this is the key part
  let images = productNeedUpdate[0].ProductImage || [];
  $("#image-input").val(images.join(", "));
  updatePreview(); // Call this to show the preview
        });





        $(".SaveUpdate")
          .off("click")
          .on("click", function () {
            
  productNeedUpdate[0].ProductName = $("#ProductName").val();
  productNeedUpdate[0].ProductColors = $("#ProductColors").val() || "Colors";
  productNeedUpdate[0].ProductPrice = $("#ProductPrice").val();
  productNeedUpdate[0].ProductSize = $(`input[name="productSize"]:checked`)
    .map(function() { return $(this).val(); })
    .get();
  productNeedUpdate[0].ProductStatus = $("input[name='ProductStatus']:checked").val();
  productNeedUpdate[0].ProductCount = $("#ProductCount").val();
  productNeedUpdate[0].ValueDiscount = $("#ValueDiscount").val() || " No Discount";
  productNeedUpdate[0].ProductDescription = $("#ProductDescription").val();
  productNeedUpdate[0].priceAfterDiscount = $("#DiscountPrice").val();
  
  productNeedUpdate[0].ProductImage = $("#image-input").val()
    .split(",")
    .map(img => img.trim())
    .filter(img => img !== "");
            let allData = JSON.parse(localStorage.getItem("Store"));
            allData.Store = Store;
            localStorage.setItem("Store", JSON.stringify(allData));

            $("#UpdateBtn").modal("hide");
            updateProductInHTML(productNeedUpdate[0]);

            function updateProductInHTML(updatedProduct) {
              let collapseId = `collapse-${updatedProduct.ProductId}`;
              let updatedProductHTML = `
   <div class="col-sm-12 d-flex p  mb-3">
        <div class="card" productID="${updatedProduct.ProductId}" style="width: 100%;">
          <div class="card-header" data-bs-toggle="collapse" data-bs-target="#${collapseId}" style="cursor: pointer;">
            <div class="d-flex justify-content-between">
              <h5 class="mb-0 pt-1">#${updatedProduct.ProductCode}</h5>
           
            </div>
          </div>
          
          <div id="${collapseId}" productCode="${updatedProduct.ProductCode}" class="collapse show">
            
                      <div class="d-flex flex-column  flex-md-row"> 
              <div class="me-3" style="flex: 0 0 30%;"> 
                <img src="${updatedProduct.ProductImage}" class="img-fluid rounded-start w-50 "  alt="${updatedProduct.ProductName}">
              </div>
              
              <div class="card-body" style="flex: 1;"> 
                <div class="d-flex flex-column w-100">
                  <span><strong>Product Name:</strong> ${updatedProduct.ProductName}</span>
                  <span><strong>Price:</strong> ${updatedProduct.ProductPrice} EGP</span>
                  <span><strong>Value Discount:</strong> ${updatedProduct.ValueDiscount} EGP</span>
                  <span><strong> Discount:</strong> ${updatedProduct.priceAfterDiscount} EGP</span>
                  <span><strong>Available:</strong> ${updatedProduct.ProductCount} pieces</span>
                  <span><strong>Colors:</strong> ${updatedProduct.ProductColor}</span>
                  <span><strong>Status:</strong> ${updatedProduct.ProductStatus}</span>
                  <span><strong>Size:</strong> ${updatedProduct.ProductSize}</span>
                  <span><strong>Description:</strong></span>
                  <p class="text-muted">${updatedProduct.ProductDescription}</p>
                  <hr>
                   <span><strong>Review:</strong></span>
                  <p class="text-muted">${updatedProduct.ProductDescription}</p>
                  <div class="d-flex flex-row-reverse mt-3">
                 
                    <button class="btn btn-outline-danger  ms-3 deleteProduct" 
                 data-productid="${updatedProduct.ProductId}" 
                 data-productcategory="${updatedProduct.ProductCategory}" 
                 data-bs-toggle="modal" 
                 data-bs-target="#DeleteBtn">
                 <i class="fa-solid fa-trash"></i>                      
                      Delete
                    </button>
   <button class="btn btn-outline-primary updateProduct" 
                            data-page="addproduct/product.html" 
                            data-productid="${updatedProduct.ProductId}" 
                            data-productcategory="${updatedProduct.ProductCategory}"
                            data-bs-toggle="modal" 
                            data-bs-target="#UpdateBtn">
                      <i class="fas fa-edit me-2"></i>Update
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            `;

              $(`div[productID="${updatedProduct.ProductId}"]`).replaceWith(
                updatedProductHTML
              );
            } //End Of Function updateProductInHTML
            setTimeout(function() {
              location.reload();
          }, 100);
  
          }); //End of save
      }); //End Of Modal Update
    }); //Enf Of Update Product

$(document).on("click", ".CloseUpdate", function(){
    setTimeout(function() {
        location.reload();
    }, 100);
});
    $(document).on("click", ".deleteProduct", function () {
      let ProductDeleteId = $(this).data("productid");
      let ProductDeleteCategory = $(this).data("productcategory");

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        background: "#fff",
        backdrop: "rgba(128, 9, 9, 0.4)",
        didOpen: () => {
          $(".swal2-icon-content").addClass("text-danger");
          $(".swal2-icon").addClass("border border-danger");
        },
      }).then((result) => {
        if (result.isConfirmed) {
          let updatedProducts = (Store[
            ProductDeleteCategory
          ].ProductCategory.Products = Store[
            ProductDeleteCategory
          ].ProductCategory.Products.filter(
            (prodate) => prodate.ProductId !== ProductDeleteId
          ));
          let allDate = JSON.parse(localStorage.getItem("Store"));
          allDate.Store[ProductDeleteCategory].ProductCategory.Products =
            updatedProducts;
          localStorage.setItem("Store", JSON.stringify(allDate));
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          $(`div[productID="${ProductDeleteId}"]`).remove();
          if ($(".Products .card").length === 0) {
            $(".Products").html(
              `<div class="alert alert-warning">No products ${ProductDeleteCategory} to display.</div>`
            );
          }
        }
      });











      
      //       if ($("#DeleteBtn").length === 0) {
      //         let ModalDelete = `
      //  <div class="modal fade" id="DeleteBtn" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="DeleteBtnLabel" aria-hidden="true">
      //       <div class="modal-dialog modal-dialog-centered">
      //         <div class="modal-content">
      //           <div class="modal-header">
      //             <h1 class="modal-title fs-5" id="DeleteBtnLabel">Delete Product</h1>
      //             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      //           </div>
      //           <div class="modal-body">
      //               Are you sure you want to delete this product?
      //           </div>
      //           <div class="modal-footer">
      //             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      //             <button type="button" class="btn btn-primary confirmDelete">Delete</button>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      // `;

      //         $("body").append(ModalDelete);
      //       }
      //       $("#DeleteBtn").modal("show");
    }); // End of Delete
  } //End Cured Store
});



 