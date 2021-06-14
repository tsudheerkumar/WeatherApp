import './App.css';
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { getData } from './services/data';
import WeatherCard from './weatherCard';
import { Dimmer, Loader } from 'semantic-ui-react';

const refresh = () => {
  window.location.reload();
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData()
      .then(items => {
          setData(items);
      })
  }, [])

  return (
    <div className="wrapper">
      {(typeof data.list != 'undefined') ? (
        <>
        <div className="app-header">
          <h1>My Weather App</h1>
          <Button className="button" inverted color='blue' circular icon='refresh' onClick={refresh} />
        </div>
        <ul className="card-container">
          {data.list && data.list.map((item,index) => {
              return <WeatherCard city={data.city} key={index} data={item} />
          })}
        </ul>
     </>
      ): (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
       </div>
     )}
     </div>
  );
}

export default App;
