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
  { id: "item001", src: item001 },
  { id: "item002", src: item002 },
  { id: "item003", src: item003 },
  { id: "item004", src: item004 },
  { id: "item005", src: item005 },
  { id: "item006", src: item006 },
  { id: "item007", src: item007 },
  { id: "item008", src: item008 },
];

const DRAG_ITEM_SCALES = {
  item001: 0.9,
  item002: 0.9,
  item003: 1.6,
  item004: 2.4,
  item005: 1.5,
  item006: 1.2,
  item007: 0.6,
  item008: 2.4,
};

const ITEM_PLAY_DURATION = {
  item001: 0.4,
  item002: 0.6,
  item003: 1,
  item004: 3,
  item005: 1.5,
  item006: 1,
  item007: 0.5,
  item008: 2,
};

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
            ({ id, src }, index) => `
              <div class="item-tile" data-item-id="${id}">
                <img
                  class="item-image"
                  src="${src}"
                  alt="Ona Soft Bag style ${index + 1}"
                  draggable="false"
                  data-drag-scale="${DRAG_ITEM_SCALES[id]}"
                />
                <button
                  class="used-item-button"
                  type="button"
                  aria-label="Remove used mark from item ${index + 1} and rewind video"
                >
                  <img class="used-item-icon" src="${usedItemIcon}" alt="" />
                </button>
              </div>
            `,
          )
          .join("")}
      </div>
    </section>

    <div class="layout-spacer" aria-hidden="true"></div>
    <div class="dropdown-indicator">
      <p class="dropdown-indicator-text">Drag essentials into your bag</p>
    </div>

    <section class="product-details" aria-labelledby="product-name">
      <h1 id="product-name">Ona Soft Bag</h1>
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
const app = document.querySelector("#app");
const experience = document.querySelector(".experience");
const carousel = document.querySelector(".item-carousel");
const dropdownIndicator = document.querySelector(".dropdown-indicator");
let lastTouchTap = null;

const enterFullscreen = async () => {
  if (document.fullscreenElement) return;

  const fullscreenTarget = app.requestFullscreen
    ? app
    : document.documentElement;
  if (!fullscreenTarget.requestFullscreen) {
    console.error("Fullscreen mode is not supported by this browser.");
    return;
  }

  try {
    await fullscreenTarget.requestFullscreen();
  } catch (error) {
    console.error("Unable to enter fullscreen mode:", error);
  }
};

app.addEventListener("dblclick", () => {
  void enterFullscreen();
});

app.addEventListener("pointerup", (event) => {
  if (event.pointerType !== "touch" || activeDrag) return;

  const now = performance.now();
  const tap = { x: event.clientX, y: event.clientY, time: now };
  if (
    lastTouchTap &&
    now - lastTouchTap.time < 350 &&
    Math.hypot(tap.x - lastTouchTap.x, tap.y - lastTouchTap.y) < 40
  ) {
    lastTouchTap = null;
    void enterFullscreen();
    return;
  }

  lastTouchTap = tap;
});

video.addEventListener("loadedmetadata", () => {
  video.pause();
  video.currentTime = 0;
});

video.addEventListener("error", () => {
  console.error("Unable to load the background video.");
});

const playbackLimit = 10;
const REVERSE_FRAME_RATE = 25;
const USED_ITEM_OPACITY = 0.4;
let nextSegmentStart = 0;
let isPlayingSegment = false;
let animationFrame = 0;
let playbackRunId = 0;
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

const seekVideoTo = (time) =>
  new Promise((resolve, reject) => {
    const cleanup = () => {
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("error", handleError);
    };
    const handleSeeked = () => {
      cleanup();
      resolve();
    };
    const handleError = () => {
      cleanup();
      reject(new Error("The background video could not be decoded."));
    };

    video.addEventListener("seeked", handleSeeked, { once: true });
    video.addEventListener("error", handleError, { once: true });
    video.currentTime = time;

    if (!video.seeking) {
      cleanup();
      resolve();
    }
  });

const finishSegment = (endTime, runId) => {
  if (runId !== playbackRunId) return;

  cancelAnimationFrame(animationFrame);
  video.pause();
  video.currentTime = endTime;
  nextSegmentStart = endTime;
  isPlayingSegment = false;
  experience.classList.remove("is-playing");
};

const watchSegment = (endTime, runId) => {
  if (runId !== playbackRunId) return;

  if (video.currentTime >= endTime || video.ended) {
    finishSegment(endTime, runId);
    return;
  }

  animationFrame = requestAnimationFrame(() => watchSegment(endTime, runId));
};

const playNextSegment = async (image) => {
  if (
    isPlayingSegment ||
    nextSegmentStart >= playbackLimit ||
    usedItems.has(image)
  ) {
    return false;
  }

  const itemId = image.closest(".item-tile").dataset.itemId;
  const playDuration = ITEM_PLAY_DURATION[itemId];
  if (!Number.isFinite(playDuration) || playDuration <= 0) {
    console.error(`Missing a valid play duration for ${itemId}.`);
    return false;
  }

  usedItems.add(image);
  image.closest(".item-tile").classList.add("is-used");
  image.style.opacity = String(USED_ITEM_OPACITY);
  isPlayingSegment = true;
  experience.classList.add("is-playing");
  const runId = ++playbackRunId;

  try {
    await waitForVideoMetadata();
    if (runId !== playbackRunId) return false;

    const videoEnd = Math.min(video.duration, playbackLimit);
    const startTime = nextSegmentStart;
    const endTime = Math.min(startTime + playDuration, videoEnd);

    if (endTime - startTime < 0.001) {
      finishSegment(startTime, runId);
      return false;
    }

    video.currentTime = startTime;
    await video.play();
    if (runId !== playbackRunId) {
      video.pause();
      return false;
    }

    animationFrame = requestAnimationFrame(() => watchSegment(endTime, runId));
    return true;
  } catch (error) {
    if (runId !== playbackRunId) return false;

    cancelAnimationFrame(animationFrame);
    video.pause();
    isPlayingSegment = false;
    experience.classList.remove("is-playing");
    console.error("Unable to play the next video segment:", error);
    return false;
  }
};

const rewindPreviousSegment = async (playDuration) => {
  const runId = ++playbackRunId;
  cancelAnimationFrame(animationFrame);
  video.pause();
  isPlayingSegment = true;
  experience.classList.add("is-playing");

  try {
    await waitForVideoMetadata();
    if (runId !== playbackRunId) return;

    const startTime = Math.min(video.currentTime, playbackLimit);
    const endTime = Math.max(0, startTime - playDuration);
    if (startTime <= endTime) {
      finishSegment(endTime, runId);
      return;
    }

    const frameDuration = 1 / REVERSE_FRAME_RATE;
    const frameInterval = 1000 / REVERSE_FRAME_RATE;

    while (runId === playbackRunId && video.currentTime > endTime) {
      const frameStart = performance.now();
      const nextTime = Math.max(endTime, video.currentTime - frameDuration);
      await seekVideoTo(nextTime);
      if (runId !== playbackRunId) return;

      const remainingInterval =
        frameInterval - (performance.now() - frameStart);
      if (remainingInterval > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingInterval));
      }
    }

    finishSegment(endTime, runId);
  } catch (error) {
    if (runId !== playbackRunId) return;

    isPlayingSegment = false;
    experience.classList.remove("is-playing");
    console.error("Unable to rewind the background video:", error);
  }
};

carousel.addEventListener("click", (event) => {
  const resetButton = event.target.closest(".used-item-button");
  if (!resetButton) return;

  const tile = resetButton.closest(".item-tile");
  const image = tile.querySelector(".item-image");
  if (!usedItems.has(image)) return;

  const itemId = tile.dataset.itemId;
  const playDuration = ITEM_PLAY_DURATION[itemId];
  if (!Number.isFinite(playDuration) || playDuration <= 0) {
    console.error(`Missing a valid play duration for ${itemId}.`);
    return;
  }

  usedItems.delete(image);
  tile.classList.remove("is-used");
  image.style.removeProperty("opacity");
  void rewindPreviousSegment(playDuration);
});

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
  const scale = Number(image.dataset.dragScale);

  preview.classList.add("drag-preview");
  preview.style.width = `${bounds.width * scale}px`;
  preview.style.height = `${bounds.height * scale}px`;
  preview.style.left = `${x - (bounds.width * scale) / 2}px`;
  preview.style.top = `${y - (bounds.height * scale) / 2}px`;
  app.append(preview);
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
    void playNextSegment(droppedImage).then((didPlay) => {
      if (didPlay) {
        dropdownIndicator.classList.add("is-hidden");
      }
    });
  }
});

document.addEventListener("pointercancel", clearDrag);
