const weatherApi = {
  key: "13ff43a0a4bc764cf513b079e444fbb5",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather?",
};

//Event Listener function on keypress
const searchInputBox = document.getElementById("input-box");
searchInputBox.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
  }
});

//get Weather report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

//show weather report
function showWeatherReport(weather) {
  console.log(weather);
  let city = document.getElementById("city");
  city.innerText = `${weather.name}  ,  ${weather.sys.country}`;
  let temp = document.getElementById("temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
  let minmaxTemp = document.getElementById("min-max");
  minmaxTemp.innerHTML = `${Math.floor(
    weather.main.temp_min
  )}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;
  let weatherType = document.getElementById("weather");
  weatherType.innerText = `${weather.weather[0].main}`;

  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);

  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url('images/clear.jpeg')";
    setIcons("Clear", document.getElementById("icon"));
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('images/clouds.jpeg')";
    setIcons("Clouds", document.getElementById("icon"));
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url('images/rain.jpeg')";
    setIcons("Rain", document.getElementById("icon"));
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url('images/snow.jpeg')";
    setIcons("Snow", document.getElementById("icon"));
  } else if (weatherType.textContent == "Thunderstorm") {
    document.body.style.backgroundImage = "url('images/thunderstorm.jpeg')";
    setIcons("Thunderstorm", document.getElementById("icon"));
  } else if (weatherType.textContent == "Fog") {
    document.body.style.backgroundImage = "url('images/thunderstorm.jpeg')";
    setIcons("Fog", document.getElementById("icon"));
  }
  else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url('images/clouds.jpeg')";
    setIcons("Haze", document.getElementById("icon"));
  } 
  else {
    document.body.style.backgroundImage = "url('images/smoke.jpg')";
    setIcons("Smoke", document.getElementById("icon"));
  }
}

// set icons
function setIcons(icon, iconId) {
  const skycons = new Skycons({ color: "orange" });
  if (icon == "Clear") skycons.add(iconId, Skycons.CLEAR_DAY);
  else if (icon == "Clouds") skycons.add(iconId, Skycons.PARTLY_CLOUDY_DAY);
  else if (icon == "Rain") skycons.add(iconId, Skycons.RAIN);
  else if (icon == "Snow") skycons.add(iconId, Skycons.SNOW);
  else if (icon == "Fog") skycons.add(iconId, Skycons.FOG);
  else if (icon == "Smoke") skycons.add(iconId, Skycons.PARTLY_CLOUDY_DAY);
  else if (icon == "Haze") skycons.add(iconId, Skycons.PARTLY_CLOUDY_DAY);
  else {
    skycons.add(iconId, Skycons.WIND);
  }
  skycons.play();
}

//date manage

function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];
  return `${date} ${month} ${day} ${year}`;
}
