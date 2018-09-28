import React from "react";
import PropTypes from 'prop-types';

const Genres = ({ allGenres, onChange, with_genres }) => (
  <div className="mb-4">
    <ul>
      {allGenres.map(genre => (
        <li key={genre.id}>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id={genre.id}
              onChange={onChange}
              checked={with_genres.includes(String(genre.id))}
            />
            <label className="custom-control-label" htmlFor={genre.id}>
              {genre.name}
            </label>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

Genres.defaultProps = {
  allGenres: [],
  with_genres: []
};
Genres.propTypes = {
  allGenres: PropTypes.array.isRequired,
  with_genres: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};
Genres.displayName = 'Genres';


export default Genres