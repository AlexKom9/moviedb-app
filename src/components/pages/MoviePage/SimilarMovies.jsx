import React, { Component } from "react";
import CallApi from "../../../api/api";
import MoviesList from "../../Movies/MoviesList/MoviesList";
import { withRouter } from "react-router-dom";
import SimilarMoviesPaginatorHOC from "../../HOC/SimilarMoviesPaginatorHOC";
import Paginator from "../../Filters/Paginator";
import Loader from "../../Loader";

const SimilarMoviesPaginator = SimilarMoviesPaginatorHOC(Paginator);

class SimilarMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      total_pages: null,
      total_results: null,
      page: null,
      isFetching: false
    };
  }

  onChangePage = page => {
    page =
      page >= 0
        ? page <= this.state.total_pages
          ? page
          : this.state.total_pages
        : 0;
    this.setState(
      {
        page
      },
      () => {
        this.getMovies(page);
      }
    );
  };

  getMovies = (page = 1) => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const queryStringParams = {
      page
    };
    this.setState({
      isFetching: true
    });
    CallApi.get(`/movie/${id}/similar`, {
      params: queryStringParams
    }).then(data => {
      this.setState({
        movies: data.results,
        total_pages: data.total_pages,
        total_results: data.total_results,
        page: data.page,
        isFetching: false
      });
    });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { movies, isFetching, page, total_pages } = this.state;
    return (
      <div className="mt-4">
        <SimilarMoviesPaginator
          onChangePage={this.onChangePage}
          page={page}
          total_pages={total_pages}
          mode="inline"
        />
        <div className="mt-4">
          {isFetching ? <Loader/> : movies.length ? <MoviesList movies={movies} col="col-4" /> : <p className="text-center">Нет похожих фильмов</p>}
        </div>
      </div>
    );
  }
}

SimilarMovies.propTypes = {};

export default withRouter(SimilarMovies);
