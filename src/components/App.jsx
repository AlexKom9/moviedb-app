import React from "react";
import Header from "./Header/Header";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";

import { BrowserRouter, Route } from "react-router-dom";
import AccountFavoritesPage from "./pages/AcountPage/AccountFavoritesPage";
import AccountWatchlistPage from "./pages/AcountPage/AccountWatchlistPage";

import '../fortawesome/fortawesome'


import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut,
  actionCreatorToggleLoginForm,
  actionCreatorHideLoginForm,
  actionCreatorGetAccount
} from "../actions/actions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";


export const AppContext = React.createContext();

class App extends React.Component {
  componentDidMount() {
    const { session_id, getAccount } = this.props;
    if (session_id) {
      getAccount({ session_id });
    }
  }

  render() {
    const {
      user,
      session_id,
      isAuth,
    } = this.props;
    return (session_id && isAuth) || !session_id ? (
      <BrowserRouter>
        <div>
          <Header user={user} />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
          <Route path="/account/favorites" component={AccountFavoritesPage} />
          <Route path="/account/watchlist" component={AccountWatchlistPage} />
        </div>
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
    watchlist: state.account.watchlist
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAuth: actionCreatorUpdateAuth,
      onLogOut: actionCreatorLogOut,
      toggleLoginForm: actionCreatorToggleLoginForm,
      hideLoginForm: actionCreatorHideLoginForm,
      getAccount: actionCreatorGetAccount
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
