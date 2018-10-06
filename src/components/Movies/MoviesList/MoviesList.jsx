import React from "react";
import MovieItem from "../MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";

const MovieList = ({ movies = [], favorite_movies = [] }) => {
  return (
    <div className="row">
      {movies.map(movie => (
        <div key={movie.id} className="col-6 mb-4">
          <MovieItem
            item={movie}
            like={
              favorite_movies.findIndex(
                favorMovie => favorMovie.id === movie.id
              ) !== -1
            }
          />
        </div>
      ))}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MoviesHOC(MovieList);
