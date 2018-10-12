import React from "react";
import AppConsumerHOC from "../HOC/AppConsumerHOC";
import CallApi from "../../api/api";
import _ from "lodash";

export default (Component, key) =>
  AppConsumerHOC(
    class LikeHOC extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          liked: this.props.favorite_movies.findIndex(
            movie => movie.id === this.props.id
          ) !== -1
        };
        this.changeLike = this.changeLike.bind(this);
      }

      changeLike() {
        if (this.props.user) {
          this.setState(
            {
              liked: !this.state.liked
            },
            () => {
              const queryStringParams = {
                session_id: this.props.session_id
              };
              const body = {
                media_type: "movie",
                media_id: this.props.id,
                favorite: this.state.liked
              };
              CallApi.post(`/account/${this.props.id}/favorite?`, {
                params: queryStringParams,
                body: body
              });
            }
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
            liked:
              this.props.favorite_movies.findIndex(
                movie => movie.id === this.props.id
              ) !== -1
          });
        }
      }
      render() {
        const { liked } = this.state;
        return <Component liked={liked} changeLike={this.changeLike} />;
      }
    }
  );
