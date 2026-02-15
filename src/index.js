function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

let searchBar = document.getElementById("search-form");
let searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let city = searchInput.value.trim();
  if (!city) return;

  searchCity(city);
});

let apiKey = "acbod87f7ctb68340e47b7b3abe9ae79";

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateInfo);
}

function updateInfo(response) {
  let city = response.data.city;
  let description = response.data.condition.description;
  let humid = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let temperature = Math.round(response.data.temperature.current);

  document.querySelector("#current-city").innerHTML = city;
  document.querySelector("#description").innerHTML = description;
  document.querySelector("#humidity").innerHTML = humid;
  document.querySelector("#wind").innerHTML = wind;
  document.querySelector("#temperature").innerHTML = temperature;
}
