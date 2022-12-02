import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import CardGroup  from 'react-bootstrap/CardGroup'
import DailyWeather from './DailyWeather'

class Weather extends React.Component {
  render() {

    return (
      <div id='weatherCard'>
        <CardGroup style={{width: '18rem'}}>
          <h3>
            Weather
          </h3>{ this.props.weather.length > 0 && this.props.weather.map((day,index) =>(
            <DailyWeather 
            key={index}
            day={day.date}
            description={day.description} 
            />
          ))}
        </CardGroup>
      </div>
    )
  }
}

export default Weather
