import "./style.css";
import onaBackgroundVideo from "./assets/ona_2.mp4";
import dumplingBackgroundVideo from "./assets/dumpling_3.mp4";
import logo from "./assets/Olend_logo_main.png";
import shoppingBagIcon from "./assets/icons/Shopping-bag.svg";
import usedItemIcon from "./assets/icons/Cross.svg";
import recommendBigIcon from ".assets/icons/B_bag.svg";
import recommendSmallIcon from ".assets/icons/S_bag.svg";
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

const ONA_ITEM_PLAY_DURATION = {
  item001: 0.4,
  item002: 0.6,
  item003: 1,
  item004: 3,
  item005: 1.5,
  item006: 1,
  item007: 0.5,
  item008: 2,
};

const DUMPLING_ITEM_PLAY_DURATION = {
  item001: 0.6,
  item002: 0.7,
  item003: null,
  item004: null,
  item005: 2,
  item006: 2,
  item007: 0.7,
  item008: 3,
};

const ITEM_NAMES = {
  item001: "Pencil",
  item002: "Keychain",
  item003: "Headphone",
  item004: "Laptop",
  item005: "Bottle",
  item006: "Phone",
  item007: "Lipstick",
  item008: "Notebook",
};

const app = document.querySelector("#app");
const isDumplingPage = app.dataset.product === "dumpling";
const productName = isDumplingPage ? "Dumpling Bag" : "Ona Soft Bag";
const ITEM_PLAY_DURATION = isDumplingPage
  ? DUMPLING_ITEM_PLAY_DURATION
  : ONA_ITEM_PLAY_DURATION;
const playbackLimit = isDumplingPage ? 5 : 10;
const backgroundVideo = isDumplingPage
  ? dumplingBackgroundVideo
  : onaBackgroundVideo;

app.innerHTML = `
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
                  alt="${isDumplingPage ? ITEM_NAMES[id] : `${productName} style ${index + 1}`}"
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
      <h1 id="product-name">${productName}</h1>
      <p class="product-price">CHF 90</p>
      <div class="product-actions">
        <button class="button button-primary add-to-bag-button" type="button">
          <img class="button-icon" src="${shoppingBagIcon}" alt="" aria-hidden="true" />
          Add to bag
        </button>
      </div>
    </section>
  </main>
  <dialog class="recommendation-dialog" aria-labelledby="recommendation-title">
    <div class="recommendation-heading">
      <svg class="recommendation-icon" viewBox="0 0 40 48" fill="none" aria-hidden="true">
        <path d="M10 15h20l3.2 25.1a4 4 0 0 1-4 4.5H10.8a4 4 0 0 1-4-4.5L10 15Z" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>
        <path d="M14 16V11a6 6 0 0 1 12 0v5M20 24v8M20 37h.02" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>
      </svg>
      <h2 id="recommendation-title">Your bag’s a bit roomy.<br />These might be a better fit.</h2>
    </div>
    <div class="recommendation-products">
      <article class="recommendation-product">
        <div class="recommendation-image">
          <svg viewBox="0 0 300 210" role="img" aria-label="Illustration of a black Micro Ona Soft Bag">
            <path d="M115 153C125 95 120 18 153 13c37-6 28 99 42 140" fill="none" stroke="#252525" stroke-width="8" stroke-linecap="round"/>
            <path d="M115 153c-6 7-11 13-16 18m96-18 12 18" fill="none" stroke="#252525" stroke-width="5" stroke-linecap="round"/>
            <path d="m105 159 10 5 4 24-9 5-11-8 3-17 3-9Zm90 0-10 5-4 24 9 5 11-8-3-17-3-9Z" fill="#252525"/>
            <path d="m111 167 78-1 8 28-14 8-65-1-15-9 8-25Z" fill="#292929" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
            <path d="M136 169c2-13 9-21 17-21s15 8 17 21" fill="none" stroke="#242424" stroke-width="7" stroke-linecap="round"/>
            <path d="m118 176 63-1m-59 8 56-1m-49 8 42-1" stroke="#464646" stroke-width="1.5"/>
          </svg>
        </div>
        <h3>Micro Ona Soft Bag</h3>
        <p>CHF 83</p>
      </article>
      <article class="recommendation-product">
        <div class="recommendation-image">
          <svg viewBox="0 0 300 210" role="img" aria-label="Illustration of a red Brooklyn Bag">
            <path d="M118 152c12-37 12-135 35-137 24-2 22 101 38 139" fill="none" stroke="#9e2939" stroke-width="7" stroke-linecap="round"/>
            <path d="m119 151-18 48m88-48 18 48" fill="none" stroke="#9e2939" stroke-width="5" stroke-linecap="round"/>
            <path d="M115 158c13 2 17 9 24 4 7-5 10-10 16-8 8 3 10 8 18 7 8-1 11-6 18-4l8 7-8 28c-24 13-58 13-82-1l-4-24 10-9Z" fill="#a52b3c" stroke="#82202f" stroke-width="3" stroke-linejoin="round"/>
            <path d="M122 163c5 11 10 16 16 19m6-22c0 11 4 18 10 23m9-23c-2 11-1 18 4 24m10-26c2 10 6 15 11 19" fill="none" stroke="#d16b77" stroke-width="2" stroke-linecap="round"/>
            <path d="m114 166-10 4 10 7m82-10 10 4-10 7" fill="none" stroke="#82202f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>Brooklyn Bag</h3>
        <p>CHF 125</p>
      </article>
    </div>
    <button class="recommendation-explore" type="button">Explore more</button>
  </dialog>
`;

const video = document.querySelector(".background-video");
const experience = document.querySelector(".experience");
const carousel = document.querySelector(".item-carousel");
const dropdownIndicator = document.querySelector(".dropdown-indicator");
const recommendationDialog = document.querySelector(".recommendation-dialog");
const addToBagButton = document.querySelector(".add-to-bag-button");
const exploreMoreButton = document.querySelector(".recommendation-explore");
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

const REVERSE_FRAME_RATE = 25;
const USED_ITEM_OPACITY = 0.4;
const RECOMMENDATION_PLAY_DURATION_LIMIT = 1.7;
let nextSegmentStart = 0;
let isPlayingSegment = false;
let animationFrame = 0;
let playbackRunId = 0;
let activeDrag = null;
const usedItems = new WeakSet();
const playedItemDurations = new WeakMap();

addToBagButton.addEventListener("click", () => {
  if (isDumplingPage) return;

  const usedPlayDuration = [
    ...carousel.querySelectorAll(".item-tile.is-used"),
  ].reduce((total, tile) => {
    const duration = ITEM_PLAY_DURATION[tile.dataset.itemId];
    return Number.isFinite(duration) ? total + duration : total;
  }, 0);

  if (usedPlayDuration < RECOMMENDATION_PLAY_DURATION_LIMIT) {
    recommendationDialog.showModal();
  }
});

const showRecommendation = () => {
  if (!recommendationDialog.open) {
    recommendationDialog.showModal();
  }
};

exploreMoreButton.addEventListener("click", () => {
  recommendationDialog.close();
});

recommendationDialog.addEventListener("click", (event) => {
  if (event.target === recommendationDialog) {
    recommendationDialog.close();
  }
});

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

const finishSegment = (endTime, runId, showRecommendationAfter = false) => {
  if (runId !== playbackRunId) return;

  cancelAnimationFrame(animationFrame);
  video.pause();
  video.currentTime = endTime;
  nextSegmentStart = endTime;
  isPlayingSegment = false;
  experience.classList.remove("is-playing");
  if (showRecommendationAfter) {
    showRecommendation();
  }
};

const watchSegment = (endTime, runId, showRecommendationAfter) => {
  if (runId !== playbackRunId) return;

  if (video.currentTime >= endTime || video.ended) {
    finishSegment(endTime, runId, showRecommendationAfter);
    return;
  }

  animationFrame = requestAnimationFrame(() =>
    watchSegment(endTime, runId, showRecommendationAfter),
  );
};

const playNextSegment = async (image) => {
  if (
    isPlayingSegment ||
    (nextSegmentStart >= playbackLimit && !isDumplingPage) ||
    usedItems.has(image)
  ) {
    return false;
  }

  const itemId = image.closest(".item-tile").dataset.itemId;
  const playDuration = ITEM_PLAY_DURATION[itemId];
  if (isDumplingPage && playDuration === null) {
    showRecommendation();
    return false;
  }
  if (!Number.isFinite(playDuration) || playDuration <= 0) {
    console.error(`Missing a valid play duration for ${itemId}.`);
    return false;
  }

  if (nextSegmentStart >= playbackLimit) {
    showRecommendation();
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
    const showRecommendationAfter =
      isDumplingPage && startTime + playDuration > playbackLimit;

    if (endTime - startTime < 0.001) {
      finishSegment(startTime, runId, showRecommendationAfter);
      return false;
    }

    playedItemDurations.set(image, endTime - startTime);
    video.currentTime = startTime;
    await video.play();
    if (runId !== playbackRunId) {
      video.pause();
      return false;
    }

    animationFrame = requestAnimationFrame(() =>
      watchSegment(endTime, runId, showRecommendationAfter),
    );
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
  const configuredDuration = ITEM_PLAY_DURATION[itemId];
  if (!Number.isFinite(configuredDuration) || configuredDuration <= 0) {
    console.error(`Missing a valid play duration for ${itemId}.`);
    return;
  }

  const playDuration = playedItemDurations.get(image) ?? configuredDuration;
  usedItems.delete(image);
  playedItemDurations.delete(image);
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
    (nextSegmentStart >= playbackLimit && !isDumplingPage) ||
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
