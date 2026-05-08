const selects = Array.from(document.querySelectorAll(".select"));

selects.forEach((select) => {
  const input = select.querySelector(".input");
  const options = Array.from(select.querySelectorAll(".select__option"));

  select.addEventListener("click", () =>
    select.classList.toggle("select--active"),
  );

  let inputValue = ""

  input.addEventListener("input", () => {
    input.value = inputValue;
  });

  options.forEach((option) => {
    const value = option.textContent;

    option.addEventListener("click", () => {
      inputValue = value;
      input.value = value;
    });
  });
});
