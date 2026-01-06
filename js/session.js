const SESSION_TIMEOUT = 30 * 60 * 1000; // 15 minutes

function updateHeader() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const adminLink = document.getElementById("adminHeaderLink");
  const logoutBtn = document.getElementById("logoutBtn");

  if (adminLink) adminLink.style.display = isAdmin ? "none" : "inline";
  if (logoutBtn) logoutBtn.style.display = isAdmin ? "inline" : "none";
}


function goToAdminLogin() {
  closePopup(); // close popup safely
  window.location.href = "admin.html";
}

function openPopup() {
  const overlay = document.getElementById("popupOverlay");
  if (!overlay) return; // popup exists only on index.html

  overlay.classList.remove("hidden");
  document.body.classList.add("popup-open");
}

function closePopup() {
  const overlay = document.getElementById("popupOverlay");
  if (!overlay) return;

  overlay.classList.add("hidden");
  document.body.classList.remove("popup-open");
}

function isIndexPage() {
  return location.pathname.endsWith("index.html") || location.pathname === "/";
}

function getStoredUser() {
  return sessionStorage.getItem("user") ||
         localStorage.getItem("user");
}

function setUser(name, remember) {
  sessionStorage.setItem("user", name);
  sessionStorage.setItem("lastActive", Date.now());

  if (remember) {
    localStorage.setItem("user", name);
  }
}

function clearUser() {
  sessionStorage.clear();
  localStorage.removeItem("user");
}

function checkSessionExpiry() {
  const lastActive = sessionStorage.getItem("lastActive");
  if (!lastActive) return false;

  if (Date.now() - lastActive > SESSION_TIMEOUT) {
    clearUser();
    return false;
  }
  return true;
}

function checkSessionExpiry1() {
  const lastActive = sessionStorage.getItem("lastActive");
  if (!lastActive) return false;

  if (Date.now() - lastActive > SESSION_TIMEOUT) {
    clearUser();
    return false;
  }

  // ✅ ENSURE DISPLAY NAME EXISTS
  let user = JSON.parse(sessionStorage.getItem("user")) || {};

  if (!user.name || !user.name.trim()) {
    user.name = "ArtLover";
    sessionStorage.setItem("user", JSON.stringify(user));
  }
  return true;
}


function checkSession() {
  if (!checkSessionExpiry()) {
    openPopup();
  } else {
    showUser();
  }
}

function refreshActivity() {
  sessionStorage.setItem("lastActive", Date.now());
}


let slideIndex = 0;
let carouselInterval = null;

function startCarousel() {
  const slides = document.querySelectorAll(".carousel-img");
  if (!slides.length) return;

  slides.forEach(slide => slide.classList.remove("active"));

  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}

function startCarouselAuto() {
  if (carouselInterval) return;
  carouselInterval = setInterval(startCarousel, 3500);
}

function stopCarouselAuto() {
  clearInterval(carouselInterval);
  carouselInterval = null;
}

window.addEventListener("load", () => {
  startCarouselAuto();

  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  // 🛑 Pause on hover
  carousel.addEventListener("mouseenter", stopCarouselAuto);

  // ▶ Resume on mouse leave
  carousel.addEventListener("mouseleave", startCarouselAuto);
});
