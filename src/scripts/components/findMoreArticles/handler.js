import { isMobile } from "../../mediaQueries";
import { DATA } from "./data";
import { articleTemplate, bigArticleTemplate } from "./articleTemplate";
import { ANIMATIONS } from "../../animations";

const ARTICLES_PER_VIEWPORT = 3;

const section = document.querySelector(".find-more");
const articlesListContainer = section.querySelector(".articles-list");
const bigArticleContainer = section.querySelector(".article--big");
const loadMoreButton = section.querySelector("#load_more_btn");

let currentArticlesAmount = 0;
let currentArticleIndex = -1;

function addArticlesToList() {
  if (currentArticlesAmount > DATA.length - ARTICLES_PER_VIEWPORT) {
    return;
  }

  const newContent = DATA.slice(
    currentArticlesAmount,
    currentArticlesAmount + ARTICLES_PER_VIEWPORT,
  )
    .map((article, index) => articleTemplate(index + 1 + currentArticlesAmount, article))
    .join("");

  if (currentArticlesAmount === 0) {
    articlesListContainer.innerHTML = newContent;
  } else {
    articlesListContainer.insertAdjacentHTML("beforeend", newContent);
    articlesListContainer.scrollTo({
      top:
        articlesListContainer.scrollHeight - articlesListContainer.clientHeight,
      behavior: "smooth",
    });

    loadMoreButton.innerHTML = "Less Articles";
  }

  currentArticlesAmount += ARTICLES_PER_VIEWPORT;
}

function removeArticlesFromList() {
  if (currentArticlesAmount !== DATA.length) {
    return;
  }

  articlesListContainer.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  loadMoreButton.disabled = true;

  setTimeout(() => {
    Array.from({ length: DATA.length - ARTICLES_PER_VIEWPORT }).forEach((_, i) => {
      articlesListContainer.lastElementChild.remove();
    });
    currentArticlesAmount -= ARTICLES_PER_VIEWPORT;

    loadMoreButton.disabled = false;
  }, 500);

  loadMoreButton.innerHTML = "More Articles";
}

function pickArticle(index, skipAnimation = false) {
  if (index === currentArticleIndex || index < 0 || index >= DATA.length) {
    return;
  }

  const useMobile = isMobile();

  if (!skipAnimation) {
    const animation = useMobile ? ANIMATIONS.MODAL : ANIMATIONS.FADE;
    bigArticleContainer.animate(animation.keyframes, animation.config);
  }

  setTimeout(
    () => {
      bigArticleContainer.innerHTML = bigArticleTemplate(
        index + 1,
        DATA[index],
      );
      if (useMobile) {
        bigArticleContainer.classList.add("article__modal");
      }
    },
    skipAnimation || useMobile ? 0 : ANIMATIONS.FADE.duration / 2,
  );

  currentArticleIndex = index;
}

function unpickArticle() {
  if (currentArticleIndex === -1 || !isMobile()) {
    return;
  }

  const animation = bigArticleContainer.animate(
    ANIMATIONS.MODAL.keyframes.toReversed(),
    ANIMATIONS.MODAL.config,
  );

  setTimeout(() => {
    bigArticleContainer.classList.remove("article__modal");
  }, ANIMATIONS.MODAL.duration);
  currentArticleIndex = -1;
}

addArticlesToList();

if (!isMobile()) {
  pickArticle(0, true);
}

loadMoreButton.addEventListener("click", () => {
  if (currentArticlesAmount < DATA.length) {
    addArticlesToList();
  } else {
    removeArticlesFromList();
  }
});

articlesListContainer.addEventListener("click", (e) => {
  const article = e.target.closest(".article");
  if (!article) return;

  pickArticle(article.dataset.id - 1);
});

bigArticleContainer.addEventListener("click", (e) => {
  if (e.target === bigArticleContainer) {
    unpickArticle();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    unpickArticle();
  }
});
