import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

const initialState = {
  filters: {
    sort_by: "vote_average.desc",
    primary_release_year: "0",
    with_genres: []
  },
  page: 1,
  total_pages: ""
};

export default class App extends React.Component {
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
  onchangeGenre = genreId => {
    console.log(genreId);

    const { with_genres } = this.state.filters;
    if (!with_genres.includes(Number(genreId))) {
      this.setState(prevState => ({
        filters: {
          ...prevState.filters,
          with_genres: [...prevState.filters.with_genres, Number(genreId)]
        }
      }));
    } else {
      // const newGenre = ;

      this.setState(prevState => ({
        filters: {
          ...prevState.filters,
          with_genres: with_genres.filter(id => {
            return id != genreId;
          })
        }
      }));
    }
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
                  onChangeGenre={this.onchangeGenre}
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
