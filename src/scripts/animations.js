function createAnimation(keyframes, duration, easing, iterations = 1) {
  return {
    duration,
    keyframes,
    config: {
      duration,
      iterations,
      easing,
    },
  };
}

export const ANIMATIONS = {
  FADE: createAnimation(
    [{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }],
    400,
    "linear",
  ),
  CAROUSEL: createAnimation(
    (step) => [
      { transform: "translateX(0px)" },
      { transform: `translateX(-${step}px)` },
    ],
    20_000,
    "linear",
    Infinity,
  ),
  MODAL: createAnimation(
    [
      { backgroundColor: "rgba(0, 0, 0, 0)", transform: "scale(0, 0)" },
      {
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        transform: "scale(1, 1)",
      },
    ],
    500,
    "ease-in-out",
  ),
};
