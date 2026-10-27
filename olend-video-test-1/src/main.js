import "./style.css";
import backgroundVideo from "./assets/test_kling4_1.mp4";
import logo from "./assets/Olend_logo_main.png";
import item001 from "./assets/items/item001.png";
import item002 from "./assets/items/item002.png";
import item003 from "./assets/items/item003.png";
import item004 from "./assets/items/item004.png";
import item005 from "./assets/items/item005.png";
import item006 from "./assets/items/item006.png";
import item007 from "./assets/items/item007.png";
import item008 from "./assets/items/item008.png";

const items = [
  item001,
  item002,
  item003,
  item004,
  item005,
  item006,
  item007,
  item008,
];

document.querySelector("#app").innerHTML = `
  <video class="background-video" aria-hidden="true" muted playsinline preload="auto">
    <source src="${backgroundVideo}" type="video/mp4" />
  </video>
  <main class="experience">
    <header class="brand">
      <img class="brand-logo" src="${logo}" alt="Olend" />
    </header>

    <section class="carousel-section" aria-label="Bag styles">
      <div class="item-carousel" aria-label="Scroll to explore bag styles">
        ${items
          .map(
            (item, index) => `
              <img
                class="item-image"
                src="${item}"
                alt="ONA SOFT BAG style ${index + 1}"
                draggable="false"
              />
            `,
          )
          .join("")}
      </div>
    </section>

    <div class="layout-spacer" aria-hidden="true"></div>

    <section class="product-details" aria-labelledby="product-name">
      <h1 id="product-name">ONA SOFT BAG</h1>
      <p class="product-price">CHF 90</p>
      <div class="product-actions">
        <button class="button button-secondary" type="button">Discover</button>
        <button class="button button-primary" type="button">Add to bag</button>
      </div>
    </section>
  </main>
`;

const video = document.querySelector(".background-video");

video.addEventListener("loadedmetadata", () => {
  video.pause();
  video.currentTime = 0;
});
