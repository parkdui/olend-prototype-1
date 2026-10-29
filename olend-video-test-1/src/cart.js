import "./style.css";
import "./frame.js";
import hamburgerIcon from "./assets/icons/Top_hamburger_menu.svg";
import logo from "./assets/Olend_logo_main.png";
import searchIcon from "./assets/icons/Top_search.svg";
import cartIcon from "./assets/icons/Top_cart.svg";
import onaImage from "./assets/listed_imgs/Ona-Cobalt_99e79005-90c0-46fb-9fac-89b0fa4768a6.jpg.webp";
import confetti from "canvas-confetti";

const app = document.querySelector("#app");

app.innerHTML = `
  <header class="brand catalog-header">
    <img class="top-button-icon" src="${hamburgerIcon}" alt="" aria-hidden="true" />
    <img class="brand-logo" src="${logo}" alt="Olend" />
    <div class="right-icons">
      <img class="top-button-icon" src="${searchIcon}" alt="" aria-hidden="true" />
      <img class="top-button-icon" src="${cartIcon}" alt="" aria-hidden="true" />
    </div>
  </header>
  <main class="cart-content" aria-labelledby="cart-title">
    <h1 id="cart-title" class="cart-title" aria-live="polite">Shopping Cart</h1>
    <section class="cart-item" aria-label="Cart item">
      <img class="cart-item-image" src="${onaImage}" alt="Ona Soft Bag in cobalt blue" />
      <h2 class="cart-item-name">Ona Soft Bag</h2>
      <p class="cart-item-color">Cobalt blue</p>
      <p class="cart-item-price">CHF 90</p>
      <div class="quantity-control" aria-label="Quantity">
        <button class="quantity-button" type="button" data-quantity-change="-1" aria-label="Decrease quantity">−</button>
        <output class="quantity-value" aria-live="polite">1</output>
        <button class="quantity-button" type="button" data-quantity-change="1" aria-label="Increase quantity">+</button>
      </div>
    </section>
  </main>
  <footer class="cart-actions">
    <button class="cart-action cart-action-primary" type="button">Checkout</button>
    <div class="cart-summary" aria-label="Order summary" hidden>
      <div class="cart-summary-row">
        <span>Delivery Fee</span>
        <span>CHF 6.9</span>
      </div>
      <div class="cart-summary-row">
        <span>Subtotal</span>
        <span data-cart-subtotal>CHF 90</span>
      </div>
    </div>
    <a class="cart-action cart-action-secondary" href="./list.html">Continue Shopping</a>
  </footer>
`;

let quantity = 1;
let purchased = false;
const quantityOutput = app.querySelector(".quantity-value");
const cartTitle = app.querySelector("#cart-title");
const quantityControl = app.querySelector(".quantity-control");
const checkoutButton = app.querySelector(".cart-action-primary");
const cartSummary = app.querySelector(".cart-summary");

app.querySelectorAll("[data-quantity-change]").forEach((button) => {
  button.addEventListener("click", () => {
    if (purchased) return;
    quantity = Math.max(1, quantity + Number(button.dataset.quantityChange));
    quantityOutput.value = String(quantity);
    quantityOutput.textContent = String(quantity);
  });
});

checkoutButton.addEventListener("click", () => {
  if (purchased) return;
  purchased = true;

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });

  cartTitle.textContent = "Successfully Purchased";
  quantityControl.hidden = true;
  checkoutButton.hidden = true;
  app.querySelector("[data-cart-subtotal]").textContent = `CHF ${90 * quantity}`;
  cartSummary.hidden = false;
});
