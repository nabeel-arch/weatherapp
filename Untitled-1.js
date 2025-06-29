document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('get-weather-btn').addEventListener('click', async () => {
      const city = document.getElementById('city-input').value.trim();
      const weatherInfo = document.getElementById('weather-info');
  
      if (!city) {
        weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
        return;
      }
  
      const apiKey = '9fd3cc82f34705cf8b69a5b8a31af7e7';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  
      weatherInfo.innerHTML = '<p>Loading...</p>';
  
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
  
        const data = await response.json();
        const temp = data.main.temp;
        const condition = data.weather[0].description;
        const name = data.name;
  
        weatherInfo.innerHTML = `
          <h2>${name}</h2>
          <p><strong>Temperature:</strong> ${temp} °C</p>
          <p><strong>Condition:</strong> ${condition}</p>
        `;
      } catch (error) {
        weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    });
  
    // Also add Enter key support for better UX
    document.getElementById('city-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        document.getElementById('get-weather-btn').click();
      }
    });
  });
  