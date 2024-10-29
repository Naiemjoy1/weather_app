const apiKey = "98c903957315f69bcf1dfc5dd52b02c7";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchInput = document.querySelector(".search-container input");
const searchButton = document.querySelector(".search-container button");
const weatherIcon = document.querySelector(".icon-weather");
const toggleButtons = document.querySelectorAll(".toggle-button");
let currentTemperature;

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  if (response.ok) {
    let cityName = data.name;
    if (cityName.includes("District")) {
      cityName = cityName.replace(" District", "");
    }

    document.querySelector(".city-name").innerHTML = cityName;
    currentTemperature = data.main.temp;
    animateTemperature(currentTemperature);
    document.querySelector(".humidity-value").innerHTML =
      data.main.humidity + "%";
    document.querySelector(".wind-value").innerHTML = data.wind.speed + " km/h";

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "/Images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "/Images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "/Images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "/Images/drizzle.png";
        break;
      case "Haze":
        weatherIcon.src = "/Images/haze.png";
        break;
      case "Fog":
      case "Mist":
        weatherIcon.src = "/Images/fog.png";
        break;
      default:
        weatherIcon.src = "/Images/clear.png";
    }

    checkUVIndex(data.coord.lat, data.coord.lon);
    fetchWeeklyForecast(city, apiKey);
  } else {
    alert("City not found. Showing default city.");
    checkWeather("New York");
  }
}

async function checkUVIndex(lat, lon) {
  try {
    const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(uvUrl);
    const data = await response.json();
    document.querySelector(".uv-index-value").innerHTML = `${data.value}`;
  } catch (error) {
    document.querySelector(".uv-index-value").innerHTML = "N/A";
    console.error("Failed to fetch UV Index:", error);
  }
}

function animateTemperature(targetTemp) {
  let currentTemp = 0;
  const increment = targetTemp / 60;
  const interval = setInterval(() => {
    currentTemp += increment;
    if (currentTemp >= targetTemp) {
      clearInterval(interval);
      updateTemperatureDisplay(targetTemp);
    } else {
      updateTemperatureDisplay(currentTemp);
    }
  }, 16);
}

function updateTemperatureDisplay(temp) {
  const tempValue = document.querySelector(".temp-value");
  const currentUnit = document
    .querySelector(".toggle-button.active")
    .getAttribute("data-unit");

  if (currentUnit === "fahrenheit") {
    const fahrenheitTemp = (temp * 9) / 5 + 32;
    tempValue.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
  } else {
    tempValue.innerHTML = `${Math.round(temp)}°C`;
  }
}

async function fetchCitySuggestions(query) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
}

function displaySuggestions(suggestions) {
  const suggestionBox = document.querySelector(".suggestion-box");
  suggestionBox.innerHTML = "";

  suggestions.forEach((city) => {
    const div = document.createElement("div");
    div.innerHTML = `${city.name}, ${city.country}`;
    div.classList.add("suggestion-item");

    div.addEventListener("click", () => {
      searchInput.value = city.name;
      checkWeather(city.name);
      suggestionBox.innerHTML = "";
      searchInput.value = "";
    });

    suggestionBox.appendChild(div);
  });
}

searchInput.addEventListener("input", async () => {
  const query = searchInput.value;
  if (query.length > 1) {
    const suggestions = await fetchCitySuggestions(query);
    displaySuggestions(suggestions);
  }
});

searchButton.addEventListener("click", () => {
  const city = searchInput.value;
  checkWeather(city);
  searchInput.value = "";
  document.querySelector(".suggestion-box").innerHTML = "";
});

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    toggleButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    updateTemperatureDisplay(currentTemperature);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetchDefaultWeather();
});

function fetchDefaultWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const locationUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        const response = await fetch(locationUrl);
        const data = await response.json();
        checkWeather(data.name);
      },
      () => checkWeather("New York")
    );
  } else {
    checkWeather("New York");
  }
}
