import "./style.css";
import "./frame.js";
import onaBackgroundVideo from "./assets/ona_3.mp4";
import dumplingBackgroundVideo from "./assets/dumpling_3.mp4";
import hamburgerIcon from "./assets/icons/Top_hamburger_menu.svg";
import logo from "./assets/Olend_logo_main.png";
import searchIcon from "./assets/icons/Top_search.svg";
import cartIcon from "./assets/icons/Top_cart.svg";
import shoppingBagIcon from "./assets/icons/Shopping-bag.svg";
import usedItemIcon from "./assets/icons/Cross.svg";
import recommendBigIcon from "./assets/icons/B_bag.svg";
import recommendSmallIcon from "./assets/icons/S_bag.svg";
import smallDumplingImage from "./assets/popup-imgs/s_dumpling_bag.png";
import smallMicroOnaImage from "./assets/popup-imgs/s_micro_ona_soft_bag.png";
import largeBrooklynImage from "./assets/popup-imgs/b_brooklyn_bag.png";
import largeOnaImage from "./assets/popup-imgs/b_ona_soft_bag.png";
import onaPoster from "./assets/listed_imgs/Ona-Cobalt_99e79005-90c0-46fb-9fac-89b0fa4768a6.jpg.webp";
import dumplingPoster from "./assets/listed_imgs/Olendecommerce14 copy.jpg.webp";
import explodingWarningText from "./assets/exploding_warning_txt.svg";
import item001 from "./assets/items/item001.png";
import item002 from "./assets/items/item002.png";
import item003 from "./assets/items/item003.png";
import item004 from "./assets/items/item004.png";
import item005 from "./assets/items/item005.png";
import item006 from "./assets/items/item006.png";
import item007 from "./assets/items/item007.png";
import item008 from "./assets/items/item008.png";
import item009 from "./assets/items/item009.png";
import item010 from "./assets/items/item010.png";
import item011 from "./assets/items/item011.png";
import item012 from "./assets/items/item012.png";
import item013 from "./assets/items/item013.png";
import item014 from "./assets/items/item014.png";
import item015 from "./assets/items/item015.png";
import item016 from "./assets/items/item016.png";
import item017 from "./assets/items/item017.png";

const items = [
  { id: "item001", src: item001 },
  { id: "item002", src: item002 },
  { id: "item003", src: item003 },
  { id: "item004", src: item004 },
  { id: "item005", src: item005 },
  { id: "item006", src: item006 },
  { id: "item007", src: item007 },
  { id: "item008", src: item008 },
  { id: "item009", src: item009 },
  { id: "item010", src: item010 },
  { id: "item011", src: item011 },
  { id: "item012", src: item012 },
  { id: "item013", src: item013 },
  { id: "item014", src: item014 },
  { id: "item015", src: item015 },
  { id: "item016", src: item016 },
  { id: "item017", src: item017 },
];

const DRAG_ITEM_SCALES = {
  item001: 1,
  item002: 1,
  item003: 2,
  item004: 2.8,
  item005: 1.8,
  item006: 1.5,
  item007: 0.8,
  item008: 2.8,
  item009: 2,
  item010: 1.8,
  item011: 2,
  item012: 2,
  item013: 1,
  item014: 2.4,
  item015: 1.8,
  item016: 1,
  item017: 2.4,
};

const ONA_ITEM_PLAY_DURATION = {
  item001: 0.1,
  item002: 0.1,
  item003: 1,
  item004: 3,
  item005: 1.5,
  item006: 1,
  item007: 0.2,
  item008: 2,
  item009: 0.5,
  item010: 0.5,
  item011: 0.5,
  item012: 1,
  item013: 0.1,
  item014: 0.6,
  item015: 0.4,
  item016: 0.1,
  item017: 0.8,
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
  item009: 0.8,
  item010: 0.8,
  item011: 0.6,
  item012: 3,
  item013: 0.3,
  item014: 1,
  item015: 0.5,
  item016: 0.1,
  item017: 2,
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
  item009: "Power adapter",
  item010: "Coffee cup",
  item011: "Cap",
  item012: "Milk",
  item013: "Cigarettes",
  item014: "Umbrella",
  item015: "Sunglasses",
  item016: "Candy",
  item017: "Lunch box",
};

const app = document.querySelector("#app");
const isDumplingPage = app.dataset.product === "dumpling";
const productName = isDumplingPage ? "Dumpling Bag" : "Ona Soft Bag";
const productPrice = isDumplingPage ? 96 : 90;
const recommendationImages = isDumplingPage
  ? [largeOnaImage, largeBrooklynImage]
  : [smallMicroOnaImage, smallDumplingImage];
const recommendationCopy = isDumplingPage
  ? {
      heading: "Not enough room for your item.",
      subheading: "These might fit better.",
      firstProductName: "Ona Soft Bag",
      firstProductPrice: "CHF 102",
      secondProductName: "Brooklyn Bag",
      secondProductPrice: "CHF 125",
    }
  : {
      heading: "Your bag’s a bit roomy.",
      subheading: "These might be a better fit.",
      firstProductName: "Micro Ona Soft Bag",
      firstProductPrice: "CHF 83",
      secondProductName: "Dumpling Bag",
      secondProductPrice: "CHF 125",
    };
const ITEM_PLAY_DURATION = isDumplingPage
  ? DUMPLING_ITEM_PLAY_DURATION
  : ONA_ITEM_PLAY_DURATION;
const playbackLimit = isDumplingPage ? 5 : 10;
const backgroundVideo = isDumplingPage
  ? dumplingBackgroundVideo
  : onaBackgroundVideo;
const backgroundVideoPoster = isDumplingPage ? dumplingPoster : onaPoster;

app.innerHTML = `
  <video class="background-video" aria-hidden="true" muted playsinline webkit-playsinline preload="auto" poster="${backgroundVideoPoster}">
    <source src="${backgroundVideo}" type="video/mp4" />
  </video>
  <main class="experience">
    <header class="brand">
      <img class="top-button-icon" src="${hamburgerIcon}" alt="" aria-hidden="true" />
      <img class="brand-logo" src="${logo}" alt="Olend" />
      <div class="right-icons">
        <img class="top-button-icon" src="${searchIcon}" alt="" aria-hidden="true" />
        <img class="top-button-icon" src="${cartIcon}" alt="" aria-hidden="true" />
      </div>
    </header>

    <section class="video-progress" aria-label="Video progress">
      <div
        class="video-progress-track"
        role="progressbar"
        aria-label="Background video progress"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="0"
        aria-valuetext="0%"
      >
        <div class="video-progress-fill"></div>
      </div>
      <div class="video-progress-labels">
        <span class="video-progress-empty">Empty</span>
        <span class="video-progress-value">0%</span>
      </div>
    </section>

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
      <div class="product-price">
        <p class="product-price-chf">CHF</p>
        <p class="product-price-amount">${productPrice}</p>
      </div>
      <div class="product-actions">
        <button class="button button-primary add-to-bag-button" type="button">
          ADD TO CART
        </button>
      </div>
    </section>
  </main>
  <dialog class="recommendation-dialog" aria-labelledby="recommendation-title">
    <div class="recommendation-heading">
      <img
        class="recommendation-icon"
        src="${isDumplingPage ? recommendSmallIcon : recommendBigIcon}"
        alt=""
        aria-hidden="true"
      />
      <h2 id="recommendation-title" tabindex="-1">${recommendationCopy.heading}<br />${recommendationCopy.subheading}</h2>
    </div>
    <div class="recommendation-products">
      ${isDumplingPage ? '<a class="recommendation-product-link" href="./ona.html">' : ""}
      <article class="recommendation-product">
        <div class="recommendation-image">
          <img
            src="${recommendationImages[0]}"
            alt="${recommendationCopy.firstProductName}"
          />
        </div>
        <h3>${recommendationCopy.firstProductName}</h3>
        <p>${recommendationCopy.firstProductPrice}</p>
      </article>
      ${isDumplingPage ? "</a>" : ""}
      ${isDumplingPage ? "" : '<a class="recommendation-product-link" href="./dumpling.html">'}
      <article class="recommendation-product">
        <div class="recommendation-image">
          <img
            src="${recommendationImages[1]}"
            alt="${recommendationCopy.secondProductName}"
          />
        </div>
        <h3>${recommendationCopy.secondProductName}</h3>
        <p>${recommendationCopy.secondProductPrice}</p>
      </article>
      ${isDumplingPage ? "" : "</a>"}
    </div>
    <button class="recommendation-explore" type="button">EXPLORE MORE</button>
  </dialog>
  <dialog class="exploding-warning-dialog" aria-label="Playback warning">
    <button
      class="exploding-warning-close"
      type="button"
      aria-label="Close playback warning"
    >
      <img src="${usedItemIcon}" alt="" aria-hidden="true" />
    </button>
    <img
      class="exploding-warning-text"
      src="${explodingWarningText}"
      alt="Your bag is exploding!"
    />
  </dialog>
`;

const video = document.querySelector(".background-video");
const progressTrack = document.querySelector(".video-progress-track");
const progressFill = document.querySelector(".video-progress-fill");
const progressValue = document.querySelector(".video-progress-value");
const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
if (isDumplingPage && !isIOS) {
  video.style.viewTransitionName = "dumpling-bag";
}
if (isIOS) {
  video.autoplay = true;
  video.addEventListener(
    "loadeddata",
    () => {
      if (!isPlayingSegment) video.pause();
    },
    { once: true },
  );
}

const updateVideoProgress = () => {
  const progress = Math.min(
    100,
    Math.max(0, (video.currentTime / playbackLimit) * 100),
  );
  const roundedProgress = Math.round(progress);
  progressFill.style.width = `${progress}%`;
  progressValue.style.setProperty("--progress-position", `${progress}%`);
  progressValue.textContent = `${roundedProgress}%`;
  progressTrack.setAttribute("aria-valuenow", String(roundedProgress));
  progressTrack.setAttribute("aria-valuetext", `${roundedProgress}%`);
};

video.addEventListener("timeupdate", updateVideoProgress);
video.addEventListener("seeked", updateVideoProgress);
video.addEventListener("loadedmetadata", updateVideoProgress);
updateVideoProgress();

const experience = document.querySelector(".experience");
const carousel = document.querySelector(".item-carousel");
const dropdownIndicator = document.querySelector(".dropdown-indicator");
const recommendationDialog = document.querySelector(".recommendation-dialog");
const explodingWarningDialog = document.querySelector(
  ".exploding-warning-dialog",
);
const addToBagButton = document.querySelector(".add-to-bag-button");
const exploreMoreButton = document.querySelector(".recommendation-explore");
const explodingWarningCloseButton = document.querySelector(
  ".exploding-warning-close",
);

video.addEventListener("loadedmetadata", () => {
  const videoDuration = Number.isFinite(video.duration)
    ? video.duration
    : nextSegmentStart;
  video.currentTime = Math.min(nextSegmentStart, videoDuration, playbackLimit);
});

video.addEventListener("error", () => {
  console.error("Unable to load the background video.");
});

const REVERSE_FRAME_RATE = 12;
const USED_ITEM_OPACITY = 0.4;
const FAST_PLAYBACK_MIN_DURATION = 1;
const FAST_PLAYBACK_RATE = 5;
const VIDEO_SEEK_TOLERANCE = 0.02;
const USED_ITEMS_STORAGE_KEY = "olend-used-items";
const RECOMMENDED_ITEMS_STORAGE_KEY = "olend-recommended-items";
const CART_VIDEO_TIME_STORAGE_KEY = "olend-cart-video-time";
let nextSegmentStart = 0;
let isPlayingSegment = false;
let animationFrame = 0;
let playbackRunId = 0;
let activeDrag = null;
const usedItems = new WeakSet();
const playedItemDurations = new WeakMap();
let usedItemOrder = [];

const setUsedItemButtonsDisabled = (disabled) => {
  carousel.querySelectorAll(".used-item-button").forEach((button) => {
    button.disabled = disabled;
  });
};

const syncUsedItemButtons = () => {
  setUsedItemButtonsDisabled(isPlayingSegment);
};

recommendationDialog.addEventListener("close", syncUsedItemButtons);
explodingWarningDialog.addEventListener("close", syncUsedItemButtons);

const saveUsedItems = () => {
  const savedItems = usedItemOrder.flatMap((itemId) => {
    const tile = [...carousel.querySelectorAll(".item-tile")].find(
      (candidate) => candidate.dataset.itemId === itemId,
    );
    if (!tile?.classList.contains("is-used")) return [];

    const image = tile.querySelector(".item-image");
    return [
      {
        id: itemId,
        duration: playedItemDurations.get(image) ?? ITEM_PLAY_DURATION[itemId],
      },
    ];
  });

  try {
    sessionStorage.setItem(USED_ITEMS_STORAGE_KEY, JSON.stringify(savedItems));
  } catch (error) {
    console.error("Unable to save used items for page navigation:", error);
  }
};

const restoreUsedItems = () => {
  let savedItems;
  try {
    const serializedItems = sessionStorage.getItem(USED_ITEMS_STORAGE_KEY);
    savedItems = serializedItems ? JSON.parse(serializedItems) : [];
  } catch (error) {
    console.error("Unable to restore used items from page navigation:", error);
    return;
  }

  if (!Array.isArray(savedItems)) {
    console.error("Saved used items must be an array.");
    return;
  }

  let restoredPlaybackTime = 0;
  for (const savedItem of savedItems) {
    if (!savedItem || !ITEM_NAMES[savedItem.id]) {
      console.error("Ignoring an invalid saved used item:", savedItem);
      continue;
    }

    const tile = [...carousel.querySelectorAll(".item-tile")].find(
      (candidate) => candidate.dataset.itemId === savedItem.id,
    );
    if (!tile) continue;

    const image = tile.querySelector(".item-image");
    usedItems.add(image);
    tile.classList.add("is-used");
    image.style.opacity = String(USED_ITEM_OPACITY);
    const pageDuration = ITEM_PLAY_DURATION[savedItem.id];
    const playDuration =
      Number.isFinite(pageDuration) && pageDuration > 0
        ? pageDuration
        : savedItem.duration;
    if (Number.isFinite(playDuration) && playDuration > 0) {
      playedItemDurations.set(image, playDuration);
      restoredPlaybackTime += playDuration;
    }
    usedItemOrder.push(savedItem.id);
  }

  nextSegmentStart = Math.min(restoredPlaybackTime, playbackLimit);
  if (savedItems.length > 0) {
    dropdownIndicator.classList.add("is-hidden");
  }
};

const queueRecommendedItemForOna = (itemId) => {
  let queuedItems;
  try {
    const serializedItems = sessionStorage.getItem(
      RECOMMENDED_ITEMS_STORAGE_KEY,
    );
    queuedItems = serializedItems ? JSON.parse(serializedItems) : [];
  } catch (error) {
    console.error("Unable to read items queued for the Ona recommendation:", error);
    return;
  }

  if (!Array.isArray(queuedItems)) {
    console.error("Queued recommended items must be an array.");
    return;
  }

  if (!queuedItems.includes(itemId)) {
    queuedItems.push(itemId);
  }

  try {
    sessionStorage.setItem(
      RECOMMENDED_ITEMS_STORAGE_KEY,
      JSON.stringify(queuedItems),
    );
  } catch (error) {
    console.error("Unable to save the item for the Ona recommendation:", error);
  }
};

const transferRecommendedItemsToOna = () => {
  let queuedItems;
  let savedItems;
  try {
    const serializedQueuedItems = sessionStorage.getItem(
      RECOMMENDED_ITEMS_STORAGE_KEY,
    );
    queuedItems = serializedQueuedItems
      ? JSON.parse(serializedQueuedItems)
      : [];
    const serializedSavedItems = sessionStorage.getItem(
      USED_ITEMS_STORAGE_KEY,
    );
    savedItems = serializedSavedItems ? JSON.parse(serializedSavedItems) : [];
  } catch (error) {
    console.error("Unable to transfer recommended items to the Ona bag:", error);
    return;
  }

  if (!Array.isArray(queuedItems) || !Array.isArray(savedItems)) {
    console.error("Saved bag items must be arrays.");
    return;
  }

  const itemsToRestore = new Map(
    savedItems
      .filter((savedItem) => savedItem && ITEM_NAMES[savedItem.id])
      .map((savedItem) => [savedItem.id, savedItem]),
  );
  for (const itemId of queuedItems) {
    const duration = ONA_ITEM_PLAY_DURATION[itemId];
    if (!ITEM_NAMES[itemId] || !Number.isFinite(duration) || duration <= 0) {
      console.error("Ignoring an invalid item queued for the Ona bag:", itemId);
      continue;
    }

    itemsToRestore.set(itemId, { id: itemId, duration });
  }

  try {
    sessionStorage.setItem(
      USED_ITEMS_STORAGE_KEY,
      JSON.stringify([...itemsToRestore.values()]),
    );
    sessionStorage.removeItem(RECOMMENDED_ITEMS_STORAGE_KEY);
  } catch (error) {
    console.error("Unable to save transferred Ona bag items:", error);
  }
};

restoreUsedItems();

recommendationDialog
  .querySelector('.recommendation-product-link[href="./ona.html"]')
  ?.addEventListener("click", transferRecommendedItemsToOna);

addToBagButton.addEventListener("click", () => {
  if (isDumplingPage) return;

  const usedDuration = usedItemOrder.reduce((total, itemId) => {
    const tile = [...carousel.querySelectorAll(".item-tile")].find(
      (candidate) => candidate.dataset.itemId === itemId,
    );
    const image = tile?.querySelector(".item-image");
    return total + (image ? (playedItemDurations.get(image) ?? 0) : 0);
  }, 0);

  if (usedDuration < 1.7) {
    showRecommendation();
    return;
  }

  try {
    sessionStorage.setItem(
      CART_VIDEO_TIME_STORAGE_KEY,
      String(video.currentTime),
    );
  } catch (error) {
    console.error("Unable to save the cart video frame:", error);
  }

  window.location.assign("./cart.html");
});

const showRecommendation = () => {
  if (!recommendationDialog.open) {
    recommendationDialog.showModal();
    recommendationDialog
      .querySelector("#recommendation-title")
      .focus({ preventScroll: true });
  }
};

const showExplodingWarning = () => {
  if (!explodingWarningDialog.open) {
    explodingWarningDialog.showModal();
  }
};

exploreMoreButton.addEventListener("click", () => {
  recommendationDialog.close();
});

explodingWarningCloseButton.addEventListener("click", () => {
  explodingWarningDialog.close();
});

recommendationDialog.addEventListener("click", (event) => {
  if (event.target === recommendationDialog) {
    recommendationDialog.close();
  }
});

explodingWarningDialog.addEventListener("click", (event) => {
  if (event.target === explodingWarningDialog) {
    explodingWarningDialog.close();
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
    if (Math.abs(video.currentTime - time) <= VIDEO_SEEK_TOLERANCE) {
      resolve();
      return;
    }

    const cleanup = () => {
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("error", handleError);
    };
    const handleSeeked = () => {
      if (Math.abs(video.currentTime - time) > VIDEO_SEEK_TOLERANCE) return;

      cleanup();
      resolve();
    };
    const handleError = () => {
      cleanup();
      reject(new Error("The background video could not be decoded."));
    };
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("error", handleError);
    video.currentTime = time;
    if (
      !video.seeking &&
      Math.abs(video.currentTime - time) <= VIDEO_SEEK_TOLERANCE
    ) {
      cleanup();
      resolve();
    }
  });

const finishSegment = (
  endTime,
  runId,
  showRecommendationAfter = false,
  showExplodingWarningAfter = false,
) => {
  if (runId !== playbackRunId) return;

  cancelAnimationFrame(animationFrame);
  video.pause();
  video.playbackRate = 1;
  video.currentTime = endTime;
  nextSegmentStart = endTime;
  isPlayingSegment = false;
  setUsedItemButtonsDisabled(false);
  experience.classList.remove("is-playing");
  if (showRecommendationAfter) {
    showRecommendation();
  }
  if (showExplodingWarningAfter) {
    showExplodingWarning();
  }
};

const watchSegment = (
  endTime,
  runId,
  showRecommendationAfter,
  showExplodingWarningAfter,
) => {
  if (runId !== playbackRunId) return;

  if (video.currentTime >= endTime || video.ended) {
    finishSegment(
      endTime,
      runId,
      showRecommendationAfter,
      showExplodingWarningAfter,
    );
    return;
  }

  animationFrame = requestAnimationFrame(() =>
    watchSegment(
      endTime,
      runId,
      showRecommendationAfter,
      showExplodingWarningAfter,
    ),
  );
};

const playNextSegment = async (image) => {
  if (isPlayingSegment || usedItems.has(image)) {
    return false;
  }

  const itemId = image.closest(".item-tile").dataset.itemId;
  const playDuration = ITEM_PLAY_DURATION[itemId];
  if (isDumplingPage && playDuration === null) {
    queueRecommendedItemForOna(itemId);
    showRecommendation();
    return false;
  }
  if (!Number.isFinite(playDuration) || playDuration <= 0) {
    console.error(`Missing a valid play duration for ${itemId}.`);
    return false;
  }

  if (nextSegmentStart >= playbackLimit) {
    if (isDumplingPage) {
      showRecommendation();
    } else {
      showExplodingWarning();
    }
    return false;
  }

  usedItems.add(image);
  image.closest(".item-tile").classList.add("is-used");
  image.style.opacity = String(USED_ITEM_OPACITY);
  playedItemDurations.set(image, playDuration);
  usedItemOrder.push(itemId);
  saveUsedItems();
  isPlayingSegment = true;
  setUsedItemButtonsDisabled(true);
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
    const showExplodingWarningAfter =
      !isDumplingPage &&
      startTime + playDuration > playbackLimit &&
      endTime >= playbackLimit;

    if (endTime - startTime < 0.001) {
      finishSegment(
        startTime,
        runId,
        showRecommendationAfter,
        showExplodingWarningAfter,
      );
      return false;
    }

    const segmentDuration = endTime - startTime;
    playedItemDurations.set(image, segmentDuration);
    saveUsedItems();
    video.currentTime = startTime;
    video.playbackRate =
      segmentDuration >= FAST_PLAYBACK_MIN_DURATION ? FAST_PLAYBACK_RATE : 1;
    await video.play();
    if (runId !== playbackRunId) {
      video.pause();
      video.playbackRate = 1;
      return false;
    }

    animationFrame = requestAnimationFrame(() =>
      watchSegment(
        endTime,
        runId,
        showRecommendationAfter,
        showExplodingWarningAfter,
      ),
    );
    return true;
  } catch (error) {
    if (runId !== playbackRunId) return false;

    cancelAnimationFrame(animationFrame);
    video.pause();
    video.playbackRate = 1;
    isPlayingSegment = false;
    setUsedItemButtonsDisabled(false);
    experience.classList.remove("is-playing");
    console.error("Unable to play the next video segment:", error);
    return false;
  }
};

const rewindPreviousSegment = async (playDuration) => {
  const runId = ++playbackRunId;
  cancelAnimationFrame(animationFrame);
  video.pause();
  video.playbackRate = 1;
  isPlayingSegment = true;
  setUsedItemButtonsDisabled(true);
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

    const reversePlaybackRate =
      playDuration >= FAST_PLAYBACK_MIN_DURATION ? FAST_PLAYBACK_RATE : 1;
    const frameDuration = reversePlaybackRate / REVERSE_FRAME_RATE;
    const frameInterval = 1000 / REVERSE_FRAME_RATE;

    while (
      runId === playbackRunId &&
      video.currentTime - endTime > VIDEO_SEEK_TOLERANCE
    ) {
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
    setUsedItemButtonsDisabled(false);
    experience.classList.remove("is-playing");
    console.error("Unable to rewind the background video:", error);
  }
};

const resetUsedItem = (resetButton) => {
  if (isPlayingSegment) return;
  const tile = resetButton.closest(".item-tile");
  const image = tile.querySelector(".item-image");
  if (!usedItems.has(image)) return;

  const itemId = tile.dataset.itemId;
  const configuredDuration = ITEM_PLAY_DURATION[itemId];
  const playDuration = playedItemDurations.get(image) ?? configuredDuration;
  if (!Number.isFinite(playDuration) || playDuration <= 0) {
    console.error(`Missing a valid play duration for ${itemId}.`);
    return;
  }

  usedItems.delete(image);
  playedItemDurations.delete(image);
  usedItemOrder = usedItemOrder.filter((usedItemId) => usedItemId !== itemId);
  tile.classList.remove("is-used");
  image.style.removeProperty("opacity");
  saveUsedItems();
  void rewindPreviousSegment(playDuration);
};

carousel.querySelectorAll(".used-item-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    resetUsedItem(button);
  });
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
