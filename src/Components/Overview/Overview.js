(function () {
    $(document).ready(function () {
      function renderChart() {
        try {
          const storeData = JSON.parse(localStorage.getItem("Store")) || {
            Store: {},
          };
          const userData = JSON.parse(localStorage.getItem("Login")) || [{}];
          const userEmail = userData[0]?.email || "";
  
          const ordersData = JSON.parse(
            localStorage.getItem("confirmed_orders") || '{"order": []}'
          );
          const { order } = ordersData;
  
          const sellerProducts = order.filter(
            (el) => el.sellerEmail === userEmail
          );
  
          if (sellerProducts.length === 0) {
            throw new Error("You don't have any products sold.");
          }
  
          const productSales = {};
  
          sellerProducts.forEach((item) => {
            if (productSales[item.ProductName]) {
              productSales[item.ProductName] += item.quantity;
            } else {
              productSales[item.ProductName] = item.quantity;
            }
          });
  
          const productNames = Object.keys(productSales);
          const salesQuantities = Object.values(productSales);
  
          const ctx = document.getElementById("salesChart").getContext("2d");
  
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: productNames,
              datasets: [
                {
                  label: "الكمية المباعة",
                  data: salesQuantities,
                  backgroundColor: "rgba(54, 162, 235, 0.7)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                  rtl: true,
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `الكمية: ${context.raw}`;
                    },
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "الكمية المباعة",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "أسماء المنتجات",
                  },
                },
              },
            },
          });
        } catch (error) {
          console.error("error  ", error);
          $(".chart-container").html(`
            <div class="alert alert-danger text-center">
                <h4>Unable to load sales data</h4>
                <p>${error.message}</p>
                <p>Click the button below to try again.</p>
                <button id="retryBtn" class="btn btn-primary mt-3">🔄 إعادة المحاولة</button>
            </div>
          `);
  
          // زرار الإعادة
          $("#retryBtn").on("click", function () {
            $(".chart-container").html(`
              <canvas id="salesChart" height="400"></canvas>
            `);
            renderChart(); // إعادة المحاولة
          });
        }
      }
  
      renderChart(); // تشغيل أول مرة
    });
  })();
  