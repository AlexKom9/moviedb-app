import React from "react";
import Header from "./Header/Header";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";

import { BrowserRouter, Route } from "react-router-dom";
import AccountFavoritesPage from "./pages/AcountPage/AccountFavoritesPage";
import AccountWatchlistPage from "./pages/AcountPage/AccountWatchlistPage";

import '../fortawesome/fortawesome'


import * as actions from "../actions/actions";

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

const mapStateToProps = store => {
  return {
    session_id: store.authentication.session_id,
    isAuth: store.authentication.isAuth,
    user: store.authentication.user,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getAccount: actions.actionCreatorGetAccount
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
