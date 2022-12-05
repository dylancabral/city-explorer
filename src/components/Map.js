import React from 'react'
import Image from 'react-bootstrap/Image'

class Map extends React.Component{
  render(){
    return(
      <Image 
      src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONS}&center=${this.props.lat},${this.props.lon}&size=${window.innerWidth}x300&format=jpg&zoom=12 `}
      alt={this.props.city} 
      title={this.props.city}
      rounded
      fluid/>
    );
  }
}
export default Map;
