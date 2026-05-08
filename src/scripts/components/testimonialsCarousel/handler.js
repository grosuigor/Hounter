const section = document.querySelector(".testimonials");
const carousel = section.querySelector(".carousel__track");
const dots = Array.from(section.querySelectorAll(".carousel__dot"));

const reviewCount = carousel.childElementCount;
let currentIndex = 1;

function updateCarouselPosition() {
  const parent = carousel.parentElement;
  const scrollProgress =
    currentIndex === 0
      ? 0
      : (parent.scrollWidth - parent.clientWidth) / (currentIndex === 1 ? 2 : 1);

  parent.scrollTo({
    left: scrollProgress,
    behavior: "smooth",
  });
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
