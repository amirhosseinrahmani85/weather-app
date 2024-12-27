import getWeaderData from "./utils/httpReq.js";
import { removeModal, showModal } from "./utils/modal.js";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const loader = document.getElementById("loader");
const locataionIcon = document.getElementById("location");
const forecastContainer = document.getElementById("forecast");
const modalButton = document.getElementById("modal-button");

const renderCurrentWeather = (data) => {
  if (!data) return;
  const weatherJSX = `
  <h1>${data.name},${data.sys.country}</h1>
  <div id="main">
  <img src="https://api.openweathermap.org/img/w/${
    data.weather[0].icon
  }.png" alt="weather icon" />
  <span>${data.weather[0].main}</span>
  <p>${Math.round(data.main.temp)} °C</p>
  </div>
  <div id="info">
    <p>Humidity: <span>${data.main.humidity} %</span> </p>
    <p>Wind Speed: <span>${data.wind.speed} m/s</span> </p>
  </div>
  `;
  weatherContainer.innerHTML = weatherJSX;
};

const getWeekDay = (date) => {
  return DAYS[new Date(date * 1000).getDay()];
};

const renderForecastWeather = (data) => {
  if (!data) return;
  forecastContainer.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((i) => {
    const forecastJSX = `
    <div>
    <img src="https://api.openweathermap.org/img/w/${
      i.weather[0].icon
    }.png" alt="weather icon" />
    <h3>${getWeekDay(i.dt)}</h3>
    <p>${Math.round(i.main.temp)} °C</p>
    <span>${i.weather[0].main}</span>
    </div>
    
    `;
    forecastContainer.innerHTML += forecastJSX;
  });
};

const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    showModal("plase Enter city Name!");
    return;
  }
  const currentData = await getWeaderData("current", cityName);
  renderCurrentWeather(currentData);
  const forecastData = await getWeaderData("forecast", cityName);
  renderForecastWeather(forecastData);
};

const positionCallbac = async (position) => {
  const currentData = await getWeaderData("current", position.coords);
  renderCurrentWeather(currentData);
  const forecastData = await getWeaderData("forecast", position.coords);
  renderForecastWeather(forecastData);
};

const errorCallbac = (error) => {
  showModal(error.message);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallbac, errorCallbac);
  } else {
    showModal("Your browser does not support geolocation");
  }
};

const initHandler = async () => {
  const currentData = await getWeaderData("current", "khoy");
  renderCurrentWeather(currentData);
  const forecastData = await getWeaderData("forecast", "khoy");
  renderForecastWeather(forecastData);
};

searchButton.addEventListener("click", searchHandler);
locataionIcon.addEventListener("click", locationHandler);
modalButton.addEventListener("click", removeModal);
document.addEventListener("DOMContentLoaded", initHandler);
