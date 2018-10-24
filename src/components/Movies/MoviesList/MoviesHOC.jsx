import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/actions";
import Loader from '../../Loader'

const mapStateToProps = ({ movies }) => {
  return {
    movies: movies.data,
    total_pages: movies.total_pages,
    filters: movies.filters,
    page: movies.page,
    isFetching: movies.isFetching,
    success: movies.success,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getMovies: actions.actionCreatorGetMovies,
      changePage: actions.actionCreatorChangePage
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
        return this.props.isFetching ? (
          <Loader/>
        ) : (
          <Component
          {...this.props}
          movies={this.props.movies}
          success={this.props.success}
          error={this.props.error} />
        );
      }
    }
  );
