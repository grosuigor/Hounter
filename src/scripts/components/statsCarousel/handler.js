import { getViewportSize } from "../../mediaQueries";
import { ANIMATIONS } from "../../animations";

const ANIMATION = ANIMATIONS.CAROUSEL

const container = document.querySelector(".stats__container");
const track = document.querySelector(".stats__track");

const initialContent = track.innerHTML;

let isDuplicated = false;
let animation;

const createAnimation = () => {
  animation?.cancel();

  const viewportSize = getViewportSize();

  if (viewportSize !== "xs" && viewportSize !== "xl") {
    if (!isDuplicated) {
      track.innerHTML += initialContent;
      isDuplicated = true;
    }

    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.gap) || 0;

    animation = track.animate(
      ANIMATION.keyframes((track.scrollWidth + gap) / 2),
      ANIMATION.config
    );
  } else {
    if (isDuplicated) {
      track.innerHTML = initialContent;
      isDuplicated = false;
    }
    animation = undefined;
  }
};

container.addEventListener("mouseenter", () => animation?.pause());
container.addEventListener("mouseleave", () => animation?.play());

createAnimation();

new ResizeObserver(() => {
  requestAnimationFrame(createAnimation);
}).observe(container);
