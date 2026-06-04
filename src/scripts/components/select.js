const selects = Array.from(document.querySelectorAll(".select"));

function selectToggler(select) {
  const input = select.querySelector(".input");
  const optionsContainer = select.querySelector(".select__options");

  let opened = false;
  optionsContainer.inert = !opened;

  return () => {
    opened = !opened;
    input.setAttribute("aria-expanded", opened);
    select.classList.toggle("select--active", opened);
    optionsContainer.inert = !opened;
  };
}

selects.forEach((select) => {
  const input = select.querySelector(".input");
  const options = Array.from(select.querySelectorAll(".select__option"));

  const toggleSelect = selectToggler(select);

  select.addEventListener("click", () => {
    toggleSelect();
  });

  input.addEventListener("input", () => {
    input.value = inputValue;
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
      e.preventDefault();
      toggleSelect();
    }
  });

  let inputValue = "";

  options.forEach((option) => {
    const value = option.textContent.trim();

    option.addEventListener("click", () => {
      inputValue = value;
      input.value = value;
    });

    option.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        toggleSelect()
      }
    });
  });
});
