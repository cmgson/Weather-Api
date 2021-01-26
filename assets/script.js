$latRelay = "";
$lonRelay = "";
$grabCity = "";
$forecastTemp = $('.forecastTemp');

// $city = "minneapolis";
$apiKey = "9ec8fa29518e4540182f9fb78ea5599d";
// $queryUrl =
//   "https://api.openweathermap.org/data/2.5/weather?q=" +
//   $grabCity +
//   "&units=imperial&appid=" +
//   $apiKey;
$paintCity = $("#city");
$paintTemp = $("#temp");
$paintHumid = $("#humidity");
$paintWind = $("#wind");
$paintUVI = $("#index");
$fiveDay = $(".fiveDay");
$searchBtn = $("#searchBtn");
$searchField = $("#searchField");
// $grabCity = $('#searchField').val();
// console.log($grabCity);
// console.log($queryUrl);
// console.log($fiveDay);
// $fiveDay.hide();
$searchBtn.on("click", function () {
  event.preventDefault();
  $grabCity = $("#searchField").val();
  console.log($grabCity);
  $queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    $grabCity +
    "&units=imperial&appid=" +
    $apiKey;

  $.ajax({
    url: $queryUrl,
    method: "GET",
  }).then(function (response) {
    $latRelay = response.coord.lat;
    $lonRelay = response.coord.lon;
    console.log($latRelay);
    console.log($lonRelay);
    console.log(response);
    $oneCallUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      $latRelay +
      "&lon=" +
      $lonRelay +
      "&units=imperial" +
      "&appid=" +
      $apiKey;
    console.log(response.name);
    $paintCity.text(response.name);

    $.ajax({
      url: $oneCallUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $paintTemp.html("Temperature: " + response.current.temp + "&deg F");
      $paintHumid.text("Humidity: " + response.current.humidity + " %");
      $paintWind.text("Wind Speed: " + response.current.wind_speed + " MPH");
      $paintUVI.text("UV Index: " + response.current.uvi);
      // console.log(response.daily[0].temp.day);
      
      $forecastTemp.each(function() {
        
        for (var i = 0; i < 5; i++) {
          $dailytemp = '';
          $dailytemp = response.daily[i].temp.day;
          $(this).text($dailytemp);
          console.log($dailytemp);
          // console.log(response.daily[i].temp.day);
        };  
        
      }); 
      // for (var i= 0; i<5; i++) {
      //   console.log($(this));
      //   $dailytemp = response.daily[i].temp.day;
      //   console.log($dailytemp);
      //   $('.forecastTemp').each($dailytemp);
    
    });
  });
});
