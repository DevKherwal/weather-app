searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        message.textContent = "Please enter a city name.";
        return;
    }

    message.textContent = "Loading...";

    try {
        const geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(city) + "&count=1";
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        console.log(geoData);
        message.textContent = "";
    } catch (error) {
        message.textContent = "Something went wrong. Check your internet and try again.";
    }
});