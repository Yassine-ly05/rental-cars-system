<<<<<<< HEAD
// File: admin.js
document.addEventListener("DOMContentLoaded", function () {
  // Check if admin is logged in
  if (!localStorage.getItem("adminLoggedIn")) {
    document.getElementById("passwordModal").style.display = "block";
  } else {
    loadVehicleStock();
  }

  // Admin login
  document.getElementById("loginBtn").addEventListener("click", function () {
    const password = document.getElementById("adminPassword").value;
    // Replace 'admin123' with your secure password
    if (password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      document.getElementById("passwordModal").style.display = "none";
      loadVehicleStock();
    } else {
      alert("Incorrect password!");
    }
  });

  // Logout functionality
  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("adminLoggedIn");
    window.location.reload();
  });

  // Search functionality
  document
    .getElementById("searchVehicle")
    .addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase();
      const items = document.querySelectorAll(".stock-item");

      items.forEach((item) => {
        const vehicleName = item.querySelector("h3").textContent.toLowerCase();
        if (vehicleName.includes(searchTerm)) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });
});

function loadVehicleStock() {
  const stockList = document.getElementById("stockList");
  stockList.innerHTML = "";

  // Get current stock from localStorage
  const vehicleStock = JSON.parse(localStorage.getItem("vehicleStock")) || {};
  const vehicles = Object.keys(vehicleStock);

  if (vehicles.length === 0) {
    stockList.innerHTML =
      '<p class="no-vehicles">No vehicles found in inventory.</p>';
    return;
  }

  vehicles.forEach((vehicle) => {
    const stockItem = document.createElement("div");
    stockItem.className = "stock-item";

    stockItem.innerHTML = `
            <div class="vehicle-info">
                <h3>${vehicle}</h3>
                <p>Current stock: <span class="stock-count">${vehicleStock[vehicle]}</span></p>
            </div>
            <div class="stock-controls">
                <button class="btn decrease-btn"><i class="fas fa-minus"></i></button>
                <input type="number" value="${vehicleStock[vehicle]}" min="0" class="stock-input">
                <button class="btn increase-btn"><i class="fas fa-plus"></i></button>
            </div>
        `;

    // Add event listeners for the buttons
    const decreaseBtn = stockItem.querySelector(".decrease-btn");
    const increaseBtn = stockItem.querySelector(".increase-btn");
    const stockInput = stockItem.querySelector(".stock-input");

    decreaseBtn.addEventListener("click", () => {
      let value = parseInt(stockInput.value);
      if (value > 0) {
        stockInput.value = value - 1;
        updateStock(vehicle, stockInput.value);
      }
    });

    increaseBtn.addEventListener("click", () => {
      let value = parseInt(stockInput.value);
      stockInput.value = value + 1;
      updateStock(vehicle, stockInput.value);
    });

    stockInput.addEventListener("change", () => {
      updateStock(vehicle, stockInput.value);
    });

    stockList.appendChild(stockItem);
  });
}

function updateStock(vehicle, newQuantity) {
  const stock = JSON.parse(localStorage.getItem("vehicleStock"));
  stock[vehicle] = parseInt(newQuantity);
  localStorage.setItem("vehicleStock", JSON.stringify(stock));

  // Update the display
  document.querySelectorAll(".stock-item").forEach((item) => {
    if (item.querySelector("h3").textContent === vehicle) {
      item.querySelector(".stock-count").textContent = newQuantity;
    }
  });
}
=======
// File: admin.js
document.addEventListener("DOMContentLoaded", function () {
  // Check if admin is logged in
  if (!localStorage.getItem("adminLoggedIn")) {
    document.getElementById("passwordModal").style.display = "block";
  } else {
    loadVehicleStock();
  }

  // Admin login
  document.getElementById("loginBtn").addEventListener("click", function () {
    const password = document.getElementById("adminPassword").value;
    // Replace 'admin123' with your secure password
    if (password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      document.getElementById("passwordModal").style.display = "none";
      loadVehicleStock();
    } else {
      alert("Incorrect password!");
    }
  });

  // Logout functionality
  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("adminLoggedIn");
    window.location.reload();
  });

  // Search functionality
  document
    .getElementById("searchVehicle")
    .addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase();
      const items = document.querySelectorAll(".stock-item");

      items.forEach((item) => {
        const vehicleName = item.querySelector("h3").textContent.toLowerCase();
        if (vehicleName.includes(searchTerm)) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });
});

function loadVehicleStock() {
  const stockList = document.getElementById("stockList");
  stockList.innerHTML = "";

  // Get current stock from localStorage
  const vehicleStock = JSON.parse(localStorage.getItem("vehicleStock")) || {};
  const vehicles = Object.keys(vehicleStock);

  if (vehicles.length === 0) {
    stockList.innerHTML =
      '<p class="no-vehicles">No vehicles found in inventory.</p>';
    return;
  }

  vehicles.forEach((vehicle) => {
    const stockItem = document.createElement("div");
    stockItem.className = "stock-item";

    stockItem.innerHTML = `
            <div class="vehicle-info">
                <h3>${vehicle}</h3>
                <p>Current stock: <span class="stock-count">${vehicleStock[vehicle]}</span></p>
            </div>
            <div class="stock-controls">
                <button class="btn decrease-btn"><i class="fas fa-minus"></i></button>
                <input type="number" value="${vehicleStock[vehicle]}" min="0" class="stock-input">
                <button class="btn increase-btn"><i class="fas fa-plus"></i></button>
            </div>
        `;

    // Add event listeners for the buttons
    const decreaseBtn = stockItem.querySelector(".decrease-btn");
    const increaseBtn = stockItem.querySelector(".increase-btn");
    const stockInput = stockItem.querySelector(".stock-input");

    decreaseBtn.addEventListener("click", () => {
      let value = parseInt(stockInput.value);
      if (value > 0) {
        stockInput.value = value - 1;
        updateStock(vehicle, stockInput.value);
      }
    });

    increaseBtn.addEventListener("click", () => {
      let value = parseInt(stockInput.value);
      stockInput.value = value + 1;
      updateStock(vehicle, stockInput.value);
    });

    stockInput.addEventListener("change", () => {
      updateStock(vehicle, stockInput.value);
    });

    stockList.appendChild(stockItem);
  });
}

function updateStock(vehicle, newQuantity) {
  const stock = JSON.parse(localStorage.getItem("vehicleStock"));
  stock[vehicle] = parseInt(newQuantity);
  localStorage.setItem("vehicleStock", JSON.stringify(stock));

  // Update the display
  document.querySelectorAll(".stock-item").forEach((item) => {
    if (item.querySelector("h3").textContent === vehicle) {
      item.querySelector(".stock-count").textContent = newQuantity;
    }
  });
}
>>>>>>> f38fe64ee28059191c33ae85031c884f6c5aeea6
