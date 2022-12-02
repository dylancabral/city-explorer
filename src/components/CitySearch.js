import React from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import { Alert } from 'bootstrap';

class CitySearch extends React.Component {
  // handleSubmit= (e) =>{
  //   e.preventDefault();
  //   this.props.handleCitySubmit();
  // }
  render() {


    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="cityName">
            <Form.Label>Your City</Form.Label>
            <Form.Control onChange={e => this.props.updateCity(e.target.value)} type='text' placeholder='explore a city!' />
          </Form.Group>
          <Alert variant="danger">
            <strong className='mr-auto'>Error {''}</strong>{this.props.error},Incorrect Search, do Better!
          </Alert>
          <Button variant='primary' type='submit' onClick={() => this.props.getLocation} >
            Explore!
          </Button>
        </Form>
      </>
    );
  }
}

export default CitySearch;
