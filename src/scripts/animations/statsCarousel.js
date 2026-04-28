const ANIMATION_DURATION = 20 * 1000 // 20 sec

const container = document.querySelector(".stats__container");
const track = document.querySelector(".stats__track");

let animation;

track.innerHTML += track.innerHTML;

const createAnimation = () => {
  animation?.cancel();

  const styles = getComputedStyle(track);
  const gap = parseFloat(styles.gap) || 0;
  const halfWidth = track.scrollWidth / 2;

  animation = track.animate(
    [
      { transform: "translateX(0px)" },
      { transform: `translateX(-${halfWidth + gap / 2}px)` }
    ],
    {
      duration: ANIMATION_DURATION,
      iterations: Infinity,
      easing: "linear"
    }
  );
};

container.addEventListener("mouseenter", () => animation?.pause());
container.addEventListener("mouseleave", () => animation?.play());

createAnimation();

new ResizeObserver(createAnimation).observe(track);