import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";
import _ from "lodash";
import queryString from "query-string";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  };

  getMovies = (filters, page) => {
    const { getTotalPages } = this.props;
    const { sort_by, primary_release_year, with_genres } = filters;

    let genreString = "";

    for (let i = 0; i < with_genres.length; i++) {
      genreString = genreString + `&with_genres=${with_genres[i]}`;
    }

    const queryStringParams = {
      api_key: API_KEY_3,
      sort_by: sort_by,
      language: "ru-RU",
      page: page,
      primary_release_year: primary_release_year
    };
    //make it by hands
    // const getQueryStringParams = object => {
    //   let string = "";
    //   for (let key in object){
    //     string = string + `&${key}=${object[key]}`;
    //   }
    //   return '?' + string.substring(1, string.length)
    // };
    const link = `${API_URL}/discover/movie?${queryString.stringify(
      queryStringParams
    )}${genreString}`;

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        getTotalPages(data.total_pages);
        this.setState({
          movies: data.results
        });
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
    //  question
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.filters);
    console.log(prevProps.filters);

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
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
