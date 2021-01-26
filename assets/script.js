$latRelay = "";
$lonRelay = "";
$grabCity = "";
// $currentDate = ('#currentDate');
$todaysDate = moment().format('LL');
('#currentDate').text($todaysDate);

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
$weatherReport = $('#weatherReport');
// $grabCity = $('#searchField').val();
// console.log($grabCity);
// console.log($queryUrl);
// console.log($fiveDay);
$fiveDay.hide();
$weatherReport.hide();
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

      $dates = [];
      $dailyIcons = [];
      $dailyTemp = [];
      $dailyHumidity = [];
      $forecastIcons = $('.icons');
      $forecastTemp = $('.forecastTemp');
      $forecastHumidty = $('.forecastHumidity');
      $forecastDate = $('.forecastDate');
      var iconUrl = 'http://openweathermap.org/img/wn/';

      for (var i = 0; i < 5; i++) {
        $saveTemp = response.daily[i].temp.day;
        $dailyTemp.push($saveTemp);
      };

      console.log($dailyTemp);
      $forecastTemp.each(function(index){
        $(this).html('Temp : ' + $dailyTemp[index] + '&deg');
      });

      for (var i = 0; i < 5; i++) {
        $saveIcons = response.daily[i].weather[0].icon;
        $dailyIcons.push($saveIcons);

      };
      
      console.log($dailyIcons);
      $forecastIcons.each(function(index){
        $(this).attr('src', iconUrl + $dailyIcons[index] + '.png');
      });

      for (var i = 0; i < 5; i++) {
        $saveHumidity = response.daily[i].humidity;
        $dailyHumidity.push($saveHumidity);
      };

      $forecastHumidty.each(function(index){
        $(this).html('Humidity : ' + $dailyHumidity[index] + '&deg');
      });

      for (var i = 0; i < 5; i++) {
        $saveDate = response.daily[i].dt;
        $dateString = moment.unix($saveDate).format("MM/DD/YYYY");
        $dates.push($dateString);
      };
      console.log($dates);

      $forecastDate.each(function(index){
        $(this).text($dates[index]);
        
      });
      
      
      $fiveDay.show();
      $weatherReport.show();







      
      
      
      
      // console.log(response.daily[0].temp.day);
      
      // $forecastTemp.each(function() {
      //   console.log($(this));
      //   for (var i = 0; i < 5; i++) {
      //     $dailytemp = ''
      //     $dailytemp = response.daily[i].temp.day;
      //     $(this).text($dailytemp);
      //     console.log($dailytemp);
      //     // console.log(response.daily[i].temp.day);
      //   };  
        
      // }); 
      // for (var i= 0; i<5; i++) {
      //   console.log($(this));
      //   $dailytemp = response.daily[i].temp.day;
      //   console.log($dailytemp);
      //   $('.forecastTemp').each($dailytemp);
    
    });
  });
  console.log(moment().format("MM/DD/YYYY"));
});
