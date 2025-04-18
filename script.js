<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function () {
  // Cache DOM elements
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll('nav a:not([onclick])[href^="#"]'); // Exclude booking link

  // Add click event to navigation links (excluding booking)
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Skip if it's a booking link
      if (this.hasAttribute("onclick")) return;

      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Add transition class to current section
        document.querySelector("section.active")?.classList.remove("active");

        // Smooth scroll to target
        smoothScrollTo(targetSection, 800);
      }
    });
  });

  // Smooth scroll function with callback
  function smoothScrollTo(element, duration) {
    const start = window.pageYOffset;
    const target = element.getBoundingClientRect().top;
    const startTime = performance.now();

    function scrollStep(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, start + target * easeProgress);

      if (progress < 1) {
        window.requestAnimationFrame(scrollStep);
      } else {
        // Animation complete - add active class
        element.classList.add("active");
      }
    }

    window.requestAnimationFrame(scrollStep);
  }

  // =============================================
  // BOOKING MODAL FIXES
  // =============================================

  // Booking form functionality
  const bookingForm = document.getElementById("bookingForm");
  const modal = document.getElementById("bookingModal");

  // Function to open the booking form modal
  window.openBookingForm = function (vehicleName) {
    const vehicleInput = document.getElementById("vehicle");
    if (vehicleInput) {
      vehicleInput.value = vehicleName || "Select a vehicle";
    }
    if (modal) {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  };

  // Function to close the booking form modal
  window.closeBookingForm = function () {
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };

  // Close modal when clicking outside of it
  window.onclick = function (event) {
    if (event.target === modal) {
      closeBookingForm();
    }
  };

  // Handle form submission
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get user input values
      const vehicle = document.getElementById("vehicle").value;
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const date = document.getElementById("date").value;
      const drop = document.getElementById("drop").value;

      if (!name || !email || !date || !drop) {
        showNotification("Please fill in all the fields!", "error");
        return;
      }

      // Hide the form modal
      closeBookingForm();

      // Show confirmation modal
      showConfirmation(vehicle, name, email, date, drop);
    });
  }

  // Function to show confirmation modal
  function showConfirmation(vehicle, name, email, date, drop) {
    let confirmationModal = document.getElementById("confirmationModal");

    if (!confirmationModal) {
      confirmationModal = document.createElement("div");
      confirmationModal.id = "confirmationModal";
      confirmationModal.className = "modal";
      confirmationModal.innerHTML = `
          <div class="modal-content">
            <span class="close" onclick="closeConfirmation()">&times;</span>
            <h3 class="modal-title">Booking <span>Confirmed</span></h3>
            <div class="confirmation-details">
              <p><strong>Vehicle:</strong> ${vehicle}</p>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Pickup Date:</strong> ${date}</p>
              <p><strong>Return Date:</strong> ${drop}</p>
            </div>
            <button onclick="closeConfirmation()" class="btn pulse-btn">
              <span>Awesome!</span>
              <div class="btn-afterglow"></div>
            </button>
          </div>
        `;
      document.body.appendChild(confirmationModal);
    }

    confirmationModal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Close modal when clicking outside
    confirmationModal.addEventListener("click", function (event) {
      if (event.target === confirmationModal) {
        closeConfirmation();
      }
    });
  }

  // Function to close the confirmation modal
  window.closeConfirmation = function () {
    const confirmationModal = document.getElementById("confirmationModal");
    if (confirmationModal) {
      confirmationModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };

  // =============================================
  // HELPER FUNCTIONS
  // =============================================

  // Easing function for smooth animation
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // Show notification function
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

  // =============================================
  // INTERSECTION OBSERVER FOR ACTIVE SECTIONS
  // =============================================

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.4,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelector("section.active")?.classList.remove("active");
        entry.target.classList.add("active");

        // Update active nav link (excluding booking)
        const id = "#" + entry.target.id;
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === id) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Set initial active section
  if (sections.length > 0) {
    sections[0].classList.add("active");
    const firstNavLink = document.querySelector(
      `nav a[href="#${sections[0].id}"]:not([onclick])`
    );
    firstNavLink?.classList.add("active");
  }
});
function sayHello() {
  console.log("hello");
}
document.addEventListener("DOMContentLoaded", () => {
  const formTitle = document.getElementById("form-title");
  const toggleLink = document.getElementById("toggle");
  const loginForm = document.getElementById("loginForm");
  const btnval = document.getElementById("sub");

  let isLogin = true;

  toggleLink.addEventListener("click", (event) => {
    event.preventDefault();
    isLogin = !isLogin;

    if (isLogin) {
      formTitle.textContent = "Login";
      btnval.textContent = "Login";
      toggleLink.innerHTML = "Don't have an account? <a href='#'>Sign Up</a>";
    } else {
      formTitle.textContent = "Sign Up";
      btnval.textContent = "Sign Up";
      toggleLink.innerHTML = "Already have an account? <a href='#'>Login</a>";
    }
    document.querySelector(".form-box").classList.toggle("signup-mode");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // =============================================
  // DATE INPUT PLACEHOLDER FIX
  // =============================================
  const dateInputs = document.querySelectorAll('input[type="date"]');

  // Set initial placeholder text
  dateInputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("empty");
    }
  });

  // Update on change
  dateInputs.forEach((input) => {
    input.addEventListener("change", function () {
      if (this.value) {
        this.classList.remove("empty");
      } else {
        this.classList.add("empty");
      }
    });

    input.addEventListener("focus", function () {
      this.classList.remove("empty");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.classList.add("empty");
      }
    });
  });

  // [Rest of your original JavaScript code remains exactly the same]
});
=======
document.addEventListener("DOMContentLoaded", function () {
  // Cache DOM elements
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll('nav a:not([onclick])[href^="#"]'); // Exclude booking link

  // Add click event to navigation links (excluding booking)
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Skip if it's a booking link
      if (this.hasAttribute("onclick")) return;

      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Add transition class to current section
        document.querySelector("section.active")?.classList.remove("active");

        // Smooth scroll to target
        smoothScrollTo(targetSection, 800);
      }
    });
  });

  // Smooth scroll function with callback
  function smoothScrollTo(element, duration) {
    const start = window.pageYOffset;
    const target = element.getBoundingClientRect().top;
    const startTime = performance.now();

    function scrollStep(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, start + target * easeProgress);

      if (progress < 1) {
        window.requestAnimationFrame(scrollStep);
      } else {
        // Animation complete - add active class
        element.classList.add("active");
      }
    }

    window.requestAnimationFrame(scrollStep);
  }

  // =============================================
  // BOOKING MODAL FIXES
  // =============================================

  // Booking form functionality
  const bookingForm = document.getElementById("bookingForm");
  const modal = document.getElementById("bookingModal");

  // Function to open the booking form modal
  window.openBookingForm = function (vehicleName) {
    const vehicleInput = document.getElementById("vehicle");
    if (vehicleInput) {
      vehicleInput.value = vehicleName || "Select a vehicle";
    }
    if (modal) {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  };

  // Function to close the booking form modal
  window.closeBookingForm = function () {
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };

  // Close modal when clicking outside of it
  window.onclick = function (event) {
    if (event.target === modal) {
      closeBookingForm();
    }
  };

  // Handle form submission
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get user input values
      const vehicle = document.getElementById("vehicle").value;
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const date = document.getElementById("date").value;
      const drop = document.getElementById("drop").value;

      if (!name || !email || !date || !drop) {
        showNotification("Please fill in all the fields!", "error");
        return;
      }

      // Hide the form modal
      closeBookingForm();

      // Show confirmation modal
      showConfirmation(vehicle, name, email, date, drop);
    });
  }

  // Function to show confirmation modal
  function showConfirmation(vehicle, name, email, date, drop) {
    let confirmationModal = document.getElementById("confirmationModal");

    if (!confirmationModal) {
      confirmationModal = document.createElement("div");
      confirmationModal.id = "confirmationModal";
      confirmationModal.className = "modal";
      confirmationModal.innerHTML = `
          <div class="modal-content">
            <span class="close" onclick="closeConfirmation()">&times;</span>
            <h3 class="modal-title">Booking <span>Confirmed</span></h3>
            <div class="confirmation-details">
              <p><strong>Vehicle:</strong> ${vehicle}</p>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Pickup Date:</strong> ${date}</p>
              <p><strong>Return Date:</strong> ${drop}</p>
            </div>
            <button onclick="closeConfirmation()" class="btn pulse-btn">
              <span>Awesome!</span>
              <div class="btn-afterglow"></div>
            </button>
          </div>
        `;
      document.body.appendChild(confirmationModal);
    }

    confirmationModal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Close modal when clicking outside
    confirmationModal.addEventListener("click", function (event) {
      if (event.target === confirmationModal) {
        closeConfirmation();
      }
    });
  }

  // Function to close the confirmation modal
  window.closeConfirmation = function () {
    const confirmationModal = document.getElementById("confirmationModal");
    if (confirmationModal) {
      confirmationModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };

  // =============================================
  // HELPER FUNCTIONS
  // =============================================

  // Easing function for smooth animation
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // Show notification function
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

  // =============================================
  // INTERSECTION OBSERVER FOR ACTIVE SECTIONS
  // =============================================

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.4,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelector("section.active")?.classList.remove("active");
        entry.target.classList.add("active");

        // Update active nav link (excluding booking)
        const id = "#" + entry.target.id;
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === id) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Set initial active section
  if (sections.length > 0) {
    sections[0].classList.add("active");
    const firstNavLink = document.querySelector(
      `nav a[href="#${sections[0].id}"]:not([onclick])`
    );
    firstNavLink?.classList.add("active");
  }
});
function sayHello() {
  console.log("hello");
}
document.addEventListener("DOMContentLoaded", () => {
  const formTitle = document.getElementById("form-title");
  const toggleLink = document.getElementById("toggle");
  const loginForm = document.getElementById("loginForm");
  const btnval = document.getElementById("sub");

  let isLogin = true;

  toggleLink.addEventListener("click", (event) => {
    event.preventDefault();
    isLogin = !isLogin;

    if (isLogin) {
      formTitle.textContent = "Login";
      btnval.textContent = "Login";
      toggleLink.innerHTML = "Don't have an account? <a href='#'>Sign Up</a>";
    } else {
      formTitle.textContent = "Sign Up";
      btnval.textContent = "Sign Up";
      toggleLink.innerHTML = "Already have an account? <a href='#'>Login</a>";
    }
    document.querySelector(".form-box").classList.toggle("signup-mode");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // =============================================
  // DATE INPUT PLACEHOLDER FIX
  // =============================================
  const dateInputs = document.querySelectorAll('input[type="date"]');

  // Set initial placeholder text
  dateInputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("empty");
    }
  });

  // Update on change
  dateInputs.forEach((input) => {
    input.addEventListener("change", function () {
      if (this.value) {
        this.classList.remove("empty");
      } else {
        this.classList.add("empty");
      }
    });

    input.addEventListener("focus", function () {
      this.classList.remove("empty");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.classList.add("empty");
      }
    });
  });

  // [Rest of your original JavaScript code remains exactly the same]
});
>>>>>>> f38fe64ee28059191c33ae85031c884f6c5aeea6
