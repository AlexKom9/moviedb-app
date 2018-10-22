import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/actions";

const mapStateToProps = ({ movies }) => {
  return {
    movies: movies.data,
    total_pages: movies.total_pages,
    filters: movies.filters,
    page: movies.page,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getMovies: actions.actionCreatorGetMovies,
      changePage: actions.actionCreatorChangePage,
    },
    dispatch
  );
};

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class MoviesHOC extends React.PureComponent {
      static propTypes = {
        filters: PropTypes.object.isRequired,
        getMovies: PropTypes.func.isRequired
      };

      componentDidMount() {
        this.props.getMovies(this.props.filters, 1);
      }

      render() {
        console.log("render MoviesHOC");
        return <Component {...this.props} movies={this.props.movies} />;
      }
    }
  );
