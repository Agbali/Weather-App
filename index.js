function myDates (){
    let now = new Date();

    let day = ["Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"];

    let minutes = now.getMinutes().toLocaleString();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    let hours = now.getHours();
    if (hours < 10){
        hours = `0${hours}`;
    }
    let days = day[now.getDay()];

    let h3 = document.querySelector("#theDate");
    h3.innerHTML = `${days} ${hours}:${minutes}`;

}

myDates();

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(coordinates){
    console.log(coordinates);

    let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lat}&exclude=hourly,&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(weatherForecast);
}

function weatherForecast(response){

    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecasting");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index){
    if(index < 6){
        forecastHTML = 
            forecastHTML + 
            `
            <div class="col-2 content">
                <div class="row">
                   ${formatDay(forecastDay.dt)}
                </div>
                <img
                    src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="82"
                    class="row"
                </>
                <div class="row">
                    ${Math.round(forecastDay.temp.max)}°
                </div>      
            </div>
        `;
    }
        
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

//create a function that will change the h1 country to the country the user will search for
//Then the temperature of that country is called

//ANother function to be called when the user wants to get the temperature for his/her current location
//Same function but this time the navigator geolocation function is called
function giveTemp(response){
    //receives response from the weather API     
    let degrees = Math.round(response.data.main.temp);
    //let roundOff = Math.round(response.data.main.temp);
    let h2 = document.querySelector("#symbol");
    let locationname = document.querySelector("#lagosHaiD");
    let iconElement = document.querySelector("#w-icon");
    let winddir = document.querySelector("#windeck");
    let humid = document.querySelector("#humidity");
    let weathDiscrip = document.querySelector("#weatherDescr")
    //let searchedCountry = document.querySelector(".removeColor");

    celsiusTemp = Math.round(response.data.main.temp);
    weathDiscrip.innerHTML = response.data.weather[0].description;
    humid.innerHTML = Math.round(response.data.main.humidity)
    winddir.innerHTML = response.data.wind.speed;
    locationname.innerHTML = `${response.data.name}`;
    h2.innerHTML = `${degrees}°`;
    iconElement.setAttribute(
        "src", 
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );

    displayForecast(response.data.coord);
}

function searchCity(city) {
    
    let apiKey1 = "76a578de3ab86388efb5bf00ea5c9bf1";
    let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey1}&units=metric`;
    
    axios.get(apiUrl2).then(giveTemp);
}

function searchLocation(event){
    event.preventDefault();
    //enter for the Enter key on your keyboard
    let countryInput = document.querySelector("#search-box");
    searchCity(countryInput.value);    
        // calls the searchCity function with this value passed into it

    let libyaInfo = document.querySelector("#libyarr");
    searchCity(libyaInfo.value);
    
 }

let celsiusTemp = null;
//This selects the form itself as a document
let form = document.querySelector("#search-form");
//Add event listener to help you choose what you want your program to do
form.addEventListener("submit", searchLocation); 


searchCity("Lagos");

