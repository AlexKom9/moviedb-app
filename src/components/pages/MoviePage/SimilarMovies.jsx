import React, { Component } from "react";
import PropTypes from "prop-types";
import CallApi from "../../../api/api";
import MoviesList from '../../Movies/MoviesList/MoviesList'

class SimilarMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    const { movieId } = this.props;
    const queryStringParams = {
      page: 1
    };
    CallApi.get(`/movie/${movieId}/similar`, {params: queryStringParams}).then(data => {
      this.setState({
        movies: data.results
      })
    });
  }

  render() {
    return (
    <div className="mt-4">
      <MoviesList movies={this.state.movies} col="col-4"/>
    </div>
    );
  }
}

SimilarMovies.propTypes = {};

export default SimilarMovies;
