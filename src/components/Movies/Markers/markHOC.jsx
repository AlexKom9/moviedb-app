import React from "react";
import AppConsumerHOC from "../../HOC/AppConsumerHOC";
import CallApi from "../../../api/api";
import _ from "lodash";

export default (Component, key) =>
  AppConsumerHOC(
    class flagHOC extends React.Component {
      constructor(props) {
        super(props);
        let apiList = [];
        console.log(key);
        switch (key) {
          case "favorite_movies":
            apiList = this.props.favorite_movies;
            break;
          case "watchlist":
            apiList = this.props.watchlist;
            break;
          default:
            break;
        }
        this.state = {
          marked: apiList.findIndex(movie => movie.id === this.props.id) !== -1
        };
        this.changeMark = this.changeMark.bind(this);
      }

      apiSend() {
        switch (key) {
          default:
            break;
          case "favorite_movies":
            (() => {
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
            })();
            break;
          case "watchlist":
            (() => {
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
            })();
            break;
        }
      }

      changeMark() {
        if (this.props.user) {
          this.setState(
            {
              marked: !this.state.marked
            },
            this.apiSend
          );
        } else {
          this.props.toggleLoginForm();
        }
      }

      componentDidUpdate(prevProps) {
        if (
          this.props.isAuth &&
          !_.isEqual(prevProps.favorite_movies, this.props.favorite_movies)
        ) {
          this.setState({
            marked:
              this.props.favorite_movies.findIndex(
                movie => movie.id === this.props.id
              ) !== -1
          });
        }
      }
      render() {
        const { marked } = this.state;
        return <Component marked={marked} changeMark={this.changeMark} />;
      }
    }
  );
