const appFrame = document.querySelector(".phone");
const desktopFrameQuery = window.matchMedia(
  "(min-width: 600px) and (min-height: 500px)",
);
const FRAME_WINDOW_MARGIN = 24;

const fitFrameToWindow = () => {
  if (!desktopFrameQuery.matches) {
    document.documentElement.style.removeProperty("--frame-scale");
    return;
  }

  const scale = Math.min(
    1,
    (window.innerWidth - FRAME_WINDOW_MARGIN * 2) / appFrame.offsetWidth,
    (window.innerHeight - FRAME_WINDOW_MARGIN * 2) / appFrame.offsetHeight,
  );
  document.documentElement.style.setProperty("--frame-scale", String(scale));
};

window.addEventListener("resize", fitFrameToWindow);
desktopFrameQuery.addEventListener("change", fitFrameToWindow);
fitFrameToWindow();
