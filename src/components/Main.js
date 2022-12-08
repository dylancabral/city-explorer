import axios from 'axios';
import React from 'react';
import CitySearch from './CitySearch';
import Lat from './Lat';
import Map from './Map';
import Weather from './Weather';
import Movies from './Movies';
import { Container, Row, Col, CardGroup } from 'react-bootstrap';


const storage = {};
console.log({ storage });

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayError: false,
      displayMap: false,
      displayWeather: false,
      displayMovies: false,
      searchQuery: '',
      location: {},
      latitude: '',
      longitude: '',
      errorMessage: null,
      weather: [],
      movie: [],
      name: ''
    };
  }

  updateCity = e => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  getCityLocation = async () => {
    // let location;
    if (storage[this.state.searchQuery] === undefined) {
      console.log('getting location');
      console.log('here is your search query:', this.state.searchQuery);
      const locationUrl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONS}&q=${this.state.searchQuery}&format=json`;
      console.log('here is my location', locationUrl);
      let location;
      try {
        location = await axios.get(locationUrl);
        console.log('got my location', { location });
        this.setState({
          location: location.data[0],
          name: location.data[0].display_name,
          latitude: location.data[0].lat,
          longitude: location.data[0].lon,
          displayMap: true,
          displayError: false,
        });
        storage[this.state.searchQuery] = location.data[0];
      } catch (error) {
        console.log('error getting LOCATION!', locationUrl);
        // console.log('error: ', error);
        //     console.log('error.message: ', error.message);
        this.setState({
          displayMap: false,
          displayError: true,
          errorMessage:
            error.response.status + ': ' + error.response.data.error,
        });
      }
      if (location && location.data) {
        let lat = location.data[0].lat;
        let lon = location.data[0].lon;
        this.getWeather(lat, lon);
      }
    } else {
      console.log('retrieving information');
      this.setState({
        location: storage[this.state.searchQuery],
        name: storage[this.state.searchQuery].display_name,
        latitude: storage[this.state.searchQuery].lat,
        longitude: storage[this.state.searchQuery].lon,
        displayMap: true,
        displayError: false,
      });
      let lat = storage[this.state.searchQuery].lat;
      let lon = storage[this.state.searchQuery].lon;
      this.getWeather(lat, lon);

    }
    // let lat, lon;
    // if (location && location.data) {
    //   lat = location.data[0].lat;
    //   lon = location.data[0].lon;

    // } else{ 

    // }

    // this.getWeather(lat, lon);
    this.getMovie();
  };

  getWeather = async (lat, lon) => {
    // console.log(this.state.latitude);
    // console.log(this.state.longitude);
    // const lat = this.state.latitude;
    // const lon = this.state.longitude;
    try {
      let forecastData = await axios.get(
        `${process.env.REACT_APP_SERVER}/weather`,
        { params: { lat: lat, lon: lon } }
      );
      console.log('here is your weather', forecastData.data);
      this.setState({
        weather: forecastData.data,
        displayWeather: true,
      });
    } catch (error) {
      console.log('error in WEATHER!', error);
      this.setState({
        //weather: [],
        displayWeather: false,
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
        { params: { location: this.state.searchQuery } }
      );
      console.log('here are your movies!', movieData.data);
      this.setState({
        movie: movieData.data,
        displayMovies: true
      });
    } catch (error) {
      console.log('error in MOVIES');
      this.setState({
        displayMovies: false,
        displayError: true,
        errorMessage: error.response.status + ': ' + error.response.data.error,
      });
    }
  };

  // handleSearchRequest = async () => {
  //   await this.getCityLocation();
  //   this.getWeather();
  //   this.getMovie();
  // }
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
                  city={this.state.name}
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
                  city={this.state.name}
                //displayMap={this.state.displayMap}
                />
              </Col>
            </Row>
          </>
        )}{this.state.displayWeather && (

          <Weather
            weather={this.state.weather}
            city={this.state.searchQuery}
          />

        )}
        {this.state.displayMovies && (
        <>
        <h3>Movies Showing here</h3>
          <CardGroup>
              
            <Movies movie={this.state.movie} city={this.state.searchQuery} />

          </CardGroup>
          </>
        )}
      </Container>
    );
  }
}

export default Main;
