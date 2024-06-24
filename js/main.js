let box=document.querySelector(".box")
let searchBTN=document.querySelector(".serch_btn")
let searchInput=document.querySelector(".input_search")
let result=""
let yourLocation=""
async function findmystate(){
  let success=async (position)=>{
    console.log(position)
    let latitude=position.coords.latitude
    let longitude=position.coords.longitude
    console.log(latitude)
    console.log(longitude)
    // let apiurl=`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    //  fetch(apiurl).then(res => res.json()).then(data =>{
    //   console.log(data)
      let data=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
      let result=await data.json()
      console.log(result.city)
      yourLocation=result.city
      display(result.city)
    // }
    // })

  }
  // console.log(latitude)
  // console.log(longitude)
  // let data=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
  // console.log(data)
  const error =()=>{
    console.log("unable to retrieve your location")
  }
  navigator.geolocation.getCurrentPosition(success,error)

}
findmystate()

// async function getdata(){
//   let data=await fetch('http://api.weatherapi.com/v1/current.json?key=6cb791adca5d402190e02435242006&q=cairo&days=7')
//   let result=await data.json()
//   console.log(result)
// }
// getdata()


searchBTN.addEventListener("click",async function(e){
  e.preventDefault()
  console.log(searchInput.value)
  
  // console.log(result[0].name)
  if(searchInput.value==""){
    console.log("no")
    display(yourLocation)
  }else{
    let data=await fetch(`https://api.weatherapi.com/v1/search.json?key=6cb791adca5d402190e02435242006&q=${searchInput.value}`)
    let result=await data.json()
    display(result[0].name)
  }
 
})





async function display(data){
  let carton=``
  // https://api.weatherapi.com/v1/forecast.json?key=6cb791adca5d402190e02435242006&q=${data}&days=3
  let dataa=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6cb791adca5d402190e02435242006&q=${data}&days=7`)
  let result=await dataa.json()
  console.log(result)
carton +=`<div class="col-md-4 p-0">
<div class="d-flex justify-content-between p-2 toop"><span>${result.location.localtime.split(' ', 1).join(' ')}</span><span>${result.location.localtime.split(' ').slice(1,).join(' ')}</span></div>
<div class="down p-3">
  <h5 class="py-3">${result.location.name}</h5>
  <h2 class="fs-1">${result.current.temp_c} ْ C</h2>
  <img src="${result.current.condition.icon}" alt="" width="100">
  <br>
  <p class="py-2">${result.current.condition.text}</p>
  <div class="">
    <span class="me-2"><img src="icon-umberella.png" alt=""> ${result.current.dewpoint_f} %</span><span class="me-2"><img src="icon-wind.png" alt=""> ${result.current.vis_km} km/h</span><span><img src="icon-compass.png" alt=""> ${result.current.wind_dir}</span>
  </div>
</div>
</div>
`


// let days=result.forecast
// console.log(result.forecast.forecastday[1].date)
// console.log(result.forecast.forecastday[1].hour[0].condition)

console.log(result.forecast.forecastday)

for (let i = 1; i < result.forecast.forecastday.length; i++) {

  carton +=`
  <div class="col-md-4 p-0">
  <div class="text-center p-2 toop"><span>${result.forecast.forecastday[i].date}</span></div>
  <div class="down text-center pt-5">
      <img src="${result.forecast.forecastday[i].day.condition.icon}" width="50" alt="">
      <h3 class="mb-2">${result.forecast.forecastday[i].day.maxtemp_c} ْ C</h3>
      <h6 class="mb-2">${result.forecast.forecastday[i].day.mintemp_c} ْ C</h6>
    <p>${result.forecast.forecastday[i].day.condition.text}</p>
    
  </div>
</div>
  `
}

box.innerHTML=carton
let top=document.querySelectorAll(".toop")
let down=document.querySelectorAll(".down")
console.log(top)
for (let i = 1; i < top.length; i++) {
  if(i%2 != 0){
console.log("done")

    top[i].classList.add('dark')
    down[i].classList.add('moredark')
  }
  
}
}

