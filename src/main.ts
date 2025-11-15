import navbar from "./includes/navbar.html?raw";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#navbar");
  if (container) container.innerHTML = navbar;
});
