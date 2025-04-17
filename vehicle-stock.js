// File: vehicle-stock.js

document.addEventListener("DOMContentLoaded", function () {
  // Initialize vehicle stock if not already set
  if (!localStorage.getItem("vehicleStock")) {
    const initialStock = {
      "Skoda Fabia": 5,
      "Toyota Aygo": 5,
      "Dacia Sandero": 5,
      "Hyundai i10": 5,
      "Volkswagen Virtus": 5,
      "Kia Picanto": 5,
      "Peugeot 301": 5,
      "Volkswagen Polo": 5,
      "Skoda Scala": 5,
      "Volkswagen Golf": 5,
      "Fiat 500": 5,
      "Skoda Octavia": 5,
      "Renault Clio": 5,
      "Skoda Kodiaq": 5,
      "Mini Cooper": 5,
      "Nissan Qashqai": 5,
      "Audi Q5": 3,
      "BMW X1": 3,
      "Mercedes C class": 3,
      "DS DS7": 3,
      "Mercedes E class": 3,
      "Ford Mustang Mach-E": 3,
    };
    localStorage.setItem("vehicleStock", JSON.stringify(initialStock));
  }

  // Initialize active rentals if not already set
  if (!localStorage.getItem("activeRentals")) {
    localStorage.setItem("activeRentals", JSON.stringify([]));
  }

  // Display stock quantities on page load
  updateStockDisplay();

  // Check for expired rentals periodically
  setInterval(checkExpiredRentals, 60000); // Check every minute

  // Modify the booking form submission to handle stock
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const vehicle = document.getElementById("vehicle").value;
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const date = document.getElementById("date").value;
      const drop = document.getElementById("drop").value;

      if (!name || !email || !date || !drop) {
        showNotification("Please fill in all the fields!", "error");
        return;
      }

      // Check vehicle availability
      const stock = JSON.parse(localStorage.getItem("vehicleStock"));
      if (stock[vehicle] <= 0) {
        showNotification(
          `Sorry, ${vehicle} is currently out of stock!`,
          "error"
        );
        return;
      }

      // Process the booking
      processBooking(vehicle, name, email, date, drop);
    });
  }
});

function processBooking(vehicle, name, email, pickupDate, dropDate) {
  // Decrement stock
  const stock = JSON.parse(localStorage.getItem("vehicleStock"));
  stock[vehicle] -= 1;
  localStorage.setItem("vehicleStock", JSON.stringify(stock));

  // Add to active rentals
  const activeRentals = JSON.parse(localStorage.getItem("activeRentals"));
  activeRentals.push({
    vehicle: vehicle,
    pickupDate: pickupDate,
    dropDate: dropDate,
  });
  localStorage.setItem("activeRentals", JSON.stringify(activeRentals));

  // Update display
  updateStockDisplay();

  // Close the modal and show confirmation
  closeBookingForm();
  showConfirmation(vehicle, name, email, pickupDate, dropDate);
}

function updateStockDisplay() {
  const stock = JSON.parse(localStorage.getItem("vehicleStock"));

  // Update quantity display for each vehicle card
  document.querySelectorAll(".vehicle-card").forEach((card) => {
    const vehicleName = card.querySelector("h3").textContent;
    let quantityDisplay = card.querySelector(".quantity-display");

    if (!quantityDisplay) {
      quantityDisplay = document.createElement("div");
      quantityDisplay.className = "quantity-display";
      card.appendChild(quantityDisplay);
    }

    quantityDisplay.textContent = `Available: ${stock[vehicleName] || 0}`;

    // Style based on availability
    if (stock[vehicleName] <= 0) {
      card.style.opacity = "0.7";
      card.querySelector("button").disabled = true;
      quantityDisplay.style.color = "#ff2a6d";
    } else {
      card.style.opacity = "1";
      card.querySelector("button").disabled = false;
      quantityDisplay.style.color = "#00ff9d";
    }
  });
}

function checkExpiredRentals() {
  const activeRentals = JSON.parse(localStorage.getItem("activeRentals"));
  const stock = JSON.parse(localStorage.getItem("vehicleStock"));
  const now = new Date();
  let updated = false;

  // Filter out expired rentals and increment stock
  const updatedRentals = activeRentals.filter((rental) => {
    const dropDate = new Date(rental.dropDate);
    if (dropDate <= now) {
      // Rental period has ended, return vehicle to stock
      stock[rental.vehicle] += 1;
      updated = true;
      return false; // Remove from active rentals
    }
    return true; // Keep in active rentals
  });

  if (updated) {
    localStorage.setItem("activeRentals", JSON.stringify(updatedRentals));
    localStorage.setItem("vehicleStock", JSON.stringify(stock));
    updateStockDisplay();
  }
}

// Helper function to show notifications
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}
