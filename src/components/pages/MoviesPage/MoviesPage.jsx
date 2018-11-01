import React from "react";
import Filters from "../../Filters/Filters";
import MoviesHOC from "../../HOC/MoviesHOC";
import MovieList from "../../Movies/MoviesList/MoviesList";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/actions";

const MoviesContainer = MoviesHOC(MovieList);

class MoviesPage extends React.Component {
  render() {
    const { resetFilters } = this.props;
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
                <Filters />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesContainer />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetFilters: actions.actionCreatorResetFilters
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesPage);
