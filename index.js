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

function inputKeyUp(event){
//     //prevent default prevents the page from loading
           // 
//     //enter for the Enter key on your keyboard
    if (event.key == "Enter") {
        let h1 = document.querySelector("#lagosHaiD");
        h1.innerHTML = searchInput.value;
        event.preventDefault();
    
        // The search input value is put into a string and passed into the API's url
        let location = `${searchInput.value}`;
        let apiKey1 = "76a578de3ab86388efb5bf00ea5c9bf1";
        let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${location}&limit=5&appid=${apiKey1}&units=metric`;
        
        axios.get(`${apiUrl2}`).then(loadTemp);

        function loadTemp(response) {
            console.log(response.data.name);//The API returns an array
            console.log(response.data);
            //round up the degrees
            let degrees = Math.round(response.data.main.temp);
            let searchedCountry = document.querySelector(".removeColor");
            searchedCountry.innerHTML = `${degrees}°`;
          }

    }
    //For some reason this else statement is not working.
    //This else statement is supposed to load if there was no event listener
    else{
        let h1 = document.querySelector("#lagosHaiD");
        h1.innerHTML = "Lagos";
        alert("Please type a city and press enter!");
    }

 }

//This selects the form itself as a document
let searchInput = document.querySelector("#searchBox");
//onkeypress will connects to when a key on your keyboard is pressed
//Add event listener to help you choose what you want your program to do
searchInput.addEventListener("onkeypress", inputKeyUp); 


// const fahrenheit = celsius => (celsius * 1.8) + 32

// fahrenheit(59); 

// const fahrenheitToCelsius = fahrenheit => (fahrenheit - 32) * 5/9;

// fahrenheitToCelsius()




//ANother function to be called when the user wants to get the temperature for his/her current location
//Same function but this time the navigator geolocation function is called
function giveTemp(response){
    //receives response from the weather API 
    console.log(response.data);
    console.log(response.data.main.temp);
    console.log(response.data.name)

    let roundOff = Math.round(response.data.main.temp);
    let h2 = document.querySelector("#symbol");
    h2.innerHTML = `${roundOff}°`;

    let lagos = document.querySelector(".lagosName");
    lagos.innerHTML = `${response.data.name}`;

}

function tempButton(position){
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    //This data of longitude and latitude is provided by the geolocation navigator and is
    //passed to the API as strings.
    let lati = position.coords.latitude;
    let longi = position.coords.longitude;
    let apiKey = "76a578de3ab86388efb5bf00ea5c9bf1";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${apiKey}&units=metric`;

    //axios helps to use the API then calls the giveTemp function above
    axios.get(`${apiUrl}`).then(giveTemp);
}
//navigator function is nested in this function
function temperateRedir(){
    navigator.geolocation.getCurrentPosition(tempButton);
}

//listens to the button html element
let buttonClick = document.querySelector("button");
buttonClick.addEventListener("click", temperateRedir);