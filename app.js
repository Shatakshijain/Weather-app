// api.openweathermap.org/data/2.5/weather?q={city name}&
// appid={API key}

// e538a4a0033dfaff12997a6927a8823f
const weatherApi = {
	key: "e538a4a0033dfaff12997a6927a8823f",
	baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}
const searchBox=document.getElementById('input-box');
searchBox.addEventListener('keypress',(event) =>{
	if (event.key == 'Enter') {
		console.log(searchBox.value);
		getWeather(searchBox.value);

		document.querySelector('.weather-body').style.display="block";
	}
});

function getWeather(city){
	fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
	.then(weather => {
		return weather.json();
	}).then(showWeather);
}

function showWeather(weather){
	console.log(weather);

	let city=document.getElementById('city');
	city.innerText=`${weather.name}, ${weather.sys.country}`;

	let temperature = document.getElementById('temp');
	temperature.innerHTML=`${Math.round(weather.main.temp)}&deg;C`;

	let weatherType=document.getElementById('weather');
	weatherType.innerText=`${weather.weather[0].main}`;

	let date=document.getElementById('date');
	let todayDate=new Date();
	date.innerText=dateManage(todayDate);

	if(weatherType.textContent=='Clear'){
		document.body.style.backgroundImage="url('images/clear.jpg')";
	}else if(weatherType.textContent=='Clouds'){
		document.body.style.backgroundImage="url('images/cloud.jpg')";
	}else if(weatherType.textContent=='Rain'){
		document.body.style.backgroundImage="url('images/rain.jpg')";
	}else if(weatherType.textContent=='Snow'){
		document.body.style.backgroundImage="url('images/snow.jpg')";
	}else if(weatherType.textContent=='Sunny'){
		document.body.style.backgroundImage="url('images/sunny.jpg')";
	}else if(weatherType.textContent=='Thunderstorm'){
		document.body.style.backgroundImage="url('images/thunderstorm.jpg')";
	}else if(weatherType.textContent=='Haze'){
		document.body.style.backgroundImage="url('images/cloud.jpg')";
	}
}

function dateManage(dateArg){
	let days=["Sunday","Monday","Tuesday","Wednesday","Thursday",
    "Friday","Saturday"];

	let months=["January","February","March","April","May",
"June","July","August","September","October","November",
"December"];

let year=dateArg.getFullYear();
let month=months[dateArg.getMonth()];
let date=dateArg.getDate();
let day=days[dateArg.getDay()];

return `${date} ${month} (${day}), ${year}`;
}