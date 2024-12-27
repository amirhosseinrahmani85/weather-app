import { showModal } from "./modal.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "d5f125854f74e64449723ded66c760b1";

const getWeaderData = async (type, data) => {
  let url = null;

  switch (type) {
    case "current":
      if (typeof data === "string") {
        url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}`;
      }

      break;
    case "forecast":
      if (typeof data === "string") {
        url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        url = `${BASE_URL}/forecast?lat=${data.latitude}&lan=${data.longitude}&appid=${API_KEY}&units=metric`;
      }
    default:
      url = `${BASE_URL}/weather?q=khoy&appid=${API_KEY}&units=metric`;
      break;
  }
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (+json.cod === 200) {
      return json;
    } else {
      showModal(json.message);
    }
  } catch (error) {
    console.log("An error occured when fetching data");
  }
};

export default getWeaderData;

// const getCurrentWeatherByName = async (city) => {
//   const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
//   const response = await fetch(url);
//   const json = response.json();
//   return json;
// };

// const getCurrentWeatherByCoordinates = async (lat, lon) => {
//   const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
//   const response = await fetch(url);
//   const json = response.json();
//   return json;
// };

// const getForecastWeatherByName = async (city) => {
//   const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
//   const response = await fetch(url);
//   const json = response.json();
//   return json;
// };

// const getForecastWeatherByCoordinates = async (lat, lan) => {
//   const url = `${BASE_URL}/forecast?lat=${lat}&lan=${lan}&appid=${API_KEY}&units=metric`;
//   const response = await fetch(url);
//   const json = response.json();
//   return json;
// };
