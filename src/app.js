function changeTime() {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
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
  let day = days[now.getDay()];

  let dayTime = document.querySelector("#day-time");
  dayTime.innerHTML = `${day} ${hour}:${minute}, `;
}
changeTime();

function getData(response) {
  let cityElement = document.querySelector("#h1-city");
  let curCity = response.data.city;
  let curCountry = response.data.country;
  let cityValueStart = `${curCity}, ${curCountry}`;

  if (cityValueStart.length > 20) {
    cityElement.innerHTML = `<font size="4">${curCity}, ${curCountry}</font>`;
  } else {
    cityElement.innerHTML = `<h1 class="current-city" id="h1-city">${curCity}, ${curCountry}</h1>`;
  }

  let curTemperatureElement = document.querySelector("#current-temperature");
  let curTemperature = Math.round(response.data.temperature.current);
  curTemperatureElement.innerHTML = curTemperature;

  let curIconElement = document.querySelector("#current-icon");
  let curIcon = response.data.condition.icon_url;
  curIconElement.innerHTML = `<img src="${curIcon}" alt="Icon" style="width: 40px; height: 40px; object-fit: none;"></img>`;

  let curHumidityElement = document.querySelector("#current-humidity");
  let curHumidity = Math.round(response.data.temperature.humidity);
  curHumidityElement.innerHTML = curHumidity;

  let curWindSpeedElement = document.querySelector("#curWindSpeed");
  let curWindSpeed = Math.round(response.data.wind.speed);
  curWindSpeedElement.innerHTML = curWindSpeed;
}

function changeWeather(answer) {
  answer.preventDefault();

  let searchForm = document.querySelector("#form-city");
  let city = `${searchForm.value}`;

  let key = `7878d011dt257f603164ea9dcabco754`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;

  axios.get(apiUrl).then(getData);
}

let form = document.querySelector("#form1");
form.addEventListener("submit", changeWeather);
