

let temp = document.querySelector('.c1 .temp p');
let icon = document.querySelector('.c1 .temp img');
let icon2 = document.querySelector('.cr2 .image img');
let icon3 = document.querySelector('.cr3 .image img');
let statu = document.querySelector('.c1 .s1 p');
let statu2 = document.querySelector('.cr2 .s2 p');
let statu3 = document.querySelector('.cr3 .s3 p');
let country = document.querySelector('.c1 .contry p');
let day = document.querySelector('.c1 .day');
let month = document.querySelector('.c1 .date');
let temp2 = document.querySelector('.cr2 .details1 p');
let tempMin2 = document.querySelector('.cr2 .details2 p');
let temp3 = document.querySelector('.cr3 .details1 p');
let tempMin3 = document.querySelector('.cr3 .details2 p');
let day2 = document.querySelector('.c-parent2 .head');
let day3 = document.querySelector('.c-parent3 .head');
let input = document.querySelector('.banner .input input');
let currentCountry ="cairo";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];    
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

input.addEventListener('keyup', function (e) {
    
    getWeather(input.value);
})

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getCity(lat, lon);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }

    
}


async function getCity(lat, lon) {
    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        const data = await response.json();
        console.log(data.city);
        getWeather(data.city);
    } catch (error) {
        console.error('Error fetching IP information:', error);
    }
}


async function getWeather(City)
{
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d4730ca602c24ebb89e21055242506&q=${City}&days=7`);

    if (response.status != 400 && response.ok) 
    {
        const data = await response.json();


        let tempData = data.forecast.forecastday[0].day.maxtemp_c;
        let tempData2 = data.forecast.forecastday[1].day.maxtemp_c;
        let tempData2Min = data.forecast.forecastday[1].day.mintemp_c;
        let tempData3 = data.forecast.forecastday[2].day.maxtemp_c;
        let tempData3Min = data.forecast.forecastday[2].day.mintemp_c;

        let statusData = data.forecast.forecastday[0].day.condition.text;
        let statusData2 = data.forecast.forecastday[1].day.condition.text;
        let statusData3 = data.forecast.forecastday[2].day.condition.text;

        let countryData = data.location.name;

        let dayData = data.forecast.forecastday[0].date;
        let dayData2 = data.forecast.forecastday[1].date;
        let dayData3 = data.forecast.forecastday[2].date;

        country.innerHTML = countryData;
        statu.innerHTML = statusData;
        temp.innerHTML = `${tempData}<sup>o</sup>C`;
        temp2.innerHTML = `${tempData2}<sup>o</sup>C`;
        tempMin2.innerHTML = `${tempData2Min}<sup>o</sup>`;
        temp3.innerHTML = `${tempData3}<sup>o</sup>C`;
        tempMin3.innerHTML = `${tempData3Min}<sup>o</sup>`;
        statu2.innerHTML = statusData2;
        statu3.innerHTML = statusData3;

        let iconData = data.forecast.forecastday[0].day.condition.icon;
        icon.setAttribute('src', iconData);
        let iconData2 = data.forecast.forecastday[1].day.condition.icon;
        icon2.setAttribute('src', iconData2);
        let iconData3 = data.forecast.forecastday[2].day.condition.icon;
        icon3.setAttribute('src', iconData3);

        let date = new Date(dayData); 
        let dayOfMonth = date.getDate();
        let monthIndex = date.getMonth();
        let dayOfWeek = date.getDay();
        let monthName = months[monthIndex];
        let dayName = daysOfWeek[dayOfWeek];
        month.innerHTML = `${dayOfMonth} ${monthName}`;
        day.innerHTML = dayName;


        let date2 = new Date(dayData2);
        let dayOfWeek2 = date2.getDay();
        let dayName2 = daysOfWeek[dayOfWeek2];
        day2.innerHTML = dayName2;

        let date3 = new Date(dayData3);
        let dayOfWeek3 = date3.getDay();
        let dayName3 = daysOfWeek[dayOfWeek3];
        day3.innerHTML = dayName3;
        currentCountry = City;
        console.log(currentCountry);

    }
    else
    {
        console.log(currentCountry);
        getWeather(currentCountry);
    }

} 

getWeather(currentCountry);
getCurrentLocation();

