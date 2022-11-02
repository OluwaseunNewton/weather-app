function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    minutes = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
      <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
      <img
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temepature-max"> ${Math.round(
          forecastDay.temperature.maximum
        )}° </span>
        <span class="weather-forecast-temperature-min"> ${Math.round(
          forecastDay.temperature.minimum
        )}° </span>
      </div>
    </div>
    
   `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "39te550do00a1b7f4f7ed027cbfc823a";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayForecast);
}

function showCityTemp(response) {
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#current-temp").innerHTML =
    Math.round(celsiusTemperature);
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

  document.querySelector("#current-day").innerHTML = formatDate(
    response.data.time * 1000
  );

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "39te550do00a1b7f4f7ed027cbfc823a";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current?";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCityTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showcelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#form-control");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showcelsiusTemperature);

search("Ratshausen");
