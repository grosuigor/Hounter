import { DATA } from "./data";
import { cardTemplate } from "./cardTemplate";
import { isMobile } from "../../mediaQueries";
import { ANIMATIONS } from "../../animations";

const ANIMATION = ANIMATIONS.FADE;
const CARDS_PER_VIEWPORT = 3;

const section = document.querySelector(".featured");
const carousel = section.querySelector(".carousel");
const categoryButtons = Array.from(
  section.querySelectorAll(".controls__categories button"),
);
const [backArrow, forwardArrow] = section.querySelectorAll(
  ".controls__buttons button",
);

let currentCategory = "villa";
let currentIndex = 0;

function updateCarouselPosition(forceInitPosition = false) {
  if (forceInitPosition) {
    if (isMobile()) {
      carousel.parentElement.scrollTo({
        left: 0,
        behavior: "instant",
      });
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

  const animation = carousel.animate(ANIMATION.keyframes, ANIMATION.config);

  setTimeout(() => {
    carousel.innerHTML = cardsData.reduce(
      (acc, cardData, i) => acc + cardTemplate(category, i + 1, cardData),
      "",
    );
    updateCarouselPosition(true);
  }, ANIMATION.duration / 2);
}

function getMaxIndex() {
  return DATA[currentCategory].length - CARDS_PER_VIEWPORT;
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

categoryButtons.forEach((categoryButton) =>
  categoryButton.addEventListener("click", () => {
    pickCategory(categoryButton.dataset.category);
  }),
);

backArrow.addEventListener("click", () => updateIndex(-1));
forwardArrow.addEventListener("click", () => updateIndex(1));

pickCategory("house");

new ResizeObserver(() => {
  requestAnimationFrame(updateCarouselPosition);
}).observe(carousel);
