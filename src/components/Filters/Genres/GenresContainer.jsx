import React from "react";
import Genres from "./Genres";
import PropTypes from "prop-types";
// import { API_URL, API_KEY_3 } from "../../api/api";

export default class GenresContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      allGenres: []
    };
  }

  static propTypes = {
    filters: PropTypes.object.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  };

  componentDidMount() {
    const link =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=942fe0c9aeb6728941df8e74f3fbce09&language=ru-RU";
    fetch(link)
      .then(response => response.json())
      .then(data => {
        this.setState({
          allGenres: data.genres
        });
      });
  }

  changeHandler = event => {
    const {
      filters: { with_genres },
      onChangeFilters
    } = this.props;

    const currentId = event.target.id;
    let value = [];
    if (with_genres.includes(currentId)) {
      value = with_genres.filter(id => id !== currentId);
    } else {
      value = [...with_genres, currentId];
    }
    onChangeFilters({
      target: {
        name: "with_genres",
        value
      }
    });
  };

  render() {
    const { allGenres } = this.state;
    const {
      filters: { with_genres }
    } = this.props;
    return (
      <Genres
        onChange={this.changeHandler}
        allGenres={allGenres}
        with_genres={with_genres}
      />
    );
  }
}
