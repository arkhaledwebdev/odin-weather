// eslint-disable-next-line import/no-extraneous-dependencies
import buildWeather from "./builders/weatherBuilder";
import API_KEY from "./secrets";

export default async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );
    const data = await response.json();

    console.log(data);

    buildWeather(data);
  } catch (error) {
    console.error(error);
  }
}
