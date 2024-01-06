// Assuming you have a parent element with an id of "forecast-content" where you want to append the generated HTML

// eslint-disable-next-line import/no-extraneous-dependencies
import { addDays, format, isEqual } from "date-fns";

function createForecastDay(dayNumber, dayData) {
  const dateOfDay = new Date(dayData.dt * 1000);

  const container = document.createElement("div");
  container.classList.add("forecast-day");
  container.id = `day-${dayNumber}-container`;

  const icon = document.createElement("img");
  icon.classList.add("icon-large");
  icon.id = `forecast-icon-${dayNumber}`;
  icon.src = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}@4x.png`;
  icon.alt = "forecast image";

  const dayDateNo = document.createElement("div");
  dayDateNo.classList.add("date");
  dayDateNo.textContent = format(dateOfDay, "dd/MM");

  const temp = document.createElement("div");
  temp.classList.add("temp");
  temp.id = `forecast-temp-${dayNumber}`;
  temp.textContent = `${dayData.main.temp}°C`; // You can set the initial temperature value

  const tempMinMax = document.createElement("div");
  tempMinMax.classList.add("forecast-title");
  tempMinMax.id = `forecast-${dayNumber}-temp-min-max`;
  tempMinMax.textContent = `${dayData.main.temp_min}°C - ${dayData.main.temp_max}°C`;

  container.appendChild(dayDateNo);
  container.appendChild(icon);
  container.appendChild(temp);
  container.appendChild(tempMinMax);

  // Adding forecast items (Humidity, Pressure, Wind speed)
  const forecastItems = ["Humidity", "Pressure", "Wind speed"];
  forecastItems.forEach((item) => {
    const forecastItem = document.createElement("div");
    forecastItem.classList.add("forecast-item");

    const forecastTitle = document.createElement("div");
    forecastTitle.classList.add("forecast-title");
    forecastTitle.textContent = item;

    const forecastValue = document.createElement("div");
    forecastValue.classList.add("forecast-value");

    switch (item) {
      case "Humidity":
        forecastValue.textContent = dayData.main.humidity;
        break;
      case "Pressure":
        forecastValue.textContent = dayData.main.pressure;
        break;
      case "Wind speed":
        forecastValue.textContent = dayData.wind.speed;
        break;
      default:
        forecastValue.textContent = dayData.main.humidity;
    }
    // You can set the initial value for each item

    forecastItem.appendChild(forecastTitle);
    forecastItem.appendChild(forecastValue);

    container.appendChild(forecastItem);
  });
  return container;
}

function getDayData(date, noOfDays, data) {
  const dayDate = addDays(date, noOfDays);
  console.log(`dayDate = ${dayDate}`);

  let dayData;

  data.list.forEach((dataOfDay) => {
    const dt = new Date(dataOfDay.dt * 1000);

    if (isEqual(dt, dayDate)) {
      dayData = dataOfDay;
      console.log(dayData);
    }
  });

  return dayData;
}

export default function buildForecast(data) {
  const forecastContent = document.getElementById("forecast-content");
  forecastContent.replaceChildren();

  const date = new Date(data.list[0].dt * 1000);

  console.log(date);

  for (let day = 1; day <= 3; day += 1) {
    const dayData = getDayData(date, day, data);
    const forecastDay = createForecastDay(day, dayData);
    forecastContent.appendChild(forecastDay);
  }
}
