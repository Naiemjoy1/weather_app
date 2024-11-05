const forecastApiUrl =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
let weatherChart;

async function fetchWeeklyForecast(city, apiKey) {
  const response = await fetch(forecastApiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  const weekContainer = document.querySelector(".week-container");
  weekContainer.innerHTML = "";

  let dailyForecast = {};
  let temperatureData = [];
  let labels = [];
  let weatherCondition = data.list[0].weather[0].main;

  data.list.forEach((forecast) => {
    const date = forecast.dt_txt.split(" ")[0];
    if (!dailyForecast[date]) {
      dailyForecast[date] = forecast;

      temperatureData.push(Math.round(forecast.main.temp));
      labels.push(
        new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
        })
      );
    }
  });

  Object.values(dailyForecast)
    .slice(1, 8)
    .forEach((day) => {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("days");

      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      const icon = day.weather[0].main.toLowerCase();

      dayDiv.innerHTML = `
        <p>${dayName}</p>
        <img src="Images/${icon}.svg" alt="${day.weather[0].description}" />
        <p>${Math.round(day.main.temp_max)}°/${Math.round(
        day.main.temp_min
      )}°</p>
      `;
      weekContainer.appendChild(dayDiv);
    });

  updateChart(temperatureData, labels, weatherCondition);
}

function updateChart(temperatureData, labels, weatherCondition) {
  if (weatherChart) {
    weatherChart.destroy();
  }

  const ctx = document.getElementById("weatherChart").getContext("2d");

  let borderColor, backgroundColor;
  switch (weatherCondition) {
    case "Clouds":
      borderColor = "rgba(211, 211, 211, 1)";
      backgroundColor = "rgba(211, 211, 211, 0.2)";
      break;
    case "Clear":
      borderColor = "rgba(135, 206, 235, 1)";
      backgroundColor = "rgba(135, 206, 235, 0.2)";
      break;
    case "Rain":
      borderColor = "rgba(70, 130, 180, 1)";
      backgroundColor = "rgba(70, 130, 180, 0.2)";
      break;
    case "Drizzle":
      borderColor = "rgba(169, 169, 169, 1)";
      backgroundColor = "rgba(169, 169, 169, 0.2)";
      break;
    case "Haze":
      borderColor = "rgba(255, 69, 0, 1)";
      backgroundColor = "rgba(255, 69, 0, 0.2)";
      break;
    case "Fog":
    case "Mist":
      borderColor = "rgba(245, 245, 245, 1)";
      backgroundColor = "rgba(245, 245, 245, 0.2)";
      break;
    default:
      borderColor = "rgba(135, 206, 235, 1)";
      backgroundColor = "rgba(135, 206, 235, 0.2)";
  }

  weatherChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatureData,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    },
    options: {
      responsive: true,
      animation: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
