// console.log("hey main")

// const apiUrl = `https://api.weatherapi.com/v1/current.json?q="Barrie"&key=21ad1efc31614a2984f213600251106`;

// async function getCurrentWeather() {
//     const apiRes = await fetch(apiUrl)
//     const result = await apiRes.json();

//     const currentTempInCelcius = result.current.temp_c;
//     const cityName = result.location.name;
//     const countryName = result.location.country;
//     const icon = result.current.condition.icon;
//     const text = result.current.condition.text;


//     const placeHolder = document.querySelector("#weather-info")
//     placeHolder.innerHTML = `
//         <p>Right now it is ...</p>
//         <p>${cityName}, ${countryName}</p>
//         <p>${currentTempInCelcius} C <img src="${icon}" alt="${text}"/>${text}</p>
        
//     `   

//     //console.log('countryName; ', countryName)
//     //console.log('api response: ', JSON.stringify(result))
// }

// getCurrentWeather();


console.log("🌍 Timezone checker loaded");

const apiKey = "21ad1efc31614a2984f213600251106";
const select = document.getElementById("location");
const display = document.getElementById("timezone-info");

async function fetchTimezone(city) {
  display.innerHTML = `<p>⏳ Loading timezone info for <strong>${city}</strong>...</p>`;
  try {
    const url = `https://api.weatherapi.com/v1/timezone.json?key=${apiKey}&q=${encodeURIComponent(city)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.location) {
      display.innerHTML = `
        <h2>📍 ${data.location.name}, ${data.location.country}</h2>
        <p><strong>Region:</strong> ${data.location.region}</p>
        <p><strong>Timezone:</strong> ${data.location.tz_id}</p>
        <p><strong>Local Time:</strong> ${data.location.localtime}</p>
      `;
    } else {
      display.innerHTML = `<p>⚠️ No timezone info found for <strong>${city}</strong>.</p>`;
    }
  } catch (err) {
    console.error("Error fetching timezone:", err);
    display.innerHTML = `<p>⚠️ Error fetching timezone data. Please try again later.</p>`;
  }
}

// Default city
fetchTimezone(select.value);

// Update on change
select.addEventListener("change", () => {
  fetchTimezone(select.value);
});
