async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
  

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
   
  document.querySelector('#weatherWidget').style.display = 'none';
  document.querySelector('#citySelect').addEventListener('change', evt => {
    document.querySelector('#citySelect').setAttribute('disabled', 'disabled');
    document.querySelector('#weatherWidget').style.display = 'none';
    document.querySelector('p.info').textContent = 'Fetching weather data...';
    
    // console.log(evt.target.value);
    
    const city = evt.target.value;
    const url = `http://localhost:3003/api/weather?city=${city}`;
    
    axios.get(url)
      .then(res => {
        document.querySelector('#weatherWidget').style.display = 'block';
        document.querySelector('.info').textContent = '';
        evt.target.removeAttribute('disabled');


        let {data}  = res;
        
        const apparentTemperature = data.current.apparent_temperature;
        document.querySelector('#apparentTemp div:nth-child(2)').textContent = `${apparentTemperature}°`;

        const minTemp = data.current.temperature_min;
        const maxTemp = data.current.temperature_max;
        let minMax = document.querySelector('#todayStats div:nth-child(1)');
        minMax.textContent = `${minTemp}° / ${maxTemp}°`;

        const precipitation = data.current.precipitation_probability;
        let precipitationElement = document.querySelector('#todayStats div:nth-child(2)');
        precipitationElement.textContent = `Precipitation: ${precipitation*100}%`
        
        const humidity = data.current.humidity;
        const humidityElement = document.querySelector("#todayStats div:nth-child(3)")
        humidityElement.textContent = `Humidity ${humidity}%`;
        
        const wind = data.current.wind_speed;
        const windElement = document.querySelector("#todayStats > div:nth-child(4)")
        windElement.textContent = `Wind: ${wind}m/s`;
        
  
      const weatherDescription = data.current.weather_description; 
      const [ , emoji] = descriptions.find(description => description[0] === weatherDescription) || ['Unknown', '❓'];
      const todayDescription = document.querySelector("#todayDescription");
      todayDescription.textContent = `${emoji}`;

       data.forecast.daily.forEach((day, idx) => {
        let card = document.querySelectorAll('.next-day')[idx];

        let weekDay = card.children[0];
        let apparent = card.children[1];
        let minMaxCards = card.children[2];
        let precipCards = card.children[3];
        
        weekDay.textContent = getWeekDay(day.date);
        apparent.textContent = descriptions.find(d => d[0] === day.weather_description)[1];
        minMaxCards.textContent = `${day.temperature_min}° / ${day.temperature_max}°`;
        precipCards.textContent = `Precipitation: ${day.precipitation_probability *100}%`
       })

       document.querySelector('#location').firstElementChild.textContent = data.location.city;

      })
      .catch(error => {
        console.error('Rejected :', error.message);
      });

      function getWeekDay(dateString){
        let date = new Date(dateString);
        let dayOfWeekNumber = date.getDay();
        let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return weekdays[dayOfWeekNumber];
      }

  });
  

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
