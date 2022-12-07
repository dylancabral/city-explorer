import React from 'react';
import Card from 'react-bootstrap/Card';

class Movie extends React.Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        {this.props.movie.imageUrl && (
        <Card.Img variant='top' src={this.props.movie.imageUrl} alt={this.props.movie.title} />
        )}
        <Card.Body>
          <Card.Title>{this.props.movie.title}</Card.Title>
          <Card.Text>
            About This Movie:
            {this.props.movie.overview}
          </Card.Text>
          <Card.Text></Card.Text>
          <Card.Text>
            Movie Release Date:
            {this.props.movie.release_date}
          </Card.Text>
          <Card.Text>
            Movie Popularity:
            {this.props.movie.popularity}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Movie;
