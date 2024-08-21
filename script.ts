// Script

// Global variables
const weatherEl = document.querySelector(".weather") as HTMLDivElement | null;
const searchBarEl = document.querySelector(".search-bar") as HTMLInputElement | null;
const searchButtonEl = document.querySelector(".search-button") as HTMLButtonElement | null;
const cityEl = document.querySelector(".city") as HTMLHeadingElement | null;
const tempEl = document.querySelector(".temp") as HTMLHeadingElement | null;
const lowHighEl = document.querySelector(".low-high") as HTMLDivElement | null;
const iconEl = document.querySelector(".icon") as HTMLImageElement | null;
const descriptionEl = document.querySelector(".description") as HTMLDivElement | null;
const feelsEl = document.querySelector(".feels") as HTMLDivElement | null;
const humidityEl = document.querySelector(".humidity") as HTMLDivElement | null;
const pressureEl = document.querySelector(".pressure") as HTMLDivElement | null;
const windEl = document.querySelector(".wind") as HTMLDivElement | null;
const visibilityEl = document.querySelector(".visibility") as HTMLDivElement | null;
const dateEl = document.querySelector(".date") as HTMLParagraphElement | null;
const weekday: string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const dateToday: Date = new Date();
let day: string = weekday[dateToday.getDay()];
let date: number = dateToday.getDate();
const month: string[] = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let currentMonth: string = month[dateToday.getMonth()];
let year: number = dateToday.getFullYear();
const celciusEl = document.querySelector(".celcius") as HTMLButtonElement | null;
const farenheitEl = document.querySelector(".farenheit") as HTMLButtonElement | null;
let units: string = "metric";
let degree: string = "C";
let distance: string = "km";

type WeatherCondition = {
    id: number
    main: string
    description: string
    icon: string
}

type WeatherData = {
    coord: {
        lon: number
        lat: number
    }
    weather: WeatherCondition[]
    base: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
        sea_level: number
        grnd_level:number
    }
    visibility: number
    wind: {
        speed: number
        deg: number
    }
    clouds: {
        all: number
    }
    dt: number
    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: number
}

type Weather = {
    apiKey: string
    fetchWeather: (city: string) => void
    displayWeather: (data: WeatherData) => void
    search: () => void
}

// Object with fetch, search, and display function
let weather: Weather = {
    apiKey: "347f1a2ff2ff158340422dc4e47a4143",
    fetchWeather: function (city: string): void {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${this.apiKey}`)
            .then(res => { 
                if (!res.ok) {
                    throw alert("City not found!"); 
                }
                return res.json() 
            })
            .then((data: WeatherData) => this.displayWeather(data))
    },
    displayWeather: function(data: WeatherData): void {
        const {name} = data;
        const {description, icon} = data.weather[0];
        const {temp, humidity, feels_like, temp_min, temp_max, pressure} = data.main;
        const {visibility} = data
        const {country} = data.sys;
        const {speed} = data.wind;
        
        if (searchBarEl) {
            searchBarEl.value = ""
        } else {
            throw new Error("Element not found");
        }
       
        if (cityEl) {
            cityEl.innerText = `${name}, ${country}`;
        } else {
            throw new Error("Element not found");
        }

        if (dateEl) {
            dateEl.innerText = `${day.slice(0, 3)}, ${date} ${currentMonth}`
        } else {
            throw new Error("Element not found");
        }

        if (tempEl) {
            tempEl.innerText = `${Math.floor(temp)}°${degree}`
        } else {
            throw new Error("Element not found");
        }
        if (lowHighEl) {
            lowHighEl.innerText = `${Math.floor(temp_min)}° / ${Math.floor(temp_max)}°`
        } else {
            throw new Error("Element not found");
        }
        if (iconEl) { 
            iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        } else {
            throw new Error("Element not found");
        }

        if (descriptionEl) {
            descriptionEl.innerText = description;
        } else {
            throw new Error("Element not found");
        }

        if (feelsEl) {
            feelsEl.innerText = `Feels like ${Math.floor(feels_like)}°`;
        } else {
            throw new Error("Element not found");
        }

        if (humidityEl) {
            humidityEl.innerText = `${humidity}%`;
        } else {
            throw new Error("Element not found");
        }

        if (pressureEl) {
            pressureEl.innerText = `${pressure} mb`;
        } else {
            throw new Error("Element not found");
        }

        if (windEl) {
            windEl.innerText = `${speed} ${distance}/h`;
        } else {
            throw new Error("Element not found");
        }

        if (visibilityEl) {
            visibilityEl.innerText = `${visibility/1000} ${distance}`
        } else {
            throw new Error("Element not found");
        }

        if (weatherEl) {
            weatherEl.classList.remove("loading");
        } else {
            throw new Error("Element not found");
        }
    },
    search: function(): void {
        if (searchBarEl) {
            this.fetchWeather(searchBarEl.value)
        } else {
            throw new Error("Element not found");
        }   
    }
}

// Location on start-up
weather.fetchWeather("Chicago")

// Event listeners
if (searchButtonEl) {
    searchButtonEl.addEventListener("click", function(this: HTMLButtonElement, event: MouseEvent): void {
    weather.search()
    })
} else {
    throw new Error("Element not found");
}

if (searchBarEl) {
    searchBarEl.addEventListener("keyup", function(this: HTMLInputElement, event: KeyboardEvent): void {
        if(event.key == "Enter") {
            weather.search();
        }
    })
} else {
    throw new Error("Element not found");
}

if (farenheitEl && cityEl) {
    farenheitEl.addEventListener("click", function(this: HTMLButtonElement, event: MouseEvent): void {
            units = "imperial";
            degree = "F"
            distance = "mi"
            weather.fetchWeather(cityEl.innerText.split(',')[0]);
    })
} else {
    throw new Error("Element not found");
}

if (celciusEl) {
    celciusEl.addEventListener("click", function(this: HTMLButtonElement, event: MouseEvent): void{
            units = "metric";
            degree = "C"
            distance = "km";
            weather.fetchWeather(cityEl.innerText.split(',')[0]);
    })
}




