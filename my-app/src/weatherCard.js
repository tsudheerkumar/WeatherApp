import { Card } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';
import "./App.css"
function WeatherCard (props) {
    const {
        dt_txt,
        main:{
            temp,
            humidity,
        },
        weather:[{
            description,
        }],
    } =props.data;
    const {
        name,
        sunrise,
        sunset,
    } =props.city;

return (
    <>
    <Card>
        <Card.Content>
            <Card.Header className="header">City Name: {name}</Card.Header>
            <div className="flex-items">
                <p>Day: {dt_txt} </p>
                <p>Humidity: {humidity} %</p>
            </div>
            <div className="flex-items">
                <p>Temprature: {temp}</p>
                <p>Description: {description}</p>
            </div>
            <div className="flex-items">
                <p>Sunrise: {new Date(sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                <p>Sunset: {new Date(sunset * 1000).toLocaleTimeString('en-IN')}</p>
            </div>           
        </Card.Content>
    </Card>
    </>    
);
}
WeatherCard.propTypes = {
    city: PropTypes.object,
    data: PropTypes.object,
}
export default WeatherCard;