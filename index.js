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
    function inputKeyUp(event){
//     //prevent default prevents the page from loading
           // 
//     //enter for the Enter key on your keyboard
    if (event.key == "Enter") {
        let h1 = document.querySelector("#lagosHaiD");
        h1.innerHTML = searchInput.value;
        event.preventDefault();
    }
    else{
        h1.innerHTML = null
        alert("Please type a city and press enter!");
    }

 }

//This selects the form itself as a document
let searchInput = document.querySelector("#searchBox");
searchInput.addEventListener("onkeypress", inputKeyUp); //Add event listener to help you choose what you want your program to do
//onkeypress will connects to when a key on your keyboard is pressed

// const fahrenheit = celsius => (celsius * 1.8) + 32

// fahrenheit(59); 

// const fahrenheitToCelsius = fahrenheit => (fahrenheit - 32) * 5/9;

// fahrenheitToCelsius()



function giveTemp(response){

    console.log(response.data);
    console.log(response.data.main.temp);
    console.log(response.data.name)

    let roundOff = Math.round(response.data.main.temp);
    let h2 = document.querySelector("#symbol");
    h2.innerHTML = `${roundOff}`;

    let lagos = document.querySelector(".lagosName");
    lagos.innerHTML = `${response.data.name}`;

}

function tempButton(position){
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    let lati = position.coords.latitude;
    let longi = position.coords.longitude;
    let apiKey = "76a578de3ab86388efb5bf00ea5c9bf1";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${apiKey}&units=metric`;

    axios.get(`${apiUrl}`).then(giveTemp);
}

function temperateRedir(){
    navigator.geolocation.getCurrentPosition(tempButton);
}


let button = document.querySelector("button");
button.addEventListener("click", temperateRedir);