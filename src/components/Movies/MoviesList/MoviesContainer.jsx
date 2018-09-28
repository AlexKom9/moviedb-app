import React, { Component } from "react";
import _ from "lodash";
import queryString from "query-string";
import { API_URL, API_KEY_3 } from "../../../api/api";
import PropTypes from 'prop-types';
import MoviesList from './MoviesList';


export default class MoviesContainer extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  static propTypes = {
    filters: PropTypes.object.isRequired,
    getTotalPages: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
  };

  getMovies = (filters, page) => {
    const { getTotalPages } = this.props;
    const { sort_by, primary_release_year, with_genres } = filters;

    let genreString = "";

    for (let i = 0; i < with_genres.length; i++) {
      genreString += `&with_genres=${with_genres[i]}`;
    }

    const queryStringParams = {
      api_key: API_KEY_3,
      sort_by,
      language: "ru-RU",
      page,
      primary_release_year
    };
    const link = `${API_URL}/discover/movie?${queryString.stringify(
      queryStringParams
    )}${genreString}`;
    fetch(link)
      .then(response => response.json())
      .then(data => {
        getTotalPages(data.total_pages);
        this.setState({
          movies: data.results
        });
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.filters, prevProps.filters)) {
      this.props.changePage(1);
      this.getMovies(this.props.filters, 1);
    }
    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <MoviesList movies={movies}/>
    );
  }
}
