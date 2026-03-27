const apiKey = "616800875ac9dcefffdded0e97572da3";
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const city = button.getAttribute("data-city");
    document.getElementById("cityName").innerText = city;


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uz`)
      .then(response => response.json())
      .then(data => {
        document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";

        const translations = {
          "clear sky": "Ochiq osmon",
          "few clouds": "Oz bulutli",
          "scattered clouds": "Bulutli",
          "broken clouds": "Qisman bulutli",
          "overcast clouds": "To'liq bulutli",
          "light rain": "Yengil yomg'ir",
          "moderate rain": "O'rtacha yomg'ir",
          "heavy intensity rain": "Kuchli yomg'ir",
          "thunderstorm": "Momaqaldiroq",
          "snow": "Qor",
          "mist": "Tuman",
          "fog": "Qalin tuman",
          "haze": "Chang tuman",
          "drizzle": "Shim-shim yomg'ir",
        };

        const rawDesc = data.weather[0].description.toLowerCase();
        const desc = translations[rawDesc] || rawDesc;

        document.getElementById("desc").innerText = desc;

        document.getElementById("feels-like").innerHTML = "His qilinishi<br><span>" + Math.round(data.main.feels_like) + "°C</span>";

        document.getElementById("humidity").innerHTML = "Namlik<br><span>" + data.main.humidity + "%</span>";

        const windSpeed = (data.wind.speed * 3.6).toFixed(1);
        document.getElementById("wind-speed").innerHTML = "Shamol tezligi<br><span>" + windSpeed + " km/s</span>";

        const deg = data.wind.deg;
        const directions = ["Shimol", "Shimoli-sharq", "Sharq", "Janubi-sharq", "Janub", "Janubi-g'arb", "G'arb", "Shimoli-g'arb"];
        const direction = directions[Math.round(deg / 45) % 8];
        document.getElementById("wind-dir").innerHTML = "Yo'nalish <br><span>" + direction + "</span>";

        const sunrise = new Date(data.sys.sunrise * 1000);
        document.getElementById("sunrise").innerHTML = "Quyosh chiqishi<br><span>" +
          sunrise.getHours().toString().padStart(2, "0") + ":" +
          sunrise.getMinutes().toString().padStart(2, "0") + "</span>";

        const sunset = new Date(data.sys.sunset * 1000);
        document.getElementById("sunset").innerHTML = "Quyosh botishi<br><span>" +
          sunset.getHours().toString().padStart(2, "0") + ":" +
          sunset.getMinutes().toString().padStart(2, "0") + "</span>";
      })
      .catch(error => console.log("Xatolik:", error));
  });
});