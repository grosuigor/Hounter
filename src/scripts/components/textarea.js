const textareaContainers = Array.from(document.querySelectorAll(".textarea-container"));

textareaContainers.forEach(textareaContainer => {
  const textarea = textareaContainer.querySelector("textarea");
  const counter = textareaContainer.querySelector(".textarea-counter")
  const count = counter.querySelector(".message-count")

  const maxChars = Number(counter.textContent.split("/").at(-1))

  textarea.addEventListener("input", () => {
    let value = textarea.value
    if (value.length > maxChars) {
      value = value.slice(maxChars)
      textarea.value = value
    }
    count.textContent = value.length
  })
})