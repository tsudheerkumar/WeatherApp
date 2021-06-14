import {API_KEY} from "../config.json"
export function getData() {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Bangalore&appid=${API_KEY}`)
      .then(data => data.json())
  }