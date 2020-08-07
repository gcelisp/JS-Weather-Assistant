const btnWeather = document.getElementById("btnWeather");
const txtCity = document.getElementById("txtCity");
const resultOut = document.getElementById("result");
const tempMesure = document.getElementById("swtTemp");
const windMesure = document.getElementById("swtWind");

btnWeather.onclick = function(){
      const city = txtCity.value;
    
      if(city.trim() == "")
          ons.notification.alert("Please enter the City name");
      else{
          
              resultOut.innerHTML = "";
              const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`;
              console.log("url: " + url);
              showModal();
              fetch(url).then(response => 
                {
                    if(response.ok){
                        response.json().then(json => { 
                        let data = json;
                        resultOut.innerHTML = formatResponse(data);
                      });
                        
                    }else{
                        
                        resultOut.innerHTML = "<p style='color:red; font-weight:bold'>No information was found for <i>"+ txtCity.value  +"</i> City</p>";
                        switch(response.status){
                            case 404:
                            throw new Error("Object not found");
                            break;
                
                        }
                        
                    }
                }
              ).then(data => {
                  console.log("response", data);
              }).catch(err =>{
                  console.log(err);
                  
              });
       }
}
      

function convertKelvin(kTemp){
    
  let opt = "";
  let temp = 0;
  if(tempMesure.checked){//C°
      opt = " C°";
      temp = kTemp - 273.15;
  } 
  else {//F°
      opt = " F°";
      temp = kTemp * (9/5) - 459.67;      
  }
  return temp.toFixed(1) + opt;
}

function convertMeterperSecond(ms){
    
  let opt = "";
  let windspeed = 0; 
  if(windMesure.checked){ // km/h
      opt = " km/h";
      windspeed = ms*3.6;
  } 
  else{//mph
      opt = " mph"
      windspeed = ms * 2.237;  
  } 
          
  return Math.round(windspeed) + opt; 
}

function showModal() {
  var modal = document.querySelector('ons-modal');
  document.querySelector('ons-modal').setAttribute('animation', 'fade');
  modal.show();
  setTimeout(function() {
    modal.hide();
  }, 500);
}

function formatResponse(data){
  let conditions = ""
  if(data.weather.length>1){
      for(var i = 0; i < data.weather.length; i++ ){
         conditions += data.weather[i].main;
         if (i != (data.weather.length -1)) {
           conditions += " and ";
         }
       }
     } else {
      conditions += data.weather[0].main;
  }
  /*
  let out = `<h3>Current Conditions for ${data.name}</h3>
  <p><strong>Temperature:</strong> ${convertKelvin(data.main.temp)}<br/>
  <p><strong>Humidity:</strong> ${data.main.humidity}%<br/>
  <p><strong>Pressure:</strong> ${data.main.pressure}mb<br/>
  <p><strong>Wind:</strong> ${data.wind.deg} degrees at ${convertMeterperSecond(data.wind.speed)}<br/>
  <p><strong>Weather:</strong> ${conditions}</p>`;
 */ 
  let out = `<ons-list style="width: 50%" class="clearance">
  <ons-list-header>Current Conditions for ${data.name}</ons-list-header>
  <ons-list-item>
        <div class="center">Temperature</div>
        <div class="right">${convertKelvin(data.main.temp)}</div>
  </ons-list-item>
  <ons-list-item>
        <div class="center">Humidity</div>
        <div class="right">${data.main.humidity}%</div>
  </ons-list-item>
  <ons-list-item>
        <div class="center">Pressure</div>
        <div class="right">${data.main.pressure} mb</div>
  </ons-list-item>
  <ons-list-item>
        <div class="center">Wind</div>
        <div class="right">${data.wind.deg} degrees at ${convertMeterperSecond(data.wind.speed)}</div>
  </ons-list-item>
  <ons-list-item>
        <div class="center">Weather</div>
        <div class="right">${conditions}</div>
  </ons-list-item>
  </ons-list>`;
  

  return(out);
}
