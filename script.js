window.addEventListener("load", () => {
  let long;
  let lat;

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
        });
    });
  }
});