const forecastApiUrl =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

async function fetchWeeklyForecast(city, apiKey) {
  const response = await fetch(forecastApiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();
  console.log(data);

  const weekContainer = document.querySelector(".week-container");
  weekContainer.innerHTML = "";

  let dailyForecast = {};

  data.list.forEach((forecast) => {
    const date = forecast.dt_txt.split(" ")[0];
    if (!dailyForecast[date]) {
      dailyForecast[date] = forecast;
    }
  });

  Object.values(dailyForecast)
    .slice(0, 7)
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
      console.log(icon);

      dayDiv.innerHTML = `
      <p>${dayName}</p>
      <img src="Images/${icon}.png" alt="${day.weather[0].description}" />
      <p>${Math.round(day.main.temp_max)}°/${Math.round(day.main.temp_min)}°</p>
    `;
      weekContainer.appendChild(dayDiv);
    });
}
