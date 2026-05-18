const section = document.querySelector(".testimonials");
const carousel = section.querySelector(".carousel");
const carouselTrack = section.querySelector(".carousel__track");
const dots = Array.from(section.querySelectorAll(".carousel__dot"));

const reviewCount = carouselTrack.childElementCount;
let currentIndex = 1;

function calcCarouselScrollableWidth() {
  return carousel.scrollWidth - carousel.clientWidth;
}

let carouselScrollableWidth = calcCarouselScrollableWidth();
let isUserScrolling = true;
let lastScrollLeft = 0;

function updateCarouselPosition() {
  let scrollProgress = 1 / (reviewCount - currentIndex);

  if (currentIndex === 0) {
    scrollProgress = 0;
  }

  lastScrollLeft = carouselScrollableWidth * scrollProgress;

  isUserScrolling = false;
  carousel.scrollTo({
    left: lastScrollLeft,
    behavior: "smooth",
  });

  setTimeout(() => {
    isUserScrolling = true;
  }, 1000);
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

function updateCurrentDot(e) {
  if (!isUserScrolling) {
    return;
  }

  let index = Math.min(
    Math.floor((e.target.scrollLeft / carouselScrollableWidth) * reviewCount),
    reviewCount - 1,
  );

  if (index === currentIndex) {
    const scrollDirection = Math.sign(e.target.scrollLeft - lastScrollLeft);
    index += scrollDirection * 1;
  }

  gotoReview(index);
}

dots.forEach((dot, i) => dot.addEventListener("click", () => gotoReview(i)));
carousel.addEventListener("scrollend", updateCurrentDot);

updateCarouselPosition();

new ResizeObserver(() => {
  requestAnimationFrame(calcCarouselScrollableWidth);
}).observe(carousel);
