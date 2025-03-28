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
      changeBackground(data.weather[0].main);
    })
    .catch((err) => console.log(err));

  cityInput.value = "";
  cityInput.focus();
}
function changeBackground(weather) {
  switch (weather) {
    case "Clear":
      document.body.style.backgroundImage = "url('img/sunny.jpeg')";
      break;
    case "Rain":
      document.body.style.backgroundImage = "url('img/rainy.jpeg')";
      break;
    case "Clouds":
      document.body.style.backgroundImage = "url('img/cloudy.jpeg')";
      break;
    case "Wind":
      document.body.style.backgroundImage = "url('img/windy.jpeg')";
      break;
    default:
      document.body.style.backgroundImage = "url('img/sky.jpg')";
  }
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}
