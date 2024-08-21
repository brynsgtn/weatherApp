"use strict";
// Script
// Global variables
const weatherEl = document.querySelector(".weather");
const searchBarEl = document.querySelector(".search-bar");
const searchButtonEl = document.querySelector(".search-button");
const cityEl = document.querySelector(".city");
const tempEl = document.querySelector(".temp");
const lowHighEl = document.querySelector(".low-high");
const iconEl = document.querySelector(".icon");
const descriptionEl = document.querySelector(".description");
const feelsEl = document.querySelector(".feels");
const humidityEl = document.querySelector(".humidity");
const pressureEl = document.querySelector(".pressure");
const windEl = document.querySelector(".wind");
const visibilityEl = document.querySelector(".visibility");
const dateEl = document.querySelector(".date");
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dateToday = new Date();
let day = weekday[dateToday.getDay()];
let date = dateToday.getDate();
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = month[dateToday.getMonth()];
let year = dateToday.getFullYear();
const celciusEl = document.querySelector(".celcius");
const farenheitEl = document.querySelector(".farenheit");
let units = "metric";
let degree = "C";
let distance = "km";
// Object with fetch, search, and display function
let weather = {
    apiKey: "347f1a2ff2ff158340422dc4e47a4143",
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${this.apiKey}`)
            .then(res => {
            if (!res.ok) {
                throw alert("City not found!");
            }
            return res.json();
        })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { description, icon } = data.weather[0];
        const { temp, humidity, feels_like, temp_min, temp_max, pressure } = data.main;
        const { visibility } = data;
        const { country } = data.sys;
        const { speed } = data.wind;
        if (searchBarEl) {
            searchBarEl.value = "";
        }
        else {
            throw new Error("Element not found");
        }
        if (cityEl) {
            cityEl.innerText = `${name}, ${country}`;
        }
        else {
            throw new Error("Element not found");
        }
        if (dateEl) {
            dateEl.innerText = `${day.slice(0, 3)}, ${date} ${currentMonth}`;
        }
        else {
            throw new Error("Element not found");
        }
        if (tempEl) {
            tempEl.innerText = `${Math.floor(temp)}°${degree}`;
        }
        else {
            throw new Error("Element not found");
        }
        if (lowHighEl) {
            lowHighEl.innerText = `${Math.floor(temp_min)}° / ${Math.floor(temp_max)}°`;
        }
        else {
            throw new Error("Element not found");
        }
        if (iconEl) {
            iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        }
        else {
            throw new Error("Element not found");
        }
        if (descriptionEl) {
            descriptionEl.innerText = description;
        }
        else {
            throw new Error("Element not found");
        }
        if (feelsEl) {
            feelsEl.innerText = `Feels like ${Math.floor(feels_like)}°`;
        }
        else {
            throw new Error("Element not found");
        }
        if (humidityEl) {
            humidityEl.innerText = `${humidity}%`;
        }
        else {
            throw new Error("Element not found");
        }
        if (pressureEl) {
            pressureEl.innerText = `${pressure} mb`;
        }
        else {
            throw new Error("Element not found");
        }
        if (windEl) {
            windEl.innerText = `${speed} ${distance}/h`;
        }
        else {
            throw new Error("Element not found");
        }
        if (visibilityEl) {
            visibilityEl.innerText = `${visibility / 1000} ${distance}`;
        }
        else {
            throw new Error("Element not found");
        }
        if (weatherEl) {
            weatherEl.classList.remove("loading");
        }
        else {
            throw new Error("Element not found");
        }
    },
    search: function () {
        if (searchBarEl) {
            this.fetchWeather(searchBarEl.value);
        }
        else {
            throw new Error("Element not found");
        }
    }
};
// Location on start-up
weather.fetchWeather("Chicago");
// Event listeners
if (searchButtonEl) {
    searchButtonEl.addEventListener("click", function (event) {
        weather.search();
    });
}
else {
    throw new Error("Element not found");
}
if (searchBarEl) {
    searchBarEl.addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });
}
else {
    throw new Error("Element not found");
}
if (farenheitEl && cityEl) {
    farenheitEl.addEventListener("click", function (event) {
        units = "imperial";
        degree = "F";
        distance = "mi";
        weather.fetchWeather(cityEl.innerText.split(',')[0]);
    });
}
else {
    throw new Error("Element not found");
}
if (celciusEl) {
    celciusEl.addEventListener("click", function (event) {
        units = "metric";
        degree = "C";
        distance = "km";
        weather.fetchWeather(cityEl.innerText.split(',')[0]);
    });
}
