function genericArticle({ index, author, title, titleClass, desc, timestamp }) {
  return `<img src="/src/assets/find_more/article-${index}.jpg" />
  <div class="article__content">
    <div class="avatar">
      <div class="avatar__images">
        <img src="/src/assets/find_more/author-${index}.jpg" />
      </div>
      <div class="avatar__text">
        <span class="text text--bold">${author}</span>
      </div>
    </div>
    <span class="${titleClass}"
      >${title}</span
    >
    ${
      desc !== undefined
        ? `<span class="text text--light">
          ${desc}
        </span>`
        : ""
    }
    <span class="label">
      <img src="/src/assets/icons/time.svg" />
      ${timestamp}
    </span>
  </div>`;
}

export function articleTemplate(index, { author, title, timestamp }) {
  return `<div class="article" data-id="${index}">
    ${genericArticle({
      index,
      author,
      title,
      titleClass: "subtitle",
      desc: undefined,
      timestamp,
    })}
  </div>`;
}

export function bigArticleTemplate(index, { author, title, desc, timestamp }) {
  return genericArticle({
    index,
    author,
    title,
    titleClass: "h3",
    desc,
    timestamp,
  });
}
