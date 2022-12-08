import React from 'react';
import { Carousel, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

class DailyWeather extends React.Component {
  render() {
    console.log('The Forecast: ', this.props.day);
    return (
      <div class="container">
        {this.props.day.time}
        {this.props.day.forecast}
        </div>
    );
  }
}

export default DailyWeather;
