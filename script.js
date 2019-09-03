window.addEventListener("load", () => {
  let long;
  let lat;
  let temp = document.querySelector('.temp');
  let brief = document.querySelector('.summary');
  let humid = document.querySelector('.humidity');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // CORS error fix
      const proxy = 'https://cors-anywhere.herokuapp.com/'
      // darksky api for weather data
      const api = `${proxy}https://api.darksky.net/forecast/4c98d3415ce255120bf31fb7a5d00b48/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, humidity } = data.currently;
          temp.textContent = temperature;
          brief.innerHTML = summary;
          humid.textContent = humidity;
        });
    });
  }
});