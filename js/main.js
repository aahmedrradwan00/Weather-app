let forecast = document.getElementById("forecast");

let findLocation = document.getElementById("findLocation");

var findbtn = document.getElementById("find");

arr = [];
async function search(c) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=67ed74ead33549f3a0a232252230508&q=${c}&days=3`
  );
  if (res.status == 200 && res.ok) {
    const data = await res.json();
    arr = data;
    display();
    displayAnother();
  }
}

findbtn.onclick = () => {
  find(findLocation.value);
};

function find(Location) {
  if (findLocation.value === "") {
    return 0;
  } else {
    search(Location);
    forecast.innerHTML = "";
  }
}

findLocation.value = "Cairo";
find(findLocation.value);

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const d = new Date();

function display() {
  let box = "";
  box = `
  <div class="forecast col-lg-4 p-lg-0 rounded-3">
  <div
  class="d-flex justify-content-between align-items-center p-2 rounded-top-3 forecast-header"
  >
  <div>${days[d.getDay()]}</div>
  <div>${d.getDate()} ${months[d.getMonth()]}</div>
  </div>
  <div class="forecast-body px-3 py-4 rounded-bottom-3">
  <div class="location">${arr.location.name}</div>
  <div class="location-c">${arr.location.country}</div>
  <div class="degree d-flex justify-content-start align-items-center ">
  
  <div class="temp">
  ${arr.current.temp_c}<sup>o</sup>C
  </div>
  <div class="temp-img d-flex">
  <img
  src="https:${arr.current.condition.icon}"
  alt="current condition"
  width="90px"
  height="90px"
  class="align-itemsnter"
  />
  </div>
  </div>
  <div class="main-color my-3">${arr.current.condition.text}</div>
  <div class="d-flex justify-content-between pt-4">
  <span>
  <img src="imgs/icon-umberella.png" alt="1" srcset="" />
  ${arr.current.humidity}%
  </span>
  <span>
  <img src="imgs/icon-wind.png" alt="2" srcset="" />
  ${arr.current.wind_kph}km/h
  </span>
  <span>
  <img src="imgs/icon-compass.png" alt="3" srcset="" />
  East
  </span>
  </div>
  </div>
  </div>
  `;
  forecast.innerHTML += box;
}

function displayAnother() {
  let box = "";
  for (let i = 1; i <= 2; i++) {
    box += `
    <div class="forecast col-lg-4  p-lg-0 rounded-3 ">
    <div
    class="forecast-header d-flex justify-content-center align-items-center rounded-top-3 p-2 ml-3"
    >
    <div>${days[new Date(arr.forecast.forecastday[i].date).getDay()]}</div>
    </div>
    <div
    class="forecast-body d-flex flex-column px-3 py-4 align-items-center justify-content-center flex-wrap rounded-bottom-3 "
    >
    <div class="m-2"> 
    <img src="https:${arr.forecast.forecastday[i].day.condition.icon}" alt="">
    </div>
    <div class="tempF mx-auto text-white my-3">${
      arr.forecast.forecastday[i].day.maxtemp_c
    }<sup>o</sup>C</div>
    <div class=" p-2">${
      arr.forecast.forecastday[i].day.mintemp_c
    }<sup>o</sup>C</div>
    <div class="main-color ">${
      arr.forecast.forecastday[i].day.condition.text
    }</div>
    </div>
    </div>
    `;
  }
  forecast.innerHTML += box;
}
