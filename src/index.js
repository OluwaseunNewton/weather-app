function showDay(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let dayIndex = date.getDay();
  let day = days[dayIndex];
  return `${day} ${hour}:${minutes}`;
}
let now = new Date();
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = showDay(now);

function showCityTemp(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feel").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function enterCity(event) {
  event.preventDefault();
  let apiKey = "39te550do00a1b7f4f7ed027cbfc823a";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current?";
  let unit = "metric";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `${apiEndpoint}query=${city}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCityTemp);
}

let form = document.querySelector("#form-control");
form.addEventListener("submit", enterCity);
