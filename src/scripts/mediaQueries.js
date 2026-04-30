export function getViewportSize() {
  if (window.matchMedia("(max-width: 65em)").matches) return "xs";
  if (window.matchMedia("(max-width: 80em)").matches) return "sm";
  if (window.matchMedia("(max-width: 90em)").matches) return "md";
  return "lg";
}