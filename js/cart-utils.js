function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;

  const cart = getCart();
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  badge.innerText = count;
  badge.style.display = count > 0 ? "inline-block" : "none";
}

function setCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

window.addEventListener("DOMContentLoaded", updateCartBadge);
