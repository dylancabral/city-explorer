import React from 'react';
import Card from 'react-bootstrap/Card';

class DailyWeather extends React.Component {
  render(){
  return (
    <div id='weatherCard'>
    <Card style={{ width: '18rem' }} eventKey={this.key}>
      <Card.Header>{this.props.date}</Card.Header>
      <Card.Body>
        <Card.Title>{this.props.description}</Card.Title>
      </Card.Body>
    </Card>
    </div>
  );
}
}

export default DailyWeather;
