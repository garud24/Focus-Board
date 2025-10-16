async function geocode(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Geocode failed');
  const data = await res.json();
  if (!data.results?.length) throw new Error('City not found');
  const { latitude, longitude, name, country } = data.results[0];
  return { latitude, longitude, name: `${name}${country ? ', ' + country : ''}` };
}
export async function fetchWeatherByCity(city) {
  const g = await geocode(city);
  const wurl = `https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&current_weather=true`;
  const res = await fetch(wurl);
  if (!res.ok) throw new Error('Weather fetch failed');
  const data = await res.json();
  const code = data.current_weather.weathercode;
  const desc = ({
    0:'Clear',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',
    45:'Fog',48:'Rime fog',51:'Drizzle',61:'Rain',71:'Snow',80:'Rain showers'
  })[code] || 'Weather';
  return { name: g.name, temp: data.current_weather.temperature, description: desc };
}
