function getData(response) {
  let now = new Date(response.data.time * 1000);
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

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayTimeElement = document.querySelector("#day-time");
  let dayTime = `${day}, ${hours}:${minutes}, `;
  dayTimeElement.innerHTML = dayTime;

  let cityElement = document.querySelector("#h1-city");
  let curCity = response.data.city;
  let curCountry = response.data.country;
  let cityValueStart = `${curCity}, ${curCountry}`;

  if (cityValueStart.length > 20) {
    cityElement.innerHTML = `${curCity},</br>${curCountry}`;
  } else {
    cityElement.innerHTML = `${curCity}, ${curCountry}`;
  }

  let curTemperatureElement = document.querySelector("#current-temperature");
  let curTemperature = Math.round(response.data.temperature.current);
  curTemperatureElement.innerHTML = curTemperature;

  let curIconElement = document.querySelector("#current-icon");
  let curIcon = response.data.condition.icon_url;
  curIconElement.innerHTML = `<img src="${curIcon}">`;

  let conditionDescriptionElement = document.querySelector(
    "#condition-description"
  );
  let conditionDescription = response.data.condition.description;
  conditionDescriptionElement.innerHTML = conditionDescription;

  let curHumidityElement = document.querySelector("#current-humidity");
  let curHumidity = `${Math.round(response.data.temperature.humidity)} %`;
  curHumidityElement.innerHTML = curHumidity;

  let curWindSpeedElement = document.querySelector("#curWindSpeed");
  let curWindSpeed = `${Math.round(response.data.wind.speed)} m/s`;
  curWindSpeedElement.innerHTML = curWindSpeed;
}

function searchCity(city) {
  let key = `7878d011dt257f603164ea9dcabco754`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;

  axios.get(apiUrl).then(getData);
}

function startSearchSubmit(answer) {
  answer.preventDefault();
  let searchForm = document.querySelector("#form-city");
  searchCity(searchForm.value);
}

let form = document.querySelector("#form1");
form.addEventListener("submit", startSearchSubmit);

searchCity("Helsinki");
