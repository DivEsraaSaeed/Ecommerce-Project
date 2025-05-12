// window.onload = document.addEventListener("DOMContentLoaded", function () {
//     console.log("Dd");
    

// });

// $(function(){
//   try {
//     let { Store } = JSON.parse(localStorage.getItem("Store"));
    
// $("#iconUP").removeClass("d-none").addClass("d-block")


//     console.log("🚀 ~ ProductList.js:6 ~ Store:", Store);

//     let user = JSON.parse(localStorage.getItem("currentUser"));
//     let userEmail = user ? user.email : "";
//     for (const key in Store) {
//       let Products = Store[key].ProductCategory.Products;

//       let SellerProducts = Products.filter(
//         (product) => product.SellerEmail === userEmail
//       );



//       SellerProducts.map((el) => {
//         const tableBody = document.querySelector("tbody");

//         let row = `
//            <td>${el.ProductCode}</td>
//             <td>${el.ProductName}</td>
//             <td>${el.ProductCategory}</td>
//        `;
//         tableBody.innerHTML += row;
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }

// })


$(function () {
  try {
    let { Store } = JSON.parse(localStorage.getItem("Store"));
    let user = JSON.parse(localStorage.getItem("currentUser"));
    let userEmail = user ? user.email : "";

    let allProducts = [];

    for (const key in Store) {
      let Products = Store[key].ProductCategory.Products;
      let SellerProducts = Products.filter(
        (product) => product.SellerEmail === userEmail
      );
      allProducts.push(...SellerProducts);
    }

    allProducts.sort((a, b) =>
      a.ProductCategory.localeCompare(b.ProductCategory)
    );

    renderTable(allProducts);

    function renderTable(products) {
      const tableBody = $("tbody");
      tableBody.empty();

      if (products.length === 0) {
        tableBody.append(`
          <tr><td colspan="3" class="text-danger">No Products Found</td></tr>
        `);
        return;
      }

      products.forEach((el) => {
        tableBody.append(`
          <tr>
            <td>${el.ProductCode}</td>
            <td>${el.ProductName}</td>
            <td>${el.ProductCategory}</td>
          </tr>
        `);
      });
    }
  } catch (error) {
    console.log(error);
  }
});
