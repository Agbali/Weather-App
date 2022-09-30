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

//create a function that will change the h1 country to the country the user will search for
//Then the temperature of that country is called

//ANother function to be called when the user wants to get the temperature for his/her current location
//Same function but this time the navigator geolocation function is called
function giveTemp(response){
    //receives response from the weather API 
    console.log(response.data.weather[0].description);
    console.log(response.data.main);
    
    let degrees = Math.round(response.data.main.temp);
    //let roundOff = Math.round(response.data.main.temp);
    let h2 = document.querySelector("#symbol");
    let locationname = document.querySelector("#lagosHaiD");
    let iconElement = document.querySelector("#w-icon");
    let winddir = document.querySelector("#windeck");
    let humid = document.querySelector("#humidity");
    //let searchedCountry = document.querySelector(".removeColor");

    celsiusTemp = Math.round(response.data.main.temp);
    //searchedCountry.innerHTML = `${degrees}°`;
    humid.innerHTML = Math.round(response.data.main.humidity)
    winddir.innerHTML = response.data.wind.speed;
    locationname.innerHTML = `${response.data.name}`;
    h2.innerHTML = `${degrees}°`;
    iconElement.setAttribute(
        "src", 
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
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
        // calls the loadTemp function with this value passed into it
 }

 function changeToFahrenheit(event){
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
    
    celsiusLink.classList.remove("inCelsius");
    FahrenheitLink.classList.add("inCelsius");
    
    
    let temperatureElement = document.querySelector("#symbol");
    temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
    //alert(fahrenheitTemperature);
 }

 function changeBackCelcius(event){
    event.preventDefault();

    celsiusLink.classList.add("inCelsius");
    FahrenheitLink.classList.remove("inCelsius");

    let celsiusDegree = document.querySelector("#symbol");
    celsiusDegree.innerHTML = `${celsiusTemp}°`;

 }

 let celsiusTemp = null;
//This selects the form itself as a document
let form = document.querySelector("#search-form");
//Add event listener to help you choose what you want your program to do
form.addEventListener("submit", searchLocation); 

let celsiusLink = document.querySelector("#Celsius-link");
celsiusLink.addEventListener("click", changeBackCelcius);

let FahrenheitLink = document.querySelector("#Fahrenheit-link");
FahrenheitLink.addEventListener("click", changeToFahrenheit);

searchCity("Lagos");




// function tempButton(position){
//     //This data of longitude and latitude is provided by the geolocation navigator and is
//     //passed to the API as strings.
//     let apiKey = "76a578de3ab86388efb5bf00ea5c9bf1";
//     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

//     //axios helps to use the API then calls the giveTemp function above
//     axios.get(apiUrl).then(giveTemp);
// }
// //navigator function is nested in this function
// function temperateRedir(){
//     navigator.geolocation.getCurrentPosition(tempButton);
// }

// //listens to the button html element
// let buttonClick = document.querySelector("button");
// buttonClick.addEventListener("click", temperateRedir);