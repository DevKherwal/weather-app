const searchForm = document.querySelector("#searchForm");
const cityInput = document.querySelector("#cityInput");
const message = document.querySelector("#message");
const result = document.querySelector("#result");

function getWeatherText(code) {
    if (code === 0) return "Clear sky";
    if (code <= 3) return "Partly cloudy";
    if (code === 45 || code === 48) return "Foggy";
    if (code >= 51 && code <= 57) return "Drizzle";
    if (code >= 61 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Rain showers";
    if (code >= 85 && code <= 86) return "Snow showers";
    if (code >= 95) return "Thunderstorm";
    return "Unknown";
}

searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        message.textContent = "Please enter a city name.";
        return;
    }

    message.textContent = "Loading...";
    result.innerHTML = "";

    try {
        const geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(city) + "&count=1";
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            message.textContent = "City not found. Try another name.";
            return;
        }

        const place = geoData.results[0];

        const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + place.latitude + "&longitude=" + place.longitude + "&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto";
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        const title = document.createElement("h2");
        title.textContent = place.name + ", " + place.country;

        const temp = document.createElement("p");
        temp.textContent = "Temperature: " + current.temperature_2m + " °C";

        const condition = document.createElement("p");
        condition.textContent = "Condition: " + getWeatherText(current.weather_code);

        const wind = document.createElement("p");
        wind.textContent = "Wind: " + current.wind_speed_10m + " km/h";

        result.appendChild(title);
        result.appendChild(temp);
        result.appendChild(condition);
        result.appendChild(wind);

        message.textContent = "";
    } catch (error) {
        message.textContent = "Something went wrong. Check your internet and try again.";
    }
});