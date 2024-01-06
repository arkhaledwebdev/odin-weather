import buildForecast from "./builders/forecastBuilder";
import API_KEY from "./secrets";

export default async function getForecast(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
    );
    const data = await response.json();

    console.log(data);

    buildForecast(data);
  } catch (error) {
    console.error(error);
  }
}
