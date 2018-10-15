import React from "react";
import Filters from "../../Filters/Filters";
import MoviesHOC from "../../Movies/MoviesList/MoviesHOC";
import MovieList from "../../Movies/MoviesList/MoviesList";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  actionCreatorChangePage,
  actionCreatorUpdateFilters,
  actionCreatorResetFilters
} from "../../../actions/actions";
const MoviesContainer = MoviesHOC(MovieList);

class MoviesPage extends React.PureComponent {

  onChangeFilters = event => {
    const { filters, updateFilters } = this.props;
    const newFilters = {
      ...filters,
      [event.target.name]: event.target.value
    };
    updateFilters(newFilters);
  };

  render() {
    const {
      total_pages,
      onChangePage,
      resetFilters,
      filters,
      page
    } = this.props;
    console.log("render MoviesPage");
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <div className="mb-4">
                  <button
                    className="btn btn-light border"
                    onClick={resetFilters}
                  >
                    Очистить фильры
                  </button>
                </div>
                <Filters
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={onChangePage}
                  total_pages={total_pages}
                  page={page}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesContainer
              filters={filters}
              changePage={onChangePage}
              page={page}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ movies }) => {
  return {
    total_pages: movies.total_pages,
    page: movies.page,
    filters: movies.filters
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onChangePage: actionCreatorChangePage,
      updateFilters: actionCreatorUpdateFilters,
      resetFilters: actionCreatorResetFilters
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesPage);
