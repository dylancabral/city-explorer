import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardGroup from 'react-bootstrap/CardGroup';
import Movie from './Movie';

class Movies extends React.Component {
  render() {
    return (
      <div>
        <CardGroup>
          <h3>Movies Showing in {this.props.city}</h3>
          {this.props.movie.length &&
            this.props.movie.map((movie, idx) => (
              <Movie key={idx} movie={movie} />
            ))}
        </CardGroup>
      </div>
    );
  }
}

export default Movies;
