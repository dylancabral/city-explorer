import axios from 'axios';
import React from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      lat: '',
      lon: '',
      name: '',
      showCityData: false,
      isError: false,
      errorMessage: ''
    }
  }

  handleCitySubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(this.state.city);
      // e.target.city.value;

      //  Make a request to the API using the URL
      let locationInfo = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONS}&q=${this.state.city}&format=json`);
      // proof of life
      // console.log(locationInfo.data[0]);
      // put the data from the API into state
      this.setState({
        lon: locationInfo.data[0].lon,
        lat: locationInfo.data[0].lat,
        name: locationInfo.data[0].display_name,
        showCityData: true,
        isError: false,
        isAlertShown: false,
      });
    } catch (error) {
      // console.log('error: ', error);
      //     console.log('error.message: ', error.message);
          this.setState({
            errorMessage : error.message,
            isError: true
          })
    }
}



  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    });
  };



  render() {
    // location for maps code
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONS}&center=${this.state.lat},${this.state.lon}&zoom=12`
    // console.log(mapURL);
    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.handleCitySubmit}>
          <label>Search for a City
            <input type='text' name='city' onChange={this.handleCityInput} />
          </label>
          <button type='submit'>Explore!</button>
        </form>
        {this.state.isError ? <Alert className="alert" variant="danger"><Alert.Heading>Error!</Alert.Heading><p>{this.state.errorMessage}</p></Alert> : <p className='alert'></p>}
        {this.state.showCityData &&
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>location</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.name}</td>
                <td>{this.state.lat}</td>
                <td>{this.state.lon}</td>
              </tr>
            </tbody>
          </Table>
        }
        <div id="mapURL">
        {this.state.showCityData && <img src={mapURL} alt='City Map'/>}
        </div>

      </>
    )
  }


}


export default App;
