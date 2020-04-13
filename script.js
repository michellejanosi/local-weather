window.addEventListener("load", () => {
  let long;
  let lat;
  let region = document.querySelector('.location');
  let weatherIcon = document.querySelector('.icon');
  let temp = document.querySelector('.temp');
  let brief = document.querySelector('.summary');
  let humid = document.querySelector('.humidity');
  let hourlyDetails = document.querySelector('.details');
  let alertInfo = document.querySelector('.alert-title');
  let wind = document.querySelector('.wind');
  const convertToF = document.querySelector('.fahrenheit');
  const convertToC = document.querySelector('.celsius');

  // CORS error fix
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  // geolocation api
  const location = `https://geo.ipify.org/api/v1?apiKey=at_JkK3xV24MvMkAG2YHc6l1xiFTNZlC`;

  fetch(location)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // console.log(data);
      lat = data.location.lat;
      long = data.location.lng;
      city = data.location.city;
      state = data.location.region;

      const weather = `${proxy}https://api.darksky.net/forecast/4c98d3415ce255120bf31fb7a5d00b48/${lat},${long}`;

      return fetch(weather);
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      // console.log(data);
      const { temperature, humidity, icon, windSpeed } = data.currently;
      const details = data.hourly.summary;

      region.innerHTML = city;
      weatherIcon.innerHTML = `<i class="wi wi-dark-sky-${icon}"></i>`
      temp.innerHTML = `${Math.round(temperature)}<i class="wi wi-fahrenheit"></i>`;
      humid.innerHTML = `${Math.round(humidity * 100)} <i class="wi wi-humidity"></i>`;
      wind.innerHTML = `${Math.round(windSpeed)} <i class="wi wi-strong-wind"></i>`
      hourlyDetails.textContent = details;
      convertToF.innerHTML = `<i class="wi wi-fahrenheit"></i>`;
      convertToC.innerHTML = `<i class="wi wi-celsius"></i>`;

      convertToF.addEventListener('click', event => {
        temp.innerHTML = `${Math.round(temperature)}<i class="wi wi-fahrenheit"></i>`
      });

      convertToC.addEventListener('click', event => {
        temp.innerHTML = `${Math.round((temperature - 32) * 5 / 9)}<i class="wi wi-celsius"></i>`
      });

      let alerts = data.alerts[0].title;

      if (typeof alerts == 'undefined') {
        alerts = null;
        alertInfo.style.display = "none";
      } else {
        alerts = data.alerts[0].title;
        alertInfo.textContent = alerts;
      }
    })
    .catch(error => {
      console.log('Request failed', error);
    })
});