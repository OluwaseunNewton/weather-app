function showDay(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let dayIndex = date.getDay();
  let day = days[dayIndex];
  return `${day} ${hour}:${minutes}`;
}
let now = new Date();
let currentDay = document.querySelector(".current-day");
currentDay.innerHTML = showDay(now);

function showCityTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

function enterCity(event) {
  event.preventDefault();
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let unit = "metric";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCityTemp);
}

let form = document.querySelector("#form-control");
form.addEventListener("submit", enterCity);
