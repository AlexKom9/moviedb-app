import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actionCreatorGetMovies } from "../../../actions/actions";
import { bindActionCreators } from "redux";

const mapStateToProps = ({ movies }) => {
  return {
    movies: movies.data,
    total_pages: movies.total_pages
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getMovies: actionCreatorGetMovies
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
        getTotalPages: PropTypes.func,
        changePage: PropTypes.func,
        // page: PropTypes.number.isRequired
      };

      getMovies = (filters, page) => {
        const { sort_by, primary_release_year, with_genres } = filters;
        const queryStringParams = {
          sort_by,
          language: "ru-RU",
          page,
          primary_release_year,
          with_genres
        };
        if (with_genres.length > 0)
          queryStringParams.with_genres = with_genres.join(",");
        this.props.getMovies(queryStringParams);
      };

      componentDidMount() {
        this.getMovies(this.props.filters, this.props.page);
      }

      componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props.filters, prevProps.filters)) {
          this.props.changePage(1);
          this.getMovies(this.props.filters, 1);
          console.log(this.props.filters);
        }
        if (this.props.page !== prevProps.page) {
          this.getMovies(this.props.filters, this.props.page);
        }
      }

      render() {
        console.log("render MoviesHOC");
        return <Component {...this.props} movies={this.props.movies} />;
      }
    }
  );
