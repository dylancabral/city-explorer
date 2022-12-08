import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DailyWeather from './DailyWeather';

class Weather extends React.Component {
  render() {
    return (
      <div>
          <h3>Weather for: {this.props.city}</h3>
          {this.props.weather.length &&
            this.props.weather.map((day, index) => (
              <DailyWeather class="weather" key={index} day={day} />
            ))}
      </div>
    );
  }
}

export default Weather;
