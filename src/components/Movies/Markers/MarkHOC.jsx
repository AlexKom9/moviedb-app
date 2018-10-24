import React from "react";
import CallApi from "../../../api/api";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  actionCreatorGetWatchlist,
  actionCreatorGetFavorite
} from "../../../actions/actionsAccount";
import * as actions from "../../../actions/actions";
import PropTypes from 'prop-types'

function findMovieInArr(id, arr) {
  return arr.findIndex(movie => String(movie.id) === String(id)) !== -1;
}

const mapStateToProps = store => {
  return {
    user: store.authentication.user,
    session_id: store.authentication.session_id,
    isAuth: store.authentication.isAuth,
    watchlist: store.account.watchlist,
    favorite: store.account.favorite
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleLoginForm: actions.actionCreatorToggleLoginForm,
      getFavorite: actionCreatorGetFavorite,
      getWatchlist: actionCreatorGetWatchlist
    },
    dispatch
  );
};

export default (Component, key) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class MarkHOC extends React.Component {
      constructor(props) {
        super(props);
        const initialState = key => {
          switch (key) {
            case "favorite":
              return findMovieInArr(this.props.id, this.props.favorite);
            case "watchlist":
              return findMovieInArr(this.props.id, this.props.watchlist);
            default:
              return false;
          }
        };
        this.state = {
          marked: initialState(key)
        };

        this.changeMark = this.changeMark.bind(this);
      }

      static propTypes = {
        id: PropTypes.number.isRequired
      };

      fetchMark() {
        const { getFavorite, getWatchlist, session_id, user } = this.props;

        const fetchFavoritesMark = () => {
          const queryStringParams = {
            session_id: this.props.session_id
          };
          const body = {
            media_type: "movie",
            media_id: this.props.id,
            favorite: this.state.marked
          };
          CallApi.post(`/account/${this.props.id}/favorite`, {
            params: queryStringParams,
            body: body
          }).then(() => {
            console.log(session_id, user);
            getFavorite({ session_id, user_id: user.id });
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
          CallApi.post(`/account/${this.props.id}/watchlist`, {
            params: queryStringParams,
            body: body
          }).then(getWatchlist({ session_id, user_id: user.id }));
        };

        switch (key) {
          default:
            break;
          case "favorite":
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
          case "favorite":
            arr = this.props.favorite;
            break;
          case "watchlist":
            arr = this.props.watchlist;
            break;
          default:
            break;
        }
        if (
          (this.props.isAuth &&
            !_.isEqual(prevProps.favorite, this.props.favorite)) ||
          (!_.isEqual(prevProps.watchlist, this.props.watchlist) &&
            this.props.isAuth)
        ) {
          this.setState({
            marked: findMovieInArr(this.props.id, arr)
          });
        }
      }
      render() {
        const { marked } = this.state;
        return <Component marked={marked} changeMark={this.changeMark} />;
      }
    }
  );

