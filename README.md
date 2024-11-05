# Interactive Weather Dashboard

An interactive weather dashboard that provides real-time weather updates, forecasts, and user-friendly features for a personalized experience. Built with modern web technologies, this dashboard allows users to explore current weather conditions, search for cities, and visualize weather data dynamically.

## Core Features

### Current Weather Display

- Show the current weather conditions for the user’s location (using geolocation) or a searched city.
- Display detailed information such as temperature, wind speed, humidity, UV index, etc.
- Animate the weather information dynamically (e.g., temperature "rising" animation as data loads).

### Search for Cities

- Users can search for weather in different cities using an input field.
- Provide autocomplete suggestions as the user types, enhancing user interaction.

### 7-Day Weather Forecast with Scroll Animation

- Display a 7-day weather forecast with sliding card animations.
- Users can scroll horizontally through the forecast, with cards that animate into view when swiped.
- Use smooth CSS transitions and JavaScript event listeners to animate the weather cards as they enter/exit the viewport.

### Geolocation and Manual City Input

- Auto-fetch weather based on the user’s geolocation, with an option to manually search for other cities.

### Favorite Cities with Scroll Interaction

- Allow users to save favorite cities in a scrollable sidebar.
- Add smooth animations when a favorite is added or removed.
- Each favorite city should be clickable to update the main weather display dynamically.

### Temperature Unit Toggle (Celsius/Fahrenheit)

- Users can switch between Celsius and Fahrenheit with a toggle button.
- The UI updates in real-time with smooth transition animations.

### Advanced UI Interaction and Animations

- **Interactive Animations for Weather Changes:** Use SVG or Lottie animations to represent changing weather conditions (e.g., sunny, rainy, cloudy).
- **Particle Effects:** Add raindrop or snowflake effects on the background using JavaScript for a dynamic weather feel.

### Responsive and Accessible Design

- Ensure the layout adapts to different screen sizes (desktop, tablet, mobile).
- Utilize CSS Grid/Flexbox for layout structure.
- Include accessible color contrast for different weather conditions and ensure the site is keyboard and screen reader-friendly.

### Dynamic Theme Change

- Implement dynamic weather-based themes (e.g., light blue for sunny, dark blue/gray for rainy).
- Each theme change should animate smoothly using CSS transitions.

## Intermediate-Expert Level Functionalities

### Customizable Weather Dashboard Layout

- Allow users to customize the dashboard layout (e.g., drag and drop sections to rearrange the 7-day forecast, current weather details, favorite cities).
- Use dragstart, dragover, and drop events for a smooth drag-and-drop interface.

### Animated Progress Bars

- Add animated progress bars to represent the UV index and wind speed.
- Progress bars should animate from 0 to the current value when new data loads.

### Weather Chart

- Use Chart.js or a similar library to display temperature, humidity, or wind speed trends for the week, with animations as the chart data loads.

### Interactive Tooltip on Hover

- Add tooltips that provide additional information about weather conditions on hover (e.g., "UV index 5 - Moderate exposure").
- Tooltips should fade in and follow the user’s mouse movement.

### Dark Mode with CSS Transitions

- Implement a dark mode toggle, where the transition between light and dark mode is animated smoothly using CSS transitions or JavaScript.

## Tech Stack

- **HTML5:** For layout structure.
- **CSS3 & Sass:** For styling, animations, and responsiveness. Sass is used for organizing styles into variables, mixins, and partials.
- **JavaScript:** Vanilla JavaScript for DOM manipulation, API integration (weather API), scroll interactions, and event handling.
- **Chart.js:** (optional) For weather data visualization.
- **OpenWeatherMap API:** For fetching weather data.

## Getting Started

To get started with this project, clone the repository and open `index.html` in your web browser. Make sure to replace the API key in the JavaScript code with your own OpenWeatherMap API key.

```bash
git clone https://github.com/Naiemjoy1/weather_app
cd weather_app
```
