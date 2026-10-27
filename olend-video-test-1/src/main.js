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
const experience = document.querySelector(".experience");
const carousel = document.querySelector(".item-carousel");

video.addEventListener("loadedmetadata", () => {
  video.pause();
  video.currentTime = 0;
});

video.addEventListener("error", () => {
  console.error("Unable to load the background video.");
});

const segmentDuration = 2;
const playbackLimit = 10;
let nextSegmentStart = 0;
let isPlayingSegment = false;
let animationFrame = 0;
let activeDrag = null;

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

const playNextSegment = async () => {
  if (isPlayingSegment || nextSegmentStart >= playbackLimit) return;

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
    nextSegmentStart >= playbackLimit
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

  clearDrag();

  if (droppedBelowCarousel) {
    void playNextSegment();
  }
});

document.addEventListener("pointercancel", clearDrag);
