window.addEventListener("load", () => {
  let long;
  let lat;
  let region = document.querySelector('.location');
  let weatherIcon = document.querySelector('.icon');
  let temp = document.querySelector('.temp');
  let brief = document.querySelector('.summary');
  let humid = document.querySelector('.humidity');
  let hourlyDetails = document.querySelector('.details');
  let wind = document.querySelector('.wind');
  const convertToF = document.querySelector('.fahrenheit');
  const convertToC = document.querySelector('.celsius');

  // CORS error fix
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  // geolocation api
  const location = `http://api.ipstack.com/check?access_key=f0354aa3564a469fd9cdcaa6bd244022`;

  fetch(location)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // console.log(data);
      lat = data.latitude;
      long = data.longitude;
      city = data.city;
      state = data.region_code;

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

      convertToF.addEventListener('click', event => {
        temp.innerHTML = `${Math.round(temperature)}<i class="wi wi-fahrenheit"></i>`
      });

      convertToC.addEventListener('click', event => {
        temp.innerHTML = `${Math.round((temperature - 32) * 5 / 9)}<i class="wi wi-celsius"></i>`
      });
    })
    .catch(error => {
      console.log('Request failed', error);
    });
})