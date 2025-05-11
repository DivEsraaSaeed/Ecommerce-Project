// window.onload = document.addEventListener("DOMContentLoaded", function () {
//     console.log("Dd");
    

// });

$(function(){
  try {
    let { Store } = JSON.parse(localStorage.getItem("Store"));
    
$("#iconUP").removeClass("d-none").addClass("d-block")


    console.log("🚀 ~ ProductList.js:6 ~ Store:", Store);

    let user = JSON.parse(localStorage.getItem("currentUser"));
    let userEmail = user ? user.email : "";
    for (const key in Store) {
      let Products = Store[key].ProductCategory.Products;

      let SellerProducts = Products.filter(
        (product) => product.SellerEmail === userEmail
      );



      SellerProducts.map((el) => {
        const tableBody = document.querySelector("tbody");

        let row = `
           <td>${el.ProductCode}</td>
            <td>${el.ProductName}</td>
            <td>${el.ProductCategory}</td>
       `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.log(error);
  }

})