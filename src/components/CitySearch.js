import React from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import { Alert } from 'bootstrap';

class CitySearch extends React.Component {
  handleSubmit= (e) =>{
    e.preventDefault();
    this.props.handleCitySubmit();
  }
  render(){

 
  return (
    <Form onSubmit={this.handleSubmit}>
      <Form.Group className="mb-3" controlId="cityName">
        <Form.Label>Your City</Form.Label>
        <Form.Control onChange={this.props.updateCity} type='text' placeholder='explore a city!'/>
      </Form.Group>
      {this.props.hasError &&
      <>
      <Alert variant="danger"> 
      <strong>Error {''}</strong>{this.props.errorMessage},Incorrect Search, do Better!
      </Alert>
      </>
      }
      <Button variant='primary' type='submit' >
      Explore!
      </Button>
    </Form>
  );
}
}

export default CitySearch;
