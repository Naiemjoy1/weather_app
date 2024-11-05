const tooltip = document.getElementById("tooltip");

const tooltipData = {
  humidity: "Relative humidity of the air.",
  wind: "Wind speed indicates the flow of air.",
  uv: "UV index 5 - Moderate exposure. Use sun protection if outdoors.",
};

document.querySelectorAll(".info-column img").forEach((element) => {
  element.addEventListener("mouseenter", (e) => {
    const infoType = e.target.alt.toLowerCase();
    const infoText = tooltipData[infoType];

    if (infoText) {
      tooltip.textContent = infoText;
      tooltip.style.opacity = 1;
    }
  });

  element.addEventListener("mousemove", (e) => {
    tooltip.style.top = `${e.clientY - 10}px`;
    tooltip.style.left = `${e.clientX + 10}px`;
  });

  element.addEventListener("mouseleave", () => {
    tooltip.style.opacity = 0;
  });
});
