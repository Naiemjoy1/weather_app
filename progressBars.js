function animateProgressBar(progressElement, targetValue) {
  const maxWidth = 100; // Set the maximum width for progress bar (0-100%)
  const currentValue = parseFloat(progressElement.style.width) || 0;
  const increment = targetValue / 60; // Calculate the increment

  let currentWidth = currentValue;
  const interval = setInterval(() => {
    currentWidth += increment;
    if (currentWidth >= targetValue) {
      currentWidth = targetValue;
      clearInterval(interval);
    }
    progressElement.style.width = `${currentWidth}%`;
  }, 16); // Animation frame
}

// Export the function for use in other files
export { animateProgressBar };
