const forms = document.querySelectorAll("form")

forms.forEach((form) => {
  const submitButton = form.querySelector(".submit-button")

  submitButton.addEventListener("click", (e) => {
    if (form.checkValidity()) {
      e.preventDefault()
      alert("Form submitted!")
    }
  })
})