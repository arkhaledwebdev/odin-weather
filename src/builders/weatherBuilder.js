export default function buildWeather(data) {
  const weatherContent = document.getElementById("weather-content");

  weatherContent.replaceChildren();

  // Create the weather icon image
  const weatherIcon = document.createElement("img");
  weatherIcon.className = "icon-large";
  weatherIcon.id = "weather-icon";
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  weatherIcon.alt = "weather image";
  weatherContent.appendChild(weatherIcon);

  // Create the temperature div
  const weatherTemp = document.createElement("div");
  weatherTemp.className = "temp";
  weatherTemp.id = "weather-temp";
  weatherTemp.textContent = `${data.main.temp}°C`;
  weatherContent.appendChild(weatherTemp);

  // Create the temperature min-max div
  const weatherTempMinMax = document.createElement("div");
  weatherTempMinMax.className = "weather-title";
  weatherTempMinMax.id = "weather-temp-min-max";
  weatherTempMinMax.textContent = `${data.main.temp_min}°C - ${data.main.temp_max}°C`;
  weatherContent.appendChild(weatherTempMinMax);

  // Create weather items
  function createWeatherItem(title, value, valueId) {
    const weatherItem = document.createElement("div");
    weatherItem.className = "weather-item";

    const weatherTitle = document.createElement("div");
    weatherTitle.className = "weather-title";
    weatherTitle.textContent = title;
    weatherItem.appendChild(weatherTitle);

    const weatherValue = document.createElement("div");
    weatherValue.className = "weather-value";
    weatherValue.id = valueId;
    weatherValue.textContent = value;
    weatherItem.appendChild(weatherValue);

    weatherContent.appendChild(weatherItem);
  }

  // Create humidity item
  createWeatherItem("Humidity", data.main.humidity, "weather-humidity");

  // Create pressure item
  createWeatherItem("Pressure", data.main.pressure, "weather-pressure");

  // Create wind speed item
  createWeatherItem("Wind speed", data.wind.speed, "weather-wind");
}
