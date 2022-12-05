import axios from "axios";
import React from 'react';
import CitySearch from './CitySearch'
import Lat from './Lat'
import Map from './Map'
import Weather from './Weather';
import Movies from './Movies';
import { Container, Row, Col } from 'react-bootstrap'
import { response } from "express";

const storage = {}
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
      error: null,
      weather: [],
      movie: []
    };
  }

  getLocation = async () => {
    if (storage[this.state.searchQuery] === undefined) {
      console.log('getting location')
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONS}&q=${this.state.searchQuery}&format=json`;
      // let location;
      axios
        .get(url)
        .then(response => {
          let locationData = response.data[0];
          this.setState({
            location: response.data[0],
            longitude: locationData.lon,
            latitude: locationData.lat,
            displayMap: true,
            displayError: false
          });
          this.getWeather(locationData.lat, locationData.lon);
          this.getMovie();
        })
        .catch(error => {
          if (error.response) {
            let message = `${error.response.data.error}. ${error.message}${error.code}`;
            this.setState({
              error: { staus: error.response, message: message },
              location: {}
            });
          }
        });
    }
  }


  updateCity = (event) => {
    this.setState({ searchQuery: event.target.value });
    console.log(this.state.searchQuery);
  };


  getWeather = async (lat, lon) => {
    // try {
    const url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`
    // const weather = await axios.get(`${process.env.REACT_APP_SERVER}/weather`, { params: { latitude: this.state.latitude, longitude: this.state.longitude } });
    axios
      .get(url)
      .then(response => {
        console.log(response);
        this.setState({ weather: response.data });
      })
      .catch(error => {
        this.setState({ error: error });

      });
  }

  getMovie = async () => {
    const url = `${process.env.REACT_APP_SERVER}/movies?location=${this.state.location}`
    // const weather = await axios.get(`${process.env.REACT_APP_SERVER}/weather`, { params: { latitude: this.state.latitude, longitude: this.state.longitude } });
    axios
      .get(url)
      .then(response => {
        console.log('I am movie response', response.data);
        this.setState({ movie: response.data });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <CitySearch
              updateCity={this.updateCity}
              handleCitySubmit={this.getLocation}
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
                  query={this.state.searchQuery}
                  city={this.state.location}
                  lat={this.state.latitude}
                  lon={this.state.longitude}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Map
                  // img_url={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONS}&center=${this.state.latitude},${this.state.longitude}&size=${window.innerWidth}x300&format=jpg&zoom=12`}
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
        )}
      </Container>
    )
  }
}
export default Main;



