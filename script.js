var appid = "8a0fc341115d8ed1ea196c14346ad21d";

$(document).ready(function() {
  var getLocation = $.getJSON("https://freegeoip.net/json/");
  getLocation.done(function() {
   var location = getLocation.responseJSON.city;
   getWeather(location);
  });

  function getWeather(myLocation) {
      var url = "http://api.openweathermap.org/data/2.5/weather?q=" + myLocation + '&appid=' + appid;
      var requestWeather = $.getJSON(url);
      requestWeather.done(function() {
        $('#location').html(requestWeather.responseJSON.name);
        $('#icon').html("<i class='wi wi-owm-" + requestWeather.responseJSON.weather[0].id + "'" + "></i>" + " " + requestWeather.responseJSON.weather[0].description);
        var f = fahrenheit(requestWeather.responseJSON.main.temp) + '&deg;F';
        var flh = '<span class="low">' + fahrenheit(requestWeather.responseJSON.main.temp_min) + '&deg;F' + '</span>' + ' ' + '<img src="img/temp-bar.png">' + ' ' + '<span class="high">' + fahrenheit(requestWeather.responseJSON.main.temp_max) + '&deg;F' + '</span>';
        var c = celsius(requestWeather.responseJSON.main.temp) + '&deg;C';
        var clh = '<span class="low">' + celsius(requestWeather.responseJSON.main.temp_min) + '&deg;C' + '</span>' + ' ' + '<img src="img/temp-bar.png">' + ' ' + '<span class="high">' + celsius(requestWeather.responseJSON.main.temp_max) + '&deg;C' + '</span>';
        $('#temperature').html(f);
        $('#lowhigh').html(flh);
        $('#details').html('<i class="wi wi-strong-wind"></i>' + ' ' + Math.round(requestWeather.responseJSON.wind.speed) + ' ' + 'm/s' + '&nbsp;' + '&nbsp;' + '<i class="wi wi-humidity"></i>' + ' ' + requestWeather.responseJSON.main.humidity);

        $('.f').on('click', function() {
          $('#temperature').html(f);
          $('#lowhigh').html(flh);
        });

        $('.c').on('click', function() {
          $('#temperature').html(c);
          $('#lowhigh').html(clh);
        });
      });
    };


  function fahrenheit(kelvin){
      return Math.round(kelvin * (9/5) - 459.67);
  };

  function celsius(kelvin){
      return Math.round(kelvin - 273.15);
  };
});
