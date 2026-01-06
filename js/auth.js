function register() {
  localStorage.setItem("user", JSON.stringify({ role: "USER" }));
  alert("Registered successfully");
}

function login() {
  localStorage.setItem("loggedIn", true);
  window.location.href = "gallery.html";
}
