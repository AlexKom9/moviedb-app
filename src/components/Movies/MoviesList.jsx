import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";
import _ from "lodash"

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    }
  };

  getMovies = (filters, page) => {
    const {getTotalPages} = this.props;
    const {sort_by, primary_release_year} = filters;
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          movies: data.results,
          // total_pages: data.total_pages
        });
        console.log(getTotalPages);
        getTotalPages(data.total_pages);
      })
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page)
  //  question
  }


  componentDidUpdate(prevProps) {
    if(!_.isEqual(this.props.filters, prevProps.filters)){
      this.props.changePage(1);
      this.getMovies(this.props.filters, 1);
    }
    if(this.props.page !== prevProps.page){
      this.getMovies(this.props.filters, this.props.page)
    }
  }

  render() {
    console.log('render');
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
