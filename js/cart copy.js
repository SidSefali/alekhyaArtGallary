const cart = JSON.parse(localStorage.getItem("cart")) || [];
const div = document.getElementById("cart");

if (cart.length === 0) {
 div.innerHTML = "<p>Your cart is empty</p>";
}

cart.forEach(item => {
 div.innerHTML += `<p>${item.title} $${item.price}</p>`;
});
