// Load HTML from external file into a container
function includeHTML(selector: string, filePath: string) {
  const container = document.querySelector(selector);
  if (container) {
    fetch(filePath)
      .then((res) => res.text())
      .then((html) => (container.innerHTML = html))
      .catch((err) => console.error("Include failed:", err));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  includeHTML("#navbar", "/src/includes/navbar.html");
  // includeHTML("#footer", "/src/includes/footer.html"); // optional
});
