const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "Alekhya@123"
  };
  
  function loginAdmin() {
    const user = document.getElementById("adminUser").value;
    const pass = document.getElementById("adminPass").value;
  
    if (
      user === ADMIN_CREDENTIALS.username &&
      pass === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem("isAdmin", "true");
      window.location.href = "admin-dashboard.html";
    } else {
      document.getElementById("adminError").textContent =
        "Invalid admin credentials";
    }
  }

  function requireAdmin() {
    if (localStorage.getItem("isAdmin") !== "true") {
      alert("Unauthorized access");
      location.href = "index.html";
    }
  }
  
  function getGallery() {
    return JSON.parse(localStorage.getItem("gallery")) || [];
  }
  
  function saveGallery(data) {
    localStorage.setItem("gallery", JSON.stringify(data));
  }

  function addPainting() {
    const gallery = getGallery();
  
    const painting = {
      id: Date.now(),
      title: title.value,
      price: Number(price.value),
      image: image.value,
      shortDesc: shortDesc.value,
      story: story.value
    };
  
    gallery.push(painting);
    saveGallery(gallery);
  
    renderAdminGallery();
  }

  function deletePainting(id) {
    const updated = getGallery().filter(p => p.id !== id);
    saveGallery(updated);
    renderAdminGallery();
  }

  function renderAdminGallery() {
    const div = document.getElementById("adminGallery");
    div.innerHTML = "";
  
    getGallery().forEach(p => {
      div.innerHTML += `
        <div>
          <img src="${p.image}" width="80">
          <b>${p.title}</b>
          ₹${p.price}
          <button onclick="deletePainting(${p.id})">Delete</button>
        </div>
      `;
    });
  }

  function logoutAdmin() {
    localStorage.removeItem("isAdmin");
    sessionStorage.clear();
    window.location.href = "index.html";
  }
  
  function logoutUser() {
    localStorage.removeItem("isAdmin");
    sessionStorage.clear();
    window.location.href = "index.html";
  }
  window.addEventListener("load", updateHeader);