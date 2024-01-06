// eslint-disable-next-line import/no-extraneous-dependencies
import "./style.css";
import buildForecast from "./builders/forecastBuilder";
import buildWeather from "./builders/weatherBuilder";
import API_KEY from "./secrets";

let currentCity = "cairo";
const currentCityDom = document.getElementById("current-city");

async function loadData(city) {
  const mainContent = document.getElementById("main-content");
  const loader = document.getElementById("loader");
  const errorDisplay = document.getElementById("error-display");

  mainContent.style.display = "none";
  loader.style.display = "block";

  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );
    const weatherData = await weatherResponse.json();

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
    );
    const forecastData = await forecastResponse.json();

    errorDisplay.style.display = "none";
    loader.style.display = "none";
    mainContent.style.display = "grid";

    currentCityDom.textContent = city;

    buildWeather(weatherData);

    buildForecast(forecastData);
  } catch (error) {
    errorDisplay.style.display = "block";
    mainContent.style.display = "none";
    console.log(error);
    errorDisplay.textContent = "Error";
  }
}

document.addEventListener("DOMContentLoaded", loadData(currentCity));

document
  .getElementById("button-refresh")
  .addEventListener("click", loadData(currentCity));

document.getElementById("button-change").addEventListener("click", () => {
  currentCity = document.getElementById("city-input").value;
  loadData(currentCity);
});
