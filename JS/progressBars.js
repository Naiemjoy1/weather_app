function updateProgressBar(elementId, value, maxValue) {
  const progressBar = document.getElementById(elementId);
  const percentage = (value / maxValue) * 100;
  progressBar.style.width = `${percentage}%`;
}

function loadWeatherData() {
  const windSpeed = 15;
  const uvIndex = 6;
  const humidity = 50;

  updateProgressBar("windProgress", windSpeed, 100);
  updateProgressBar("uvProgress", uvIndex, 11);
  updateProgressBar("humidityProgress", humidity, 100);
}

loadWeatherData();
