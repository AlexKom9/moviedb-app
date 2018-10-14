import React from "react";
import Header from "./Header/Header";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";

import { BrowserRouter, Route, Link } from "react-router-dom";
import AccountFavorites from "./pages/AcountPage/AccountFavorites";
import AccountWatchlist from "./pages/AcountPage/AccountWatchlist";

import Cookies from "universal-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart as fasFaHeart,
  faBookmark as fasBookmark
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farFaHeart,
  faBookmark as farBookmark
} from "@fortawesome/free-regular-svg-icons";
import CallApi from "../api/api";
import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut,
  actionCreatorToggleLoginForm,
  actionCreatorHideLoginForm
} from "../actions/actions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const cookies = new Cookies();

library.add(fasFaHeart, farFaHeart, fasBookmark, farBookmark);

export const AppContext = React.createContext();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      favorite_movies: [],
      watchlist: [],
    };
  }

  // updateAuth = (user, session_id) => {
  //   // cookies.set("session_id", session_id, {
  //   //   path: "/",
  //   //   maxAge: 2592000
  //   // });
  //   // this.setState(
  //   //   {
  //   //     session_id,
  //   //     user,
  //   //     isAuth: true
  //   //   },
  //   //TODO: Question !!!
  //   //   () => {
  //   //     this.getWatchList();
  //   //     this.getFavoriteMovies();
  //   //   }
  //   // );
  //   this.props.store.dispatch(
  //     actionCreatorUpdateAuth({
  //       user,
  //       session_id
  //     })
  //   );
  // };

  // logOut = () => {
  //   // cookies.remove("session_id");
  //   // this.setState({
  //   //   session_id: null,
  //   //   user: null,
  //   //   isAuth: false,
  //   //   favorite_movies: [],
  //   //   watchlist: []
  //   // });
  //   this.props.store.dispatch(actionCreatorLogOut());
  // };

  getFavoriteMovies = () => {
    const queryStringParams = {
      session_id: this.state.session_id
    };
    CallApi.get(`/account/${this.state.user.id}/favorite/movies?`, {
      params: queryStringParams
    }).then(data => {
      this.setState({
        favorite_movies: data.results
      });
    });
  };

  getWatchList = () => {
    const queryStringParams = {
      session_id: this.state.session_id
    };
    CallApi.get(`/account/${this.state.user.id}/watchlist/movies?`, {
      params: queryStringParams
    }).then(data => {
      this.setState({
        watchlist: data.results
      });
    });
  };



  componentDidMount() {
    const { session_id } = this.props;
    if (session_id) {
      CallApi.get("/account?", {
        params: {
          session_id
        }
      }).then(user => {
        this.props.updateAuth({user, session_id});
      });
    }
  }


  render() {
    console.log("render -- App ", this.props);
    const { user, session_id, isAuth, updateAuth, onLogOut, toggleLoginForm, hideLoginForm } = this.props;
    return (session_id && isAuth) || !session_id ? (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            session_id: session_id,
            favorite_movies: this.state.favorite_movies,
            watchlist: this.state.watchlist,
            isAuth: this.state.isAuth,
            updateAuth,
            onLogOut,
            showLoginForm: this.props.showLoginForm,
            toggleLoginForm,
            hideLoginForm,
          }}
        >
          <Header user={user} />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
          <Route path="/account/favorites" component={AccountFavorites} />
          <Route path="/account/watchlist" component={AccountWatchlist} />
        </AppContext.Provider>
      </BrowserRouter>
    ) : (
      <p>Loading...</p>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authentication.user,
    session_id: state.authentication.session_id,
    isAuth: state.authentication.isAuth,
    showLoginForm: state.modals.showLoginForm
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    updateAuth: actionCreatorUpdateAuth,
    onLogOut: actionCreatorLogOut,
    toggleLoginForm: actionCreatorToggleLoginForm,
    hideLoginForm: actionCreatorHideLoginForm

  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
