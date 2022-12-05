import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import CardGroup  from 'react-bootstrap/CardGroup';
import Movie from './Movie';


class Movies extends React.Component {
  render() {

    return (
      <div>
        <CardGroup>
          <h3>
            Movies
          </h3>{this.props.movie.length && this.props.movie.map((movie,index) =>(
            <Movie 
            key={index}
            title={movie.title}
            description={movie.overview}
            src={movie.image_url}
            popularity={movie.popularity}
            release_date={movie.release_date} 
            />
          ))}
        </CardGroup>
      </div>
    );
  }
}

export default Movies
