let toggleButton = document.createElement("button");
toggleButton.classList.add("toggle-dark-mode");
toggleButton.innerText = "Dark Mode";
document.body.appendChild(toggleButton);

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    toggleButton.innerText = "Light Mode";
  }
});

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    toggleButton.innerText = "Light Mode";
    localStorage.setItem("darkMode", "enabled");
  } else {
    toggleButton.innerText = "Dark Mode";
    localStorage.setItem("darkMode", "disabled");
  }
});
