import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import AppConsumerHOC from "../../HOC/AppConsumerHOC";
import { connect } from "react-redux";
import {
  actionCreatorGetMovies
} from "../../../actions/actions";
import { bindActionCreators } from "redux";

const mapStateToProps = state => {
  return {
    movies: state.movies.data
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // updateMovies: actionCreatorUpdateMovies
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
    AppConsumerHOC(
      class MoviesHOC extends React.PureComponent {
        static propTypes = {
          filters: PropTypes.object.isRequired,
          getTotalPages: PropTypes.func.isRequired,
          changePage: PropTypes.func.isRequired,
          page: PropTypes.number.isRequired
        };

        getMovies = (filters, page) => {
          const { getTotalPages } = this.props;
          const { sort_by, primary_release_year, with_genres } = filters;

          let genreString = "";

          const queryStringParams = {
            sort_by,
            language: "ru-RU",
            page,
            primary_release_year,
            with_genres
          };

          if (with_genres.length > 0) {
            queryStringParams.with_genres = with_genres.join(",");
          }

          // CallApi.get(`/discover/movie?`, { params: queryStringParams }).then(
          //   data => {
          //     getTotalPages(data.total_pages);
          //     // this.props.updateMovies(data.results);
          //   }
          // );
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
          //TODO: optimize
          // if (
          //   !_.isEqual(
          //     _.get(prevProps, "user.id"),
          //     _.get(this.props, "user.id")
          //   ) &&
          //   _.get(this.props, "user.id")
          // ) {
          //   this.getFavoriteMovies();
          // }
        }

        render() {
          console.log("render MoviesHOC");
          return <Component {...this.props} movies={this.props.movies} />;
        }
      }
    )
  );
