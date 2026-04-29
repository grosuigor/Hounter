const CLASS_NAME = "dropdown-container"

const dropdowns = document.querySelectorAll(`.${CLASS_NAME}`)

Array.from(dropdowns).map(dropdown => dropdown.addEventListener("click", () => {
  dropdown.classList.toggle(`${CLASS_NAME}--active`)
}))