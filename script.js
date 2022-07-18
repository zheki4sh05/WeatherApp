
/*function showLocation( position ) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude+'---'+longitude)
}
window.onload=function(){
  navigator.geolocation.getCurrentPosition(showLocation)
}*/
let date=new Date();
const images=[
  {
    nameFolder:'img/day-bg',
    nameImg:'day',
    format:'png',
    url:`img/${this.nameFolder}/${this.nameImg}.${this.format}`
  },
  {
    nameFolder:'img/morning-bg',
    nameImg:'morning',
    format:'png',
    url:`img/${this.nameFolder}/${this.nameImg}.${this.format}`
  },
  {
    nameFolder:'img/night-bg',
    nameImg:'night',
    format:'png',
    url:`img/${this.nameFolder}/${this.nameImg}.${this.format}`
  }
]
const mainSection=document.querySelector(".left_section")
  let hour=date.getHours();
  if (hour >= 7 && hour < 12 || hour >= 0 && hour < 7) {
   mainSection.style.cssText = `background: url("img/morning-bg/morning.jpg") `;
  } else if (hour >= 12 && hour < 19) { 
    mainSection.style.cssText = `background: url("img/day-bg/day.jpg") `
  } else if (hour >= 19 && hour < 24) {
    mainSection.style.cssText = `background: url("img/night-bg/night.jpg") `
  }
 



let  sliderItems=document.querySelectorAll('.swiper-slide');
let activeSlideIndex=0;
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView:3,

  // And if we need scrollbar

});
  const form= document.querySelector(".search__box")
  const input=document.querySelector(".search__input")
 let inputVal='Minsk';
  form.addEventListener("submit", e => {
    e.preventDefault();
    inputVal = input.value;
    getForcast(inputVal)
  });
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  let monthes = [
    'January',
    'February',
    'March',
    'April',
    'May',	
    'June',	
    'July',
    'August',
    'September',	
    'October',	
    'November',
    'December'
  ]

document.querySelector('.weekDay').textContent=days[date.getDay()];
document.querySelector('.day').textContent=date.getDate();
document.querySelector('.month').textContent=monthes[date.getMonth()]
document.querySelector('.year').textContent=date.getFullYear();
	


document.querySelector(".menu__icon").addEventListener("click", function() {
    this.classList.toggle("active");
    document.querySelector(".left_section").classList.toggle("active__seciton")
  
}, false);
/*menuCover.addEventListener("click", function() {
    menuMobile.classList.remove("menu__items-active");
  }, false);*/
  function dailyForecast(forecast){
  
  let weekDay;
  let weatherDay;
  let month;

  let counter=0;
   for(var i = 0; i < forecast.list.length; i+=8){
    weekDay=0;
	
   
    weatherDay=forecast.list[i].dt_txt.split(" ")[0].split("-")[2];
    month=forecast.list[i].dt_txt.split(" ")[0].split("-")[1];

    sliderItems[counter].querySelector(".weather__temp").textContent=Math.round(forecast.list[i].main.temp-273.15)
    sliderItems[counter].querySelector(".weather__status").textContent=forecast.list[i].weather[0].description;
    sliderItems[counter].querySelector(".weather__icon").innerHTML=`<i class="owf owf-${forecast.list[i].weather[0].id}  owf-4x"></i>`
    

   
    if(counter+date.getDay()>6){
      weekDay=(counter+date.getDay())-7;
     
    }
    else{
      weekDay=counter+date.getDay();
    }
  
    sliderItems[counter].querySelector(".weekDay").textContent=`${days[weekDay]}`
    sliderItems[counter].querySelector(".day").textContent=`${weatherDay}.`
    sliderItems[counter].querySelector(".month").textContent=`${month}.`
    sliderItems[counter].querySelector(".year").textContent=`${date.getFullYear()}`
	counter++;	
  }
}
   function getForcast(city){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inputVal}&cnt=5&appid=d1a151c70a3c897f2630de0b0b101e9f`)
    .then(function (resp){return resp.json()})
    .then(function(data){
     
      document.querySelector('.widget__text').textContent=data.name
      document.querySelector('.weather__temp').textContent=Math.round(data.main.temp-273.15)
      document.querySelector('.weather__status').textContent=data.weather[0]['description']
      document.querySelector('.weather__icon').innerHTML=`<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`
  
  
      document.querySelector('.feels').textContent=`RealFeel:${Math.round(data.main.feels_like-273.15)}`
      document.querySelector('.humidity').textContent=`Humidity:${data.main.humidity}%`
      document.querySelector('.cloudCover').textContent=`Cloud Cover: ${data.clouds.all}%`;
      document.querySelector('.pressure').textContent=`Pressure:${data.main.pressure} hPa`
    })
    .catch(function(){
  
    })
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=d1a151c70a3c897f2630de0b0b101e9f`)
   
	
    .then(function(resp2){return resp2.json()})
    .then(function(data2){
      

		dailyForecast(data2)
		
    })
    .catch(function(){
      console.log("error")
    })
  }
  getForcast(inputVal)

  
 