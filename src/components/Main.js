import axios from "axios";
import React from 'react';
import CitySearch from './CitySearch'
import Lat from './Lat'
import Map from './Map'
import Weather from './Weather';
import Movies from './Movies';
import { Container, Row, Col } from 'react-bootstrap'

const storage = {}
console.log({ storage });


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayError: false,
      displayMap: false,
      location: '',
      latitude: '',
      longitude: '',
      name: '',
      updateCity: false,
      errorMessage: '',
      weather: [],
      movie: []
    }
  }

  updateCity = (event) => {
    this.setState({ searchQuery: event.target.value })
  }



  handleCitySubmit = async () => {
    if (storage[this.state.searchQuery] === undefined) {
      console.log('getting location')
      const url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONS}&q=${this.state.city}&format=json`;
      let location;
      try {
        location = await axios.get(url);
        console.log('got my location', { location })
        this.setState({
          longitude: location.data[0].longitude,
          latitude: location.data[0].latitude,
          name: location.data[0].display_name,
          displayMap: true,
          displayError: false
        });
        storage[this.state.searchQuery] = location.data[0];
      } catch (error) {
        // console.log('error: ', error);
        //     console.log('error.message: ', error.message);
        this.setState({
          displayMap: false,
          displayError: true,
          errorMessage: error.response.status + ': ' + error.response.data.error
        });
      }
    } else {
      console.log('retreiving information');
      this.setState({
        location: storage[this.state.searchQuery].display_name,
        latitude: storage[this.state.searchQuery].latitude,
        longitude: storage[this.state.searchQuery].longitude,
        displayMap: true,
        displayError: false

      })
    }
    this.handleGetWeather();
    this.handleGetMovie();
  }


  handleGetMovie = async () => {
    try {
      const movie = await axios.get(`${process.env.REACT_APP_SERVER}/movies`, { params: { city: this.state.searchQuery } });
      this.setState({
        movie: movie.data
      });
    } catch (error) {
      this.setState({
        displayMap: false,
        displayError: true,
        errorMessage: error.response.status + ': ' + error.response.data.error
      });
    }
  }




  handleGetWeather = async () => {
    try {
      const weather = await axios.get(`${process.env.REACT_APP_SERVER}/weather`, { params: { latitude: this.state.latitude, longitude: this.state.longitude } });
      this.setState({
        weather: weather.data
      });
    } catch (error) {
      console.log('error in weather', error)
      this.setState({
        displayMap: false,
        displayError: true,
        errorMessage: error.response.status + ': ' + error.response.data.error
      })
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <CitySearch
              updateCity={this.updateCity}
              handleCitySubmit={this.handleCitySubmit}
              errorMessage={this.state.errorMessage}
              displayError={this.state.displayError}
            />
          </Col>
        </Row>
        {this.state.displayMap &&
          <>
            <Row>
              <Col>
                <Lat
                  city={this.state.location}
                  query={this.state.searchQuery}
                  lat={this.state.latitude}
                  lon={this.state.longitude}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Map
                  img_url={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONS}&center=${this.state.latitude},${this.state.longitude}&size=${window.innerWidth}x300&format=jpg&zoom=12`}
                  city={this.state.location}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Weather
                  weather={this.state.weather}
                />
              </Col>
              <Col>
                <Movies
                  movie={this.state.movie}
                />
              </Col>
            </Row>

          </>
        }
      </Container>
    )
  }
}
export default Main;



