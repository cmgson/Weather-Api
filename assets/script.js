$latRelay = "";
$lonRelay = "";
$grabCity = "";

$todaysDate = moment().format("LL");
$("#currentDate").text($todaysDate);

$apiKey = "9ec8fa29518e4540182f9fb78ea5599d";

$buttons = $(".cityBtn");
$paintCity = $("#city");
$paintTemp = $("#temp");
$paintHumid = $("#humidity");
$paintWind = $("#wind");
$paintUVI = $("#index");
$fiveDay = $(".fiveDay");
$searchBtn = $("#searchBtn");
$searchField = $("#searchField");
$weatherReport = $("#weatherReport");
$cityArray = JSON.parse(localStorage.getItem("cities"));
// hide until populated
// console.log($cityArray[0]);
// window.onload = weatherDisplay($cityArray[0]);
$fiveDay.hide();
$weatherReport.hide();
// var cities = JSON.parse(localStorage.getItem("cities"));
if ($cityArray != null) {
  for (var i = 0; i < $cityArray.length; i++) {
    $createButton = $("<div>");
    $createButton.addClass("divRender");
    $createButton.attr("data-city", $cityArray[i]);

    var p = $("<p>").text($cityArray[i]);
    $createButton.append(p);
    console.log($createButton);
    $("#results").prepend($createButton);
    
  }
  weatherDisplay($cityArray[$cityArray.length-1]);
} else {
  $cityArray = [];
}

function weatherDisplay($grabCity) {
  // event.preventDefault();

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
    // console.log($latRelay);
    // console.log($lonRelay);
    // console.log(response);
    $oneCallUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      $latRelay +
      "&lon=" +
      $lonRelay +
      "&units=imperial" +
      "&appid=" +
      $apiKey;
    // console.log(response.name);
    $paintCity.text(response.name);

    $.ajax({
      url: $oneCallUrl,
      method: "GET",
    }).then(function (response) {
      var uvi = response.current.uvi;
      $paintTemp.html("Temperature: " + response.current.temp + "&deg F");
      $paintHumid.text("Humidity: " + response.current.humidity + " %");
      $paintWind.text("Wind Speed: " + response.current.wind_speed + " MPH");
      $paintUVI.text("UV Index: " + response.current.uvi);
      console.log(uvi);
      console.log($paintUVI);
      if (uvi <= 2) {
        $paintUVI.css("background-color", "green");
      } else if (uvi >= 3 && uvi < 5) {
        $paintUVI.css("background-color", "yellow");
      } else if (uvi >= 6 && uvi < 8) {
        $paintUVI.css("background-color", "purple");
      }

      //set up arrays for all data from the response
      $dates = [];
      $dailyIcons = [];
      $dailyTemp = [];
      $dailyHumidity = [];
      $forecastIcons = $(".icons");
      $forecastTemp = $(".forecastTemp");
      $forecastHumidty = $(".forecastHumidity");
      $forecastDate = $(".forecastDate");
      var iconUrl = "https://openweathermap.org/img/wn/";

      //for loops to populate arrays
      for (var i = 1; i < 6; i++) {
        $saveTemp = response.daily[i].temp.day;
        $dailyTemp.push($saveTemp);
      }

      console.log($dailyTemp);
      $forecastTemp.each(function (index) {
        $(this).html("Temp : " + $dailyTemp[index] + "&deg");
      });

      for (var i = 1; i < 6; i++) {
        $saveIcons = response.daily[i].weather[0].icon;
        $dailyIcons.push($saveIcons);
      }

      console.log($dailyIcons);
      $forecastIcons.each(function (index) {
        $(this).attr("src", iconUrl + $dailyIcons[index] + ".png");
      });

      for (var i = 1; i < 6; i++) {
        $saveHumidity = response.daily[i].humidity;
        $dailyHumidity.push($saveHumidity);
      }

      $forecastHumidty.each(function (index) {
        $(this).html("Humidity : " + $dailyHumidity[index] + "&deg");
      });

      for (var i = 1; i < 6; i++) {
        $saveDate = response.daily[i].dt;
        $dateString = moment.unix($saveDate).format("MM/DD/YYYY");
        $dates.push($dateString);
      }
      console.log($dates);

      $forecastDate.each(function (index) {
        $(this).text($dates[index]);
      });

      $fiveDay.show();
      $weatherReport.show();
    });
  });
  console.log("this is the city array---" + $cityArray);
  localStorage.setItem("cities", JSON.stringify($cityArray));
  // localStorage.setItem("");
}

//click event for search button that triggers the ajax routine
$searchBtn.on("click", function () {
  $grabCity = $("#searchField").val();

  $cityArray.push($grabCity);
  // console.log($grabCity);
  $createButton = $("<div>");
  $createButton.addClass("divRender");
  $createButton.attr("data-city", $grabCity);

  var p = $("<p>").text($grabCity);
  $createButton.append(p);

  $("#results").prepend($createButton);
  weatherDisplay($grabCity);
});

$(document).on("click", ".divRender", function (e) {
  weatherDisplay($(this).text());
});
