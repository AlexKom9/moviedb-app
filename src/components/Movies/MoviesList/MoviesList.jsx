import React from "react";
import MovieItem from "../MovieItem";
import PropTypes from "prop-types";

const MovieList = ({ movies = [], col = 'col-6' }) => {
  return (
    <div className="row">
      {movies.map(movie => (
        <div key={movie.id} className={`${col} mb-4`}>
          <MovieItem
            item={movie}
          />
        </div>
      ))}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MovieList;
