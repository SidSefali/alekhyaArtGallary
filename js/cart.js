let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

const cartItemsEl = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const orderPreviewEl = document.getElementById("orderPreview");

renderCart();

function renderCart() {
  if (!cart.length) {
    cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceEl.innerText = "0";
    sessionStorage.setItem("cart", JSON.stringify(cart));
    return;
  }

  let total = 0;

  cartItemsEl.innerHTML = cart.map((item, index) => {
    total += item.price * item.qty;
    return `
      <div class="cart-item">
        <strong>${item.title}</strong>
        <p>Price: $${item.price}</p>
        <p>
          Qty:
          <button onclick="updateQty(${index}, -1)">−</button>
          ${item.qty}
          <button onclick="updateQty(${index}, 1)">+</button>
        </p>
        <p>Total: $${item.price * item.qty}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  }).join("");

  totalPriceEl.innerText = total;
  sessionStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(painting) {
  const existingItem = cart.find(item => item.id === painting.id);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: painting.id,
      title: painting.title,
      price: Number(painting.price),
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  showToast("Added to cart");
}

function addToCart1(painting) {
    if (cart[painting._id]) {
    cart[painting._id].qty += 1;
    } else {
    cart[painting._id] = { data: painting, qty: 1 };
    }
    renderCart();
    }
    
function updateQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

/* ---------- CHECKOUT FLOW ---------- */

function openCheckoutPopup() {
  //const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart.length) {
    alert("Your cart is empty");
    return;
  }

    // ✅ FORCE SYNC (CRITICAL FIX)
    localStorage.setItem("cart", JSON.stringify(cart));

  let total = 0;
  const orderPreviewEl = document.getElementById("orderPreview");
  const totalEl = document.getElementById("checkout-total-amount");

  orderPreviewEl.innerHTML = "";

  cart.forEach(item => {
    // ✅ SAFELY RESOLVE VALUES
    const qty = Number(item.qty || item.quantity || 1);
    const price = Number(item.price || item.cost || 0);

    const itemTotal = qty * price;
    total += itemTotal;

    orderPreviewEl.innerHTML += `
      <p>${item.title} × ${qty} = ₹${itemTotal.toFixed(2)}</p>
    `;
  });

  totalEl.textContent = `₹${total.toFixed(2)}`;

  document.getElementById("checkoutPopup").style.display = "flex";
}

  function closeCheckoutPopup() {
    document.getElementById("checkoutPopup").style.display = "none";
  }
  

function confirmOrder() {
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!email || !phone) {
    alert("Please enter Email and Phone");
    return;
  }

  const user = getStoredUser() || "Guest User";

  const orderText = cart.map(
    i => `${i.title} x ${i.qty} = $${i.price * i.qty}`
  ).join("\n");

  const total = totalPriceEl.innerText;

  /* EMAIL */
  const mailBody = `
Customer: ${user}
Email: ${email}
Phone: ${phone}

Order:
${orderText}

Total: $${total}
  `;

  window.location.href =
    `mailto:admin@alekhyaart.com?subject=New Art Order&body=` +
    encodeURIComponent(mailBody);

  /* WHATSAPP */
  window.open(
    `https://wa.me/1234567890?text=` +
    encodeURIComponent(mailBody),
    "_blank"
  );

  alert("Order sent successfully 🎉");
  sessionStorage.removeItem("cart");
  closeCheckout();
  renderCart();
}
