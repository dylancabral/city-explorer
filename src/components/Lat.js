import React from 'react';

class Lat extends React.Component {
  render() {
    return (
      <>
        <h2>Check out {this.props.city}</h2>
        <p>
          {this.props.query.replace(
            /\w\S*/g,
            w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()
          )}{' '}
          is physically located at {this.props.lat} latitude and by{' '}
          {this.props.lon} longitude.
        </p>
      </>
    );
  }
}
export default Lat;
