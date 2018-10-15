import React from "react";
import Header from "./Header/Header";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import _ from "lodash";

import { BrowserRouter, Route } from "react-router-dom";
import AccountFavorites from "./pages/AcountPage/AccountFavorites";
import AccountWatchlist from "./pages/AcountPage/AccountWatchlist";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart as fasFaHeart,
  faBookmark as fasBookmark
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farFaHeart,
  faBookmark as farBookmark
} from "@fortawesome/free-regular-svg-icons";
import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut,
  actionCreatorToggleLoginForm,
  actionCreatorHideLoginForm,
  actionCreatorGetAccount
} from "../actions/actions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

library.add(fasFaHeart, farFaHeart, fasBookmark, farBookmark);

export const AppContext = React.createContext();

class App extends React.Component {

  componentDidMount() {
    const { session_id, getAccount } = this.props;
    if (session_id) {
      getAccount({session_id})
    }
  }

  render() {
    const {
      user,
      session_id,
      isAuth,
      updateAuth,
      onLogOut,
      toggleLoginForm,
      hideLoginForm,
      favorite,
      watchlist,
      showLoginForm,
    } = this.props;
    return (session_id && isAuth) || !session_id ? (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            session_id,
            favorite,
            watchlist,
            isAuth,
            updateAuth,
            onLogOut,
            showLoginForm,
            toggleLoginForm,
            hideLoginForm
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
    showLoginForm: state.modals.showLoginForm,
    favorite: state.account.favorite,
    watchlist: state.account.watchlist,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAuth: actionCreatorUpdateAuth,
      onLogOut: actionCreatorLogOut,
      toggleLoginForm: actionCreatorToggleLoginForm,
      hideLoginForm: actionCreatorHideLoginForm,
      getAccount: actionCreatorGetAccount,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
