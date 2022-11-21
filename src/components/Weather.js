import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import CardGroup  from 'react-bootstrap/CardGroup'
import DailyWeather from './DailyWeather'

class Weather extends React.Component {
  render() {

    return (
      <div>
        <CardGroup>
          <h3>
            Weather
          </h3>{ this.props.weather.map((day,index) =>(
            <DailyWeather 
            key={index}
            day={day} 
            />
          ))}
        </CardGroup>
      </div>
    )
  }
}

export default Weather
