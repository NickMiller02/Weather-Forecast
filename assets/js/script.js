$(document).ready(function() {
    

    //Current Date and Time
    var currentTime = moment().format("1");

    var day1 = moment().add(1, "days").format("1");
    var day2 = moment().add(2, "days").format("1");
    var day3 = moment().add(3, "days").format("1");
    var day4 = moment().add(4, "days").format("1");
    var day5 = moment().add(5, "days").format("1");

    var city;
    var cities;

    //Use the API key for the user's city

    function searchAPI() {

        //Pull data through API
        var url = "api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=634acc0fc148f9611178a5b8473c16f7";
        var coords = [];


        //Breaking down data to be used
        $.ajax({
            url: queryURL,
            method: "GET",
          }).then(function (response) {

            //Data for user's city
            coords.push(response.coord.lat);
            coords.push(response.coord.lon);
            var cityName = response.name;
            var cityTemp = response.main.temp;
            var cityHum = response.main.humidity;
            var cityWind = response.wind.speed;
            var icon = response.weather[0].icon;

            //Setting user's data for city
            $("#icon").html(
              `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
            );
            $("#city-name").html(cityName + " " + "(" + NowMoment + ")");
            $("#currentTemp").text("Current Temp (F): " + cityTemp.toFixed(1));
            $("#currentHumid").text("Humidity: " + cityHum + "%");
            $("#currentWind").text("Wind Speed: " + cityWind + "mph");
            $("#date1").text(day1);
            $("#date2").text(day2);
            $("#date3").text(day3);
            $("#date4").text(day4);
            $("#date5").text(day5);
      
            getWeather(response.coord.lat, response.coord.lon);
          }).fail(function (){

            alert("Could not get data")

          });
      
    }


    //5 day forecast
    function getWeather(lat, lon) {
     
        //Pull data through API using lat and lon
        $.ajax({
          url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + "&units=imperial&appid=634acc0fc148f9611178a5b8473c16f7",
          method: "GET",
        }).then(function (response) {
  
          //
          let uvIndex = response.current.uvi;
          $("#uv-index").text("UV Index:" + " " + uvIndex);
          if (uvIndex >= 8) {
            $("#uv-index").css("color", "red");
          } else if (uvIndex > 4 && uvIndex < 8) {
            $("#uv-index").css("color", "yellow");
          } else {
            $("#uv-index").css("color", "green");
          }
          let cityHigh = response.daily[0].temp.max;
          $("#high").text("Expected high (F): " + " " + cityHigh);
  
          //forecast temp variables
          var day1temp = response.daily[1].temp.max;
          var day2temp = response.daily[2].temp.max;
          var day3temp = response.daily[3].temp.max;
          var day4temp = response.daily[4].temp.max;
          var day5temp = response.daily[5].temp.max;
          //forecast humidity variables
          var day1hum = response.daily[1].humidity;
          var day2hum = response.daily[2].humidity;
          var day3hum = response.daily[3].humidity;
          var day4hum = response.daily[4].humidity;
          let day5hum = response.daily[5].humidity;
          //forecast weather icon variables
          var icon1 = response.daily[1].weather[0].icon;
          var icon2 = response.daily[2].weather[0].icon;
          var icon3 = response.daily[3].weather[0].icon;
          var icon4 = response.daily[4].weather[0].icon;
          var icon5 = response.daily[5].weather[0].icon;
          //
          $("#temp1").text("Temp(F):" + " " + day1temp.toFixed(1));
          $("#temp2").text("Temp(F):" + " " + day2temp.toFixed(1));
          $("#temp3").text("Temp(F):" + " " + day3temp.toFixed(1));
          $("#temp4").text("Temp(F):" + " " + day4temp.toFixed(1));
          $("#temp5").text("Temp(F):" + " " + day5temp.toFixed(1));
  
          $("#hum1").text("Hum:" + " " + day1hum + "%");
          $("#hum2").text("Hum:" + " " + day2hum + "%");
          $("#hum3").text("Hum:" + " " + day3hum + "%");
          $("#hum4").text("Hum:" + " " + day4hum + "%");
          $("#hum5").text("Hum:" + " " + day5hum + "%");
  
          $("#icon1").html(
            `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png">`
          );
          $("#icon2").html(
            `<img src="http://openweathermap.org/img/wn/${icon2}@2x.png">`
          );
          $("#icon3").html(
            `<img src="http://openweathermap.org/img/wn/${icon3}@2x.png">`
          );
          $("#icon4").html(
            `<img src="http://openweathermap.org/img/wn/${icon4}@2x.png">`
          );
          $("#icon5").html(
            `<img src="http://openweathermap.org/img/wn/${icon5}@2x.png">`
          );
        });
      }
    }

)