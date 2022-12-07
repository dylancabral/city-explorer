import React from 'react';
import Card from 'react-bootstrap/Card';

class DailyWeather extends React.Component {
  render() {
    console.log('The Forecast: ', this.props.day);
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Header>{this.props.day.time}</Card.Header>
        <Card.Body>
          <Card.Title>{this.props.day.forecast}</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default DailyWeather;
