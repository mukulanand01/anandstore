document.addEventListener("DOMContentLoaded", function () {
  const cartIcon = document.querySelector('img[src="images/cart.png"]');
  const cartPanel = document.getElementById("cart-panel");
  const cartItemsContainer = document.getElementById("cart-items");
  const closeCart = document.getElementById("closeCart");
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cart = [];

  // Toggle cart visibility
  cartIcon.addEventListener("click", () => {
    const isVisible = cartPanel.style.display === "block";
    cartPanel.style.display = isVisible ? "none" : "block";
    document.body.classList.toggle("cart-open", !isVisible);
  });

  closeCart.addEventListener("click", () => {
    cartPanel.style.display = "none";
    document.body.classList.remove("cart-open");
  });

  // Add to cart
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const productDiv = button.closest(".col-4");
      const name = productDiv.querySelector("h4").innerText;
      const price = productDiv.querySelector("p").innerText;
      const imgSrc = productDiv.querySelector("img").getAttribute("src");

      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ name, price, imgSrc, quantity: 1 });
      }

      updateCartUI();
    });
  });

  // Update Cart Display
  function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.style.marginBottom = "10px";
      itemDiv.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <div>
            <img src="${item.imgSrc}" width="50" style="vertical-align:middle; margin-right:10px;">
            <strong>${item.name}</strong><br>
            ${item.price} x ${item.quantity}
          </div>
          <div>
            <button class="qty-btn" data-action="decrease" data-index="${index}">-</button>
            <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
            <button class="remove-btn" data-index="${index}">❌</button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(itemDiv);

      const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
      total += price * item.quantity;
    });

    let totalElement = document.getElementById('cart-total');
    if (!totalElement) {
      totalElement = document.createElement("div");
      totalElement.id = "cart-total";
      totalElement.style.marginTop = "10px";
      totalElement.style.fontWeight = "bold";
      cartPanel.appendChild(totalElement);
    }
    totalElement.textContent = `Total: ₹${total.toFixed(2)}`;

    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        const action = e.target.getAttribute('data-action');
        if (action === 'increase') {
          cart[index].quantity++;
        } else if (action === 'decrease') {
          cart[index].quantity--;
          if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
          }
        }
        updateCartUI();
      });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        cart.splice(index, 1);
        updateCartUI();
      });
    });
  }

  // Binary Search Function
  function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midVal = arr[mid].title;
      if (midVal === target) return mid;
      if (midVal < target) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  }

  // Product Search using Binary Search
  window.searchProducts = function () {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const productCards = Array.from(document.querySelectorAll(".col-4"));

    // Map and sort product titles
    const products = productCards.map(card => ({
      title: card.querySelector("h4").innerText.toLowerCase(),
      element: card
    })).sort((a, b) => a.title.localeCompare(b.title));

    const index = binarySearch(products, input);

    // Hide all first
    productCards.forEach(p => p.style.display = "none");

    if (index !== -1) {
      products[index].element.style.display = "block";
    } else {
      console.log("Product not found");
      // Optional: Show message or no results element
    }
  };
});

// Navigation section switcher
function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.display = section.id === id ? 'block' : 'none';
  });
}
const searchBar = document.getElementById("searchBar");
    const products = document.querySelectorAll(".product-card");
  
    searchBar.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      products.forEach(product => {
        const name = product.querySelector("h4").textContent.toLowerCase();
        if (name.includes(query)) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    });
alert("Welcome to my E-Commerce Website.....")
window.addEventListener("DOMContentLoaded", function () {
  const credit = document.createElement("div");
  credit.innerHTML = "Developed by <strong>Mukul Anand @2330155</strong>";
  credit.style.position = "fixed";
  credit.style.bottom = "10px";
  credit.style.right = "10px";
  credit.style.background = "#222";
  credit.style.color = "#fff";
  credit.style.padding = "6px 12px";
  credit.style.borderRadius = "8px";
  credit.style.fontSize = "12px";
  credit.style.opacity = "0.7";
  credit.style.zIndex = "9999";

  document.body.appendChild(credit);
});
