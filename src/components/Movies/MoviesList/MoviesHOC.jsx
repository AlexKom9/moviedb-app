import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import CallApi from "../../../api/api";
import AppConsumerHOC from "../../HOC/AppConsumerHOC";

export default Component =>
  AppConsumerHOC(
    class MoviesHOC extends React.Component {
      constructor() {
        super();
        this.state = {
          movies: [],
          favor_movies: [],
          watch_list: []
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

        for (let i = 0; i < with_genres.length; i++) {
          genreString += `&with_genres=${with_genres[i]}`;
        }
        //TODO: Add with_genres query param
        const queryStringParams = {
          sort_by,
          language: "ru-RU",
          page,
          primary_release_year
        };

        CallApi.get(`/discover/movie?`, { params: queryStringParams }).then(
          data => {
            getTotalPages(data.total_pages);
            this.setState({
              movies: data.results
            });
          }
        );
      };

      getFavorMovies = () => {
        const queryStringParams = {
          session_id: this.props.session_id
        };
        CallApi.get(`/account/${this.props.user.id}/favorite/movies?`, {
          params: queryStringParams
        }).then(data => {
          this.setState({
            favor_movies: data.results
          });
        });
      };

      getWatchList = () => {
        const queryStringParams = {
          session_id: this.props.session_id
        };
        CallApi.get(`/account/${this.props.user.id}/watchlist/movies?`, {
          params: queryStringParams
        }).then(data => {
          this.setState({
            watch_list: data.results
          });
        });
      };

      componentDidMount() {
        this.getMovies(this.props.filters, this.props.page);
        if (this.props.session_id) {
          this.getFavorMovies();
          this.getWatchList();
        }
      }

      componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props.filters, prevProps.filters)) {
          this.props.changePage(1);
          this.getMovies(this.props.filters, 1);
        }
        if (this.props.page !== prevProps.page) {
          this.getMovies(this.props.filters, this.props.page);
        }
        //TODO: optimize
        if (
          !_.isEqual(
            _.get(prevProps, "user.id"),
            _.get(this.props, "user.id")
          ) &&
          _.get(this.props, "user.id")
        ) {
          this.getFavorMovies();
          this.getWatchList();
        }
      }

      render() {
        const { movies, favorite_movies, watch_list } = this.state;
        // console.log(this.props);
        console.log("render MoviesHOC");
        return (
          <Component
            {...this.props}
            movies={movies}
            favorite_movies={favorite_movies}
            watch_list={watch_list}
          />
        );
      }
    }
  );
