import "./style.css";
import backgroundVideo from "./assets/test_kling4_1.mp4";
import logo from "./assets/Olend_logo_main.png";
import shoppingBagIcon from "./assets/icons/Shopping-bag.svg";
import usedItemIcon from "./assets/icons/Cross.svg";
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
              <div class="item-tile">
                <img
                  class="item-image"
                  src="${item}"
                  alt="ONA SOFT BAG style ${index + 1}"
                  draggable="false"
                />
                <img class="used-item-icon" src="${usedItemIcon}" alt="Already used" />
              </div>
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
        <button class="button button-primary" type="button">
          <img class="button-icon" src="${shoppingBagIcon}" alt="" aria-hidden="true" />
          Add to bag
        </button>
      </div>
    </section>
  </main>
`;

const video = document.querySelector(".background-video");
const experience = document.querySelector(".experience");
const carousel = document.querySelector(".item-carousel");

video.addEventListener("loadedmetadata", () => {
  video.pause();
  video.currentTime = 0;
});

video.addEventListener("error", () => {
  console.error("Unable to load the background video.");
});

const segmentDuration = 1;
const playbackLimit = 10;
const USED_ITEM_OPACITY = 0.4;
let nextSegmentStart = 0;
let isPlayingSegment = false;
let animationFrame = 0;
let activeDrag = null;
const usedItems = new WeakSet();

const waitForVideoMetadata = () => {
  if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("error", handleError);
    };
    const handleLoaded = () => {
      cleanup();
      resolve();
    };
    const handleError = () => {
      cleanup();
      reject(new Error("The background video could not be loaded."));
    };

    video.addEventListener("loadedmetadata", handleLoaded, { once: true });
    video.addEventListener("error", handleError, { once: true });
  });
};

const finishSegment = (endTime) => {
  cancelAnimationFrame(animationFrame);
  video.pause();
  video.currentTime = endTime;
  nextSegmentStart = endTime;
  isPlayingSegment = false;
  experience.classList.remove("is-playing");
};

const watchSegment = (endTime) => {
  if (video.currentTime >= endTime || video.ended) {
    finishSegment(endTime);
    return;
  }

  animationFrame = requestAnimationFrame(() => watchSegment(endTime));
};

const playNextSegment = async (image) => {
  if (
    isPlayingSegment ||
    nextSegmentStart >= playbackLimit ||
    usedItems.has(image)
  ) {
    return;
  }

  usedItems.add(image);
  image.closest(".item-tile").classList.add("is-used");
  image.style.opacity = String(USED_ITEM_OPACITY);
  isPlayingSegment = true;
  experience.classList.add("is-playing");

  try {
    await waitForVideoMetadata();

    const videoEnd = Math.min(video.duration, playbackLimit);
    const startTime = nextSegmentStart;
    const endTime = Math.min(startTime + segmentDuration, videoEnd);

    if (startTime >= endTime) {
      isPlayingSegment = false;
      experience.classList.remove("is-playing");
      return;
    }

    video.currentTime = startTime;
    await video.play();
    animationFrame = requestAnimationFrame(() => watchSegment(endTime));
  } catch (error) {
    cancelAnimationFrame(animationFrame);
    video.pause();
    isPlayingSegment = false;
    experience.classList.remove("is-playing");
    console.error("Unable to play the next video segment:", error);
  }
};

const clearDrag = () => {
  if (!activeDrag) return;

  activeDrag.preview?.remove();
  activeDrag.image.classList.remove("is-dragging");
  activeDrag = null;
  experience.classList.remove("is-drop-target");
};

const createPreview = (image, x, y) => {
  const bounds = image.getBoundingClientRect();
  const preview = image.cloneNode();

  preview.classList.add("drag-preview");
  preview.style.left = `${x - bounds.width / 2}px`;
  preview.style.top = `${y - bounds.height / 2}px`;
  document.body.append(preview);
  return preview;
};

carousel.addEventListener("pointerdown", (event) => {
  const image = event.target.closest(".item-image");
  if (
    !image ||
    event.button !== 0 ||
    isPlayingSegment ||
    nextSegmentStart >= playbackLimit ||
    usedItems.has(image)
  ) {
    return;
  }

  activeDrag = {
    image,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    preview: null,
  };
});

document.addEventListener("pointermove", (event) => {
  if (!activeDrag || activeDrag.pointerId !== event.pointerId) return;

  const deltaX = event.clientX - activeDrag.startX;
  const deltaY = event.clientY - activeDrag.startY;
  if (!activeDrag.preview) {
    if (Math.hypot(deltaX, deltaY) < 8) return;
    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
      clearDrag();
      return;
    }

    activeDrag.preview = createPreview(
      activeDrag.image,
      event.clientX,
      event.clientY,
    );
    activeDrag.image.classList.add("is-dragging");
  }

  activeDrag.preview.style.left = `${event.clientX - activeDrag.preview.offsetWidth / 2}px`;
  activeDrag.preview.style.top = `${event.clientY - activeDrag.preview.offsetHeight / 2}px`;

  const carouselBounds = carousel.getBoundingClientRect();
  const experienceBounds = experience.getBoundingClientRect();
  const isBelowCarousel =
    event.clientX >= experienceBounds.left &&
    event.clientX <= experienceBounds.right &&
    event.clientY > carouselBounds.bottom &&
    event.clientY <= experienceBounds.bottom;
  experience.classList.toggle("is-drop-target", isBelowCarousel);
});

document.addEventListener("pointerup", (event) => {
  if (!activeDrag || activeDrag.pointerId !== event.pointerId) return;

  const carouselBounds = carousel.getBoundingClientRect();
  const experienceBounds = experience.getBoundingClientRect();
  const droppedBelowCarousel =
    Boolean(activeDrag.preview) &&
    event.clientX >= experienceBounds.left &&
    event.clientX <= experienceBounds.right &&
    event.clientY > carouselBounds.bottom &&
    event.clientY <= experienceBounds.bottom;
  const droppedImage = activeDrag.image;

  clearDrag();

  if (droppedBelowCarousel) {
    void playNextSegment(droppedImage);
  }
});

document.addEventListener("pointercancel", clearDrag);
