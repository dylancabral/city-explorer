import React from 'react';
import Card from 'react-bootstrap/Card';

class Movie extends React.Component {
  render(){
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{this.props.movie.title}</Card.Title>
        <Card.Text>About This Movie:
          {this.props.movie.overview}
        </Card.Text>
        <Card.Text>
          {this.props.movie.imageUrl}
        </Card.Text>
        <Card.Text>Movie Release Date:
          {this.props.movie.release_date}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
}

export default Movie;
