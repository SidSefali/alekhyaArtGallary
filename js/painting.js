const id = new URLSearchParams(location.search).get("id");
const p = paintings.find(x => x.id == id);

details.innerHTML = `
  <img src="${p.image}" class="painting-img">
  <h2>${p.title}</h2>
  <p><strong>Price:</strong> $${p.price}</p>
  <p>${p.long}</p>
  <button class="btn add-btn" onclick="addToCart()">🛒 Add to Cart</button>
`;

function addToCart() {
  let cart = getCart();
  let item = cart.find(i => i.id === p.id);

  item ? item.qty++ : cart.push({ ...p, qty: 1 });

  sessionStorage.setItem("cart", JSON.stringify(cart));

  updateCartBadge();
  showToast();
  // Redirect to Gallery after OK
  //window.location.href = "gallery.html";
}