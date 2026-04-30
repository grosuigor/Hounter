import { DATA } from "./data";
import { cardTemplate } from "./cardTemplate";
import { getViewportSize } from "../../mediaQueries";

//constants
const ANIMATION_DURATION = 400;

//elements
const section = document.querySelector(".featured");
const carousel = section.querySelector(".carousel");
const categoryButtons = Array.from(
  section.querySelectorAll(".controls__categories button"),
);
const [backArrow, forwardArrow] = section.querySelectorAll(
  ".controls__buttons button",
);

//state
let currentCategory = "villa";
let currentIndex = 0;

//animations & UI
function updateCarouselPosition(forceInitPosition = false) {
  if (forceInitPosition) {
    const viewportSize = getViewportSize();
    if (viewportSize === "xs") {
      carousel.parentElement.scrollTo({
        left: 0,
        behavior: "instant"
      })
    } else {
      carousel.style.transform = "translateX(0px)";
    }
  }

  const styles = getComputedStyle(carousel);
  const gap = parseFloat(styles.gap) || 0;
  const width = carousel.scrollWidth;

  carousel.style.transform = `translateX(${(-currentIndex * (width + gap)) / 4}px)`;
}

function setCarouselCards(category) {
  const cardsData = DATA[category];

  const animation = carousel.animate(
    [{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }],
    {
      duration: ANIMATION_DURATION,
      easing: "linear",
    },
  );

  setTimeout(() => {
    carousel.innerHTML = cardsData.reduce(
      (acc, cardData, i) => acc + cardTemplate(category, i + 1, cardData),
      "",
    );
    updateCarouselPosition(true);
  }, ANIMATION_DURATION / 2);
}

//controls (arrows)
function getMaxIndex() {
  return DATA[currentCategory].length - 1;
}

function setArrowState(arrow, disabled) {
  arrow.classList.toggle("btn--disabled", disabled);
  arrow.disabled = disabled;
}

function updateControlsAvailability() {
  const max = getMaxIndex();

  setArrowState(backArrow, currentIndex === 0);
  setArrowState(forwardArrow, currentIndex === max);
}

function updateIndex(delta) {
  const max = getMaxIndex();

  currentIndex = Math.max(0, Math.min(currentIndex + delta, max));

  updateCarouselPosition();
  updateControlsAvailability();
}

//category buttons
function updateButtonsAvailability() {
  categoryButtons.forEach((categoryButton) => {
    let [classToAdd, classToRemove] = ["btn--outlined", "btn--filled"];
    categoryButton.disabled = false;
    if (categoryButton.dataset.category === currentCategory) {
      [classToAdd, classToRemove] = [classToRemove, classToAdd];
      categoryButton.disabled = true;
    }
    categoryButton.classList.add(classToAdd);
    categoryButton.classList.remove(classToRemove);
  });
}

//module handler
export function pickCategory(category) {
  if (!Object.hasOwn(DATA, category) || category === currentCategory) {
    return;
  }
  currentCategory = category;
  currentIndex = 0;

  setCarouselCards(category);
  updateControlsAvailability();
  updateButtonsAvailability();
}

//event handlers
categoryButtons.forEach((categoryButton) =>
  categoryButton.addEventListener("click", () => {
    pickCategory(categoryButton.dataset.category);
  }),
);

backArrow.addEventListener("click", () => updateIndex(-1));
forwardArrow.addEventListener("click", () => updateIndex(1));

//init state
pickCategory("house");

new ResizeObserver(() => {
  requestAnimationFrame(updateCarouselPosition);
}).observe(carousel);
