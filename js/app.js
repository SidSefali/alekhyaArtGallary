window.addEventListener("DOMContentLoaded", () => {
    const user = getStoredUser();
  
    if (!user || !checkSessionExpiry()) {
      const popup = document.getElementById("userPopup");
      if (popup) popup.style.display = "flex";
    } else {
      showUser(user);
      refreshActivity();
    }
  });
  
  // Show user name if header exists
  function showUser(name) {
    const el = document.getElementById("username");
    if (el) el.innerText = "Welcome, " + name;
  }
  
  // Save user from popup
  function saveUser() {
    const f = fname.value.trim();
    const l = lname.value.trim();
    const remember = document.getElementById("rememberMe").checked;

    const fullName = (f || l) ? `${f} ${l}`.trim() : "Guest";
 
    setUser(fullName, remember);
    document.getElementById("userPopup").style.display = "none";
    showUser(fullName);
  }

  
  // Track activity globally
  ["click", "mousemove", "keydown", "scroll"].forEach(evt => {
    document.addEventListener(evt, refreshActivity);
  });

  function showToast() {
    const oldToast = document.getElementById("toast");
    if (oldToast) oldToast.remove();
  
    const toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
  
    toast.innerHTML = `
      <strong>Added to cart 🎨</strong>
      <div class="toast-actions">
        <button class="view-cart-btn" onclick="location.href='cart.html'">
          View Cart
        </button>
        <button class="continue-btn" onclick="goToGallery()">
          Continue Shopping
        </button>
      </div>
    `;
  
    document.body.appendChild(toast);
  }

  function showToast1() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Remove existing toast if any
    const oldToast = document.getElementById("toast");
    if (oldToast) oldToast.remove();
  
    const toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
  
    // 🔴 CASE 1: CART EMPTY → CHECKOUT BLOCK MESSAGE

     if (!cart.length) {
      toast.innerHTML = `
        <strong>⚠️ Checkout not possible</strong>
        <div class="toast-message">
          There are no items in the cart. Please add items to proceed.
        </div>
      `;
    } 
    // 🟢 CASE 2: CART HAS ITEMS → NORMAL ADD TO CART TOAST
    else {
      toast.innerHTML = `
        <strong>Added to cart 🎨</strong>
        <div class="toast-actions">
          <button class="view-cart-btn" onclick="location.href='cart.html'">
            View Cart
          </button>
          <button class="continue-btn" onclick="goToGallery()">
            Continue Browsing
          </button>
        </div>
      `;
    }
  
    document.body.appendChild(toast);
  
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      toast.classList.add("show");
    }, 50);
  
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  
  function closeToast() {
    const toast = document.getElementById("toast");
    if (toast) toast.remove();
  }
  
  function goToGallery() {
    closeToast();
    window.location.href = "gallery.html";
  }