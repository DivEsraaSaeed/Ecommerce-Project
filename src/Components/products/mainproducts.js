$(function () {
  let getProducts = JSON.parse(localStorage.getItem("Products"));
  if (getProducts) {
    for (let el in getProducts.Products) {
      let categoryData = getProducts.Products[el];
      let products = categoryData.products;
      let categoryImg = categoryData.CategoryImg || "default.jpg";

      let Product = products.map((product) => {
        let collapseId = `collapse-${product.productListId}`;
        return `
              <div class="col-sm-3 m-2">
                <div class="card" style="width: 100%;">
                  <div class="card-header" data-bs-toggle="collapse" data-bs-target="#${collapseId}" style="cursor: pointer;">
                    <h5 class="mb-0">${product.ProductName}</h5>
                  </div>      
                  <div id="${collapseId}" class="collapse show">
                    <img src="${product.ProductImg}" class="card-img-top" alt="${product.ProductName}" />
                    <div class="card-body">
                      <p class="card-text">${product.ProductDes}</p>
                    </div>
                  </div>
                </div>
              </div>
            `;
      });

      let modalId = `modal-${el.replace(/\s+/g, "-").toLowerCase()}`;

      let category = `
          <div class="col-sm-2 mt-5 mb-5">
            <div class="d-flex flex-column justify-content-center align-items-center">
              <img class="w-50 mb-2" src="${categoryImg}" alt="">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">
                ${el}
              </button>
            </div>
  
            <!-- Modal -->
            <div class="modal fade vh-100" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
              <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="${modalId}Label">${el}</h1>
                    <button type="button" class="btn-close text-bg-danger " data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="container">
                      <div class="row">
                        ${Product.join('')}
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

      $(".allCategory").append(category);
    }
  }
});
