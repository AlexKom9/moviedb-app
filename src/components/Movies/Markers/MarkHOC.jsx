import React from "react";
import AppConsumerHOC from "../../HOC/AppConsumerHOC";
import CallApi from "../../../api/api";
import _ from "lodash";

function findMovieInArr(id, arr) {
  return arr.findIndex(movie => movie.id === id) !== -1;
}

export default (Component, key) =>
  AppConsumerHOC(
    class MarkHOC extends React.Component {
      constructor(props) {
        super(props);

        const initialState = key => {
          switch (key) {
            case "favorite_movies":
              return this.findMovieInArr(this.props.id, this.props.favorite_movies);
            case "watchlist":
              return this.findMovieInArr(this.props.id, this.props.watchlist);
            default:
              return false;
          }
        };

        this.state = {
          marked: initialState(key)
        };

        this.changeMark = this.changeMark.bind(this);
      }
      findMovieInArr(id, arr) {
        return arr.findIndex(movie => movie.id === id) !== -1;
      }
      fetchMark() {
          const fetchFavoritesMark = () => {
            const queryStringParams = {
              session_id: this.props.session_id
            };
            const body = {
              media_type: "movie",
              media_id: this.props.id,
              favorite: this.state.marked
            };
            CallApi.post(`/account/${this.props.id}/favorite?`, {
              params: queryStringParams,
              body: body
          });
        };

        const fetchWatchListMark = () => {
          const queryStringParams = {
            session_id: this.props.session_id
          };
          const body = {
            media_type: "movie",
            media_id: this.props.id,
            watchlist: this.state.marked
          };
          CallApi.post(`/account/${this.props.id}/watchlist?`, {
            params: queryStringParams,
            body: body
          });
        };

        switch (key) {
          default:
            break;
          case "favorite_movies":
            fetchFavoritesMark();

            break;
          case "watchlist":
            fetchWatchListMark();
            break;
        }
      }

      changeMark() {
        if (this.props.user) {
          this.setState(
            {
              marked: !this.state.marked
            },
            this.fetchMark
          );
        } else {
          this.props.toggleLoginForm();
        }
      }

      componentDidUpdate(prevProps) {
        let arr = [];
        switch (key) {
          case "favorite_movies":
            arr = this.props.favorite_movies;
            break;
          case "watchlist":
            arr = this.props.watchlist;
            break;
          default:
          break;
        }

        if (
          (this.props.isAuth &&
            !_.isEqual(
              prevProps.favorite_movies,
              this.props.favorite_movies
            )) ||
          (!_.isEqual(prevProps.watchlist, this.props.watchlist) &&
            this.props.isAuth)
        ) {
          this.setState({
            marked: this.findMovieInArr(this.props.id, arr)
          });
        }
      }
      render() {
        const { marked } = this.state;
        return <Component marked={marked} changeMark={this.changeMark} />;
      }
    }
  );
