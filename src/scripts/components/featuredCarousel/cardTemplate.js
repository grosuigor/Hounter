export function cardTemplate(category, i, { name, price, seller, location, label }) {
  return `<div class="card">
    <div class="card__image-container">
      <img src="./src/assets/featured/${category}/${i}.jpg" />
      <div class="card__image-label card__image-label--${label.type}">
        <img src="./src/assets/icons/featured/${label.type}.svg" />
        <span class="label">${label.text}</span>
      </div>
    </div>
    <div class="card__content">
      <h3 class="h3">${name}</h3>
      <h4 class="h4">$ ${price}</h4>
      <div class="card__seller-container">
        <img src="./src/assets/featured/${category}/seller_${i}.jpg" />
        <div class="card__seller-info">
          <span class="subtitle">${seller}</span>
          <span class="label">${location}</span>
        </div>
      </div>
    </div>
  </div>`;
}
