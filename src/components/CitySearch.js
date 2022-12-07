import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Alert, Button } from 'react-bootstrap';

class CitySearch extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleGetCity();
    // this.props.searchedCity(e.target.location.value.toLowerCase());
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className='mb-3' controlId='cityName'>
          <Form.Label>What City Are You Trying to Check Out?</Form.Label>
          <Form.Control
            onChange={this.props.handleUpdateCity}
            type='text'
            placeholder='explore a city!'
          />
        </Form.Group>
        {this.props.displayError && (
          <>
            <Alert variant='danger'>
              <strong>Error {''}</strong>
              {this.props.errorMessage}, Incorrect Search, do Better!
            </Alert>
          </>
        )}
        <Button variant='primary' type='submit'>
          Explore!
        </Button>
      </Form>
    );
  }
}

export default CitySearch;
