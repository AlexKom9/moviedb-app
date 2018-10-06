import React from "react";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList/MoviesList";

const initialState = {
  filters: {
    sort_by: "vote_average.desc",
    primary_release_year: "0",
    with_genres: []
  },
  page: 1,
  total_pages: ""
};

export default class MoviesPage extends React.Component {
  constructor() {
    super();
    this.state = {
      ...initialState
    };
  }

  onChangeFilters = event => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value
    };
    this.setState({
      filters: newFilters
    });
  };

  onChangePage = page => {
    this.setState({
      page
    });
  };

  getTotalPages = totalPages => {
    this.setState({
      total_pages: totalPages
    });
  };

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <div className="mb-4">
                  <button
                    className="btn btn-light"
                    onClick={() =>
                      this.setState({
                        ...initialState
                      })
                    }
                  >
                    Очистить фильры
                  </button>
                </div>
                <Filters
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                  total_pages={total_pages}
                  page={page}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              changePage={this.onChangePage}
              getTotalPages={this.getTotalPages}
              page={page}
            />
          </div>
        </div>
      </div>
    );
  }
}
