const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const icon = document.getElementById("icon");
const toggleUnitBtn = document.getElementById("toggleUnit");

let currentTempCelsius = null;
let isCelsius = true;

// Fetch weather data
async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    
    // Update UI
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    description.textContent = data.weather[0].description;
    currentTempCelsius = data.main.temp;
    temperature.textContent = `${currentTempCelsius.toFixed(1)} °C`;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    weatherInfo.classList.remove("hidden");
    isCelsius = true;
  } catch (error) {
    alert(error.message);
    weatherInfo.classList.add("hidden");
  }
}

// Toggle temperature unit
toggleUnitBtn.addEventListener("click", () => {
  if (currentTempCelsius === null) return;
  if (isCelsius) {
    const tempF = (currentTempCelsius * 9/5) + 32;
    temperature.textContent = `${tempF.toFixed(1)} °F`;
    isCelsius = false;
  } else {
    temperature.textContent = `${currentTempCelsius.toFixed(1)} °C`;
    isCelsius = true;
  }
});

// Search button click
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

// Enter key press
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  }
});
