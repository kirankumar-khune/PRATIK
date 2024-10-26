// Product data
const products = [
  { id: 1, name: "Product 1", price: 10.99, image: "product1.jpg" },
  { id: 2, name: "Product 2", price: 9.99, image: "product2.jpg" },
  // Add more products here
];

// Cart functionality
let cart = [];

// Initialize cart list and total price
document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.getElementById("cart-list");
  const totalPriceElement = document.getElementById("total-price");

  // Update cart list and total price
  function updateCart() {
      cartList.innerHTML = ""; // Clear the current cart list
      let totalPrice = 0;

      cart.forEach(({ name, quantity, price }) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${name} x ${quantity} = $${(price * quantity).toFixed(2)}`;
          cartList.appendChild(listItem);
          totalPrice += price * quantity;
      });

      totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  // Add event listeners to add-to-cart buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
          const productId = parseInt(e.target.dataset.productId); // Get product ID as an integer
          const product = products.find((p) => p.id === productId); // Find product by ID

          if (product) {
              const existingItem = cart.find((item) => item.id === productId);

              if (existingItem) {
                  existingItem.quantity++; // Increment quantity if already in cart
              } else {
                  cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
              }

              updateCart(); // Update the cart display
          }
      });
  });

  // Checkout functionality
  document.getElementById("checkout-btn").addEventListener("click", () => {
      const email = "pratikfoods78@gmail.com";
      const subject = "New Order";
      const body = cart.map(({ name, quantity }) => `${name} x ${quantity}`).join("\n");

      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});