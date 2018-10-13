import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import CallApi from "../../../api/api";
import AppConsumerHOC from "../../HOC/AppConsumerHOC";

export default Component =>
  AppConsumerHOC(
    class MoviesHOC extends React.PureComponent {
      constructor() {
        super();
        this.state = {
          movies: []
        };
      }

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

        CallApi.get(`/discover/movie?`, { params: queryStringParams }).then(
          data => {
            getTotalPages(data.total_pages);
            this.setState({
              movies: data.results
            });
          }
        );
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
        const { movies } = this.state;
        console.log("render MoviesHOC");
        return <Component {...this.props} movies={movies} />;
      }
    }
  );
