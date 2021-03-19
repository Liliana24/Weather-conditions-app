const btnWeather = document.getElementById("btnWeather");
const txtCity = document.getElementById("txtCity");
const resultOut = document.getElementById("result");

btnWeather.onclick = function () {
  const city = txtCity.value;
  const apiKey = "fd9e9a3ca43dbe4de4177bfaf13556b3";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(url).then((response) => {
    response.json().then((json) => {
      let data = json;
      let output = formatResponse(data);
      resultOut.innerHTML = output;
    });
  });
};

function kelvinToCelcius(kTemp) {
  const cTemp = kTemp - 273.15;
  return cTemp;
}

function msToMPH(ms) {
  return ms * 2.237;
}

function formatResponse(data) {
  let conditions = "";
  if (data.weather.length > 1) {
    for (var i = 0; i < data.weather.length; i++) {
      conditions += data.weather[i].main;
      if (i != data.weather.length - 1) {
        conditions += " and ";
      }
    }
  } else {
    conditions += data.weather[0].main;
  }
  let out = `<h2>Current Conditions for ${data.name}</h2>
    <p><strong>Temperature:</strong> ${Math.round(
      kelvinToCelcius(data.main.temp)
    )}°C<br/>
    <p><strong>Humidity:</strong> ${data.main.humidity}%<br/>
    <p><strong>Pressure:</strong> ${data.main.pressure}mb<br/>
    <p><strong>Wind:</strong> ${data.wind.deg} degrees at ${msToMPH(
    Math.round(data.wind.speed)
  )} MPH<br/>
    <p>${conditions}</p>`;

  return out;
}
