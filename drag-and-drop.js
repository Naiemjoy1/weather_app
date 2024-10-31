const draggableSections = document.querySelectorAll(
  ".current-weather, .weather-info, .week-container"
);
const weatherDetails = document.querySelector(".weather-details");

let draggedElement = null;

draggableSections.forEach((section) => {
  section.setAttribute("draggable", true);

  section.addEventListener("dragstart", (e) => {
    draggedElement = e.target;
    e.target.classList.add("dragging");
  });

  section.addEventListener("dragend", () => {
    draggedElement.classList.remove("dragging");
    draggedElement = null;
  });
});

weatherDetails.addEventListener("dragover", (e) => {
  e.preventDefault();

  const afterElement = getDragAfterElement(weatherDetails, e.clientY);
  if (draggedElement && afterElement === null) {
    weatherDetails.appendChild(draggedElement);
  } else if (draggedElement && afterElement) {
    weatherDetails.insertBefore(draggedElement, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(
      ".current-weather, .weather-info, .week-container:not(.dragging)"
    ),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
