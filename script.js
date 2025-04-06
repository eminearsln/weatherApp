const cityInput = document.querySelector(".inputText");
const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  getData(cityInput.value);
});

function getData(name) {
  //api key tanımalama
  const API = "34dcf48fa5c6ad2ed862607dc228bc47";
  //baseurl tanımlama
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}&units=metric`;

  //fetch ile promise döndür
  fetch(baseURL)
    .then((res) => res.json())
    .then((data) => {
      const {
        name,
        sys: { country },
        main: { temp, feels_like, humidity },
        wind: { speed },
        weather: [{ description }],
      } = data;

      const city = document.querySelector("#city");
      const temprature = document.querySelector("#temprature");
      const weather = document.querySelector("#weather");
      const feel = document.querySelector("#feel");
      const hum = document.querySelector("#humidity");
      const wind = document.querySelector("#wind");

      city.textContent = `${name}, ${country}`;
      temprature.textContent = `${temp}°C`;
      weather.textContent = description;
      feel.textContent = `Feels like: ${feels_like}°C`;
      hum.textContent = `Humidity: ${humidity}%`;
      wind.textContent = `Wind Speed: ${speed} m/s`;
      //hava durumu resimlerini ekleme
      console.log(data.weather[0].main);
      changeBackground(
        data.weather[0].main,
        data.weather[0].description,
        data.main.temp,
        data.wind.speed
      );
    })
    .catch((err) => console.log(err));

  cityInput.value = "";
  cityInput.focus();
}
function changeBackground(weather, description, temp, windSpeed) {
  if (windSpeed > 8) {
    // 8 m/s üstü rüzgarlı hava
    document.body.style.backgroundImage = "url('img/windy.gif')";
  } else if (description.toLowerCase().includes("snow") || temp <= 0) {
    document.body.style.backgroundImage = "url('img/snowy.webp')";
  } else {
    switch (weather) {
      case "Clear":
        document.body.style.backgroundImage = "url('img/sunny.gif')";
        break;
      case "Rain":
        document.body.style.backgroundImage = "url('img/rainy.webp')";
        break;
      case "Clouds":
        document.body.style.backgroundImage = "url('img/cloudy.gif')";
        break;
      case "Snow":
        document.body.style.backgroundImage = "url('img/snowy.webp')";
        break;
      default:
        document.body.style.backgroundImage = "url('img/sky.jpg')";
    }
  }

  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}
