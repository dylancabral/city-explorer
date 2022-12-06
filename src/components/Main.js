import axios from 'axios';
import React from 'react';
import CitySearch from './CitySearch';
import Lat from './Lat';
import Map from './Map';
import Weather from './Weather';
import Movies from './Movies';
import { Container, Row, Col } from 'react-bootstrap';

const storage = {};
console.log({ storage });

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayError: false,
      displayMap: false,
      searchQuery: '',
      location: {},
      latitude: '',
      longitude: '',
      //error: null,
      weather: [],
      movie: [],
    };
  }

  updateCity = e => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  getCityLocation = async () => {
    if (storage[this.state.searchQuery] === undefined) {
      console.log('getting location');
      console.log('here is your search query:', this.searchQuery);
      const locationUrl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONS}&q=${this.state.searchQuery}&format=json`;
      let location;
      console.log('here is my location', location, locationUrl);
      try {
        location = await axios.get(locationUrl);
        //console.log('got my location', { location });
        this.setState({
          name: location.data[0].display_name,
          latitude: location.data[0].lat,
          longitude: location.data[0].lon,
          displayMap: true,
          displayError: false,
        });
        storage[this.state.searchQuery] = location.data[0];
      } catch (error) {
        console.log('error getting LOCATION!');
        // console.log('error: ', error);
        //     console.log('error.message: ', error.message);
        this.setState({
          displayMap: false,
          displayError: true,
          errorMessage:
            error.response.status + ': ' + error.response.data.error,
        });
      }
    } else {
      console.log('retrieving information');
      this.setState({
        location: storage[this.state.searchQuery].display_name,
        latitude: storage[this.state.searchQuery].lat,
        longitude: storage[this.state.searchQuery].lon,
        displayMap: true,
        displayError: false,
      });
    }
    this.getWeather();
    this.getMovie();
  };

  getWeather = async () => {
    // const lat = this.state.latitude;
    // const lon = this.state.longitude;
    try {
      let forecastData = await axios.get(
        `${process.env.REACT_APP_SERVER}/weather`,
        { params: { lat: this.state.latitude, lon: this.state.longitude } }
      );
      console.log('here is your weather', forecastData);
      this.setState({
        weather: forecastData.data,
      });
    } catch (error) {
      console.log('error in WEATHER!', error);
      this.setState({
        //weather: [],
        displayMap: false,
        displayError: true,
        errorMessage: error.response.status + ': ' + error.response.data.error,
      });
    }
  };

  getMovie = async () => {
    //let cityName = this.state.location.display_name.split(',')[0];
    //console.log(cityName);
    try {
      const movieData = await axios.get(
        `${process.env.REACT_APP_SERVER}/movies`,
        { params: { city: this.state.searchQuery } }
      );
      console.log('here are your movies!', movieData);
      this.setState({
        movie: movieData.data,
      });
    } catch (error) {
      console.log('error in MOVIES');
      this.setState({
        displayError: true,
        errorMessage: error.response.status + ': ' + error.response.data.error,
      });
    }
  };

  // searchedCity = location => {
  //   this.setState({ searchQuery: location }, this.getLocation);
  // };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <CitySearch
              handleUpdateCity={this.updateCity}
              handleGetCity={this.getCityLocation}
              // searchedCity={this.searchedCity}
              errorMessage={this.state.errorMessage}
              displayError={this.state.displayError}
            />
          </Col>
        </Row>
        {this.state.displayMap && (
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
                  //displayMap={this.state.displayMap}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Weather
                  weather={this.state.weather}
                  city={this.state.location}
                />
              </Col>
              <Col>
                <Movies movie={this.state.movie} city={this.state.location} />
              </Col>
            </Row>
          </>
        )}
      </Container>
    );
  }
}

export default Main;
