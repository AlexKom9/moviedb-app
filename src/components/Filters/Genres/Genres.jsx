import React from "react";
import PropTypes from "prop-types";
import GenresHOC from "./GenresHOC";
import UICheckBox from "../../UIComponents/UICheckbox";

const Genres = ({ allGenres, onChange, with_genres }) => (
  <div className="mb-4">
    <ul>
      {allGenres.map(genre => (
        <li key={genre.id}>
          <UICheckBox
            id={genre.id}
            labelText={genre.name}
            onChange={onChange}
            checked={with_genres.includes(String(genre.id))}
          />
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
Genres.displayName = "Genres";

export default GenresHOC(Genres);
