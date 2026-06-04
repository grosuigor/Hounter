export function cardTemplate(category, i, { name, price, seller, location, label }) {
  const trimmedName = name.length > 25 ? name.slice(0, 26).trim() + '...' : name

  return `<div class="card">
    <div class="card__image-container">
      <img src="./assets/featured/${category}/${i}.jpg" />
      <div class="card__image-label card__image-label--${label.type}">
        <img src="./assets/icons/featured/${label.type}.svg" />
        <span class="label">${label.text}</span>
      </div>
    </div>
    <div class="card__content">
      <h3 class="h3">${trimmedName}</h3>
      <h4 class="h4">$ ${price}</h4>
      <div class="avatar">
        <img src="./assets/featured/${category}/seller_${i}.jpg" />
        <div class="avatar__text">
          <span>${seller}</span>
          <span>${location}</span>
        </div>
      </div>
    </div>
  </div>`;
}
