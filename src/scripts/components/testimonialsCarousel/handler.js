import { getViewportSize } from "../../mediaQueries";

const section = document.querySelector(".testimonials");
const carousel = section.querySelector(".carousel__track");
const dots = Array.from(section.querySelectorAll(".carousel__dot"));

const reviewCount = carousel.childElementCount;
let currentIndex = 1;

function updateCarouselPosition() {
  const viewportSize = getViewportSize();
  const parent = carousel.parentElement

  if (viewportSize === "xs") {
    carousel.style.transform = "";
    parent.scrollTo({
      left: (parent.scrollWidth - parent.clientWidth) / 2,
      behavior: "instant"
    })
    return;
  }

  const styles = getComputedStyle(carousel);
  const gap = parseFloat(styles.gap) || 0;
  const width = carousel.scrollWidth;

  carousel.style.transform = `translateX(${(-(currentIndex - 1) * (width + gap)) / 3}px)`;
}

function gotoReview(index) {
  if (index === currentIndex || index < 0 || index > reviewCount - 1) {
    return;
  }

  dots.forEach((dot, i) => {
    const isActive = i === index;
    dot.classList.toggle("carousel__dot--active", isActive);
    dot.disabled = isActive;
  });

  currentIndex = index;
  updateCarouselPosition();
}

dots.forEach((dot, i) => dot.addEventListener("click", () => gotoReview(i)));

new ResizeObserver(() => {
  requestAnimationFrame(updateCarouselPosition);
}).observe(carousel);
