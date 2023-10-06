const userTab = document.querySelector("[user-data]");
const searchTab = document.querySelector("[searched-data]");
const grantAccessButton = document.querySelector('[data-grantAccess]');
const grantAccessContainer = document.querySelector(".grant_location");
const searchForm = document.querySelector("[data-formContainer]"); 
const loadingScreen = document.querySelector(".loading_container");
const weatherInfoContainer = document.querySelector(".weather_info_container");
const error404 = document.querySelector(".error_404");

let currTab = userTab;
let apiKey = "d1845658f92b31c64bd94f06f7188c9c";
currTab.classList.add("current_tab");

function switchTab(clickedTab)
{
    if(clickedTab != currTab)
    {
        currTab.classList.remove("current_tab");
        currTab = clickedTab;
        currTab.classList.add("current_tab");
        if(!searchForm.classList.contains("active"))
        {
            weatherInfoContainer.classList.remove('active');
            grantAccessContainer.classList.remove('active');
            searchForm.classList.add("active");
        }
        else{
            searchForm.classList.remove("active");
            
            weatherInfoContainer.classList.remove('active');
            error404.classList.remove('active');
            getFromSessionStorage();
            
        }
    }
}

function getFromSessionStorage()
{
    //check coordinates are already present in storage
    const localCoordinates = sessionStorage.getItem('user-coordinates');
    if(!localCoordinates)
    {
          grantAccessContainer.classList.add('active');
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchWeatherInfo(coordinates);
    }

}

async function  fetchWeatherInfo(coordinates)
{
   const{lat, lon} = coordinates;
   //make grant container invisible 
   grantAccessContainer.classList.remove('active')  ;
   //loading gif visible 
   loadingScreen.classList.add("active");
   //api call
   try
   {
         let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
         const data =await response.json();
         loadingScreen.classList.remove('active');
         weatherInfoContainer.classList.add('active');
         renderWeatherInfo(data);
         console.log(data);
   }
   catch(err){
          
          loadingScreen.classList.remove('active');
          weatherInfoContainer.classList.remove('active');
          error404.classList.add("active");
   
   }

}

userTab.addEventListener('click',()=>{
    switchTab(userTab);
});

searchTab.addEventListener('click',()=>{
    switchTab(searchTab);
});


 function renderWeatherInfo(weatherInfo)
 {
    // fetch the elements
    const city_name = document.querySelector("[data-city-name]");
    const country_icon = document.querySelector("[data-country-icon]");
    const weather_description = document.querySelector('[data-weather-desc]');
    const weather_icon = document.querySelector('[data-weather-icon]');
    const temp = document.querySelector('[data-temp]');
    const wind_speed = document.querySelector('[data-wind-speed]');
    const humidity = document.querySelector('[data-humidity]');
    const cloud = document.querySelector('[data-cloud]');


    city_name.innerText =  weatherInfo?.name;
    country_icon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    weather_description.innerText = weatherInfo?.weather?.[0]?.description;
    weather_icon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    wind_speed.innerText = weatherInfo?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    cloud.innerText = `${weatherInfo?.clouds?.all}%`;

 }
 grantAccessButton.addEventListener('click',getLocation());

 function getLocation()
 {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
         alert('No geolocation support available');
    }
 }

 function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
   fetchWeatherInfo(userCoordinates);

}

 
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    weatherInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
          );
          if (!response.ok) {
            throw new Error(); // Throw an error for a 404 response
          }
        const data = await response.json();
        loadingScreen.classList.remove("active");
        weatherInfoContainer.classList.add("active");
        error404.classList.remove("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        
        loadingScreen.classList.remove('active');
        weatherInfoContainer.classList.remove('active');
        error404.classList.add("active");

    }
}