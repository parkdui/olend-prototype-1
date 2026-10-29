import "./style.css";
import "./frame.js";
import hamburgerIcon from "./assets/icons/Top_hamburger_menu.svg";
import logo from "./assets/Olend_logo_main.png";
import searchIcon from "./assets/icons/Top_search.svg";
import cartIcon from "./assets/icons/Top_cart.svg";
import onaImage from "./assets/listed_imgs/Ona-Cobalt_99e79005-90c0-46fb-9fac-89b0fa4768a6.jpg.webp";
import brooklynImage from "./assets/listed_imgs/Olend_ecommerce_07_black.jpg.webp";
import dumplingImage from "./assets/listed_imgs/Olendecommerce14 copy.jpg.webp";
import queridaImage from "./assets/listed_imgs/QueridaBlack.jpg.webp";
import cherryImage from "./assets/listed_imgs/Olendecommerce03_0c73ee01-7222-4048-9822-52be32e9d28e.jpg.webp";
import nicoImage from "./assets/listed_imgs/Nico_Chocolate_50d17c0e-220b-4a4a-a267-5d53912bcab6.jpg.webp";

const products = [
  {
    name: "Ona Soft Bag",
    price: "CHF 96",
    image: onaImage,
    href: "./index.html",
  },
  { name: "Brooklyn Bag", price: "CHF 96", image: brooklynImage },
  {
    name: "Dumpling Bag",
    price: "CHF 96",
    image: dumplingImage,
    href: "./dumpling.html",
  },
  { name: "Querida Soft Bag", price: "CHF 96", image: queridaImage },
  { name: "Ona Bag", price: "CHF 96", image: cherryImage },
  { name: "Nico Bag", price: "CHF 96", image: nicoImage },
];

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
  <main class="catalog-grid catalog-content" aria-label="Bag collection">
    ${products
      .map(
        ({ name, price, image, href }) => `
          <article class="catalog-card">
            ${href ? `<a class="catalog-card-link" href="${href}">` : ""}
              <img class="catalog-card-image" src="${image}" alt="${name}" />
              <h2 class="catalog-card-name">${name}</h2>
              <p class="catalog-card-price">${price}</p>
            ${href ? "</a>" : ""}
          </article>
        `,
      )
      .join("")}
  </main>
`;
