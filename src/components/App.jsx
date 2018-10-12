import React from "react";
import Header from "./Header/Header";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";

import { BrowserRouter, Route, Link } from "react-router-dom";
import AccountFavorites from "./pages/AcountPage/AccountFavorites";

import { API_KEY_3, API_URL, fetchApi } from "../api/api";
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

const cookies = new Cookies();

library.add(fasFaHeart, farFaHeart, fasBookmark, farBookmark);

export const AppContext = React.createContext();

const initialState = {
  filters: {
    sort_by: "vote_average.desc",
    primary_release_year: "0",
    with_genres: []
  },
  page: 1,
  total_pages: "",
  user: null,
  session_id: cookies.get("session_id"),
  favorite_movies: [],
  watchlist: [],
  isAuth: false,
  showLoginForm: false
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ...initialState
    };
  }
  updateUser = user => {
    console.log(user);
    this.setState({
      user: user,
      isAuth: true
    });
  };

  updateSessionId = session_id => {
    if (session_id) {
      // console.log("session_id: ", session_id);
      cookies.set("session_id", session_id, {
        path: "/",
        maxAge: 2592000
      });
      this.setState({
        session_id: session_id
      });
    } else {
      this.setState({
        session_id: null,
        user: null
      });
      cookies.remove("session_id");
    }
  };

  updateAuth = (user, session_id) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState(
      {
        session_id,
        user,
        isAuth: true
      },
      () => {
        this.getWatchList();
        this.getFavoriteMovies();
      }
    );
  };

  logOut = (user, session_id) => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
      isAuth: false
    });
  };

  getFavoriteMovies = () => {
    console.log("update favoriteMovies");
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
    console.log("update watchlist");
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
    const { session_id } = this.state;
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateAuth(user, session_id);
      });
    }
  }

  toggleLoginForm = () => {
    this.setState({
      showLoginForm: !this.state.showLoginForm
    });
  };

  hideLoginForm = () => {
    this.setState({
      showLoginForm: false
    });
  };

  render() {
    const { user, session_id, isAuth } = this.state;
    return (session_id && isAuth) || !session_id ? (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            updateUser: this.updateUser,
            updateSessionId: this.updateSessionId,
            session_id: session_id,
            favorite_movies: this.state.favorite_movies,
            watchlist: this.state.watchlist,
            isAuth: this.state.isAuth,
            updateAuth: this.updateAuth,
            logOut: this.logOut,
            showLoginForm: this.state.showLoginForm,
            toggleLoginForm: this.toggleLoginForm,
            hideLoginForm: this.hideLoginForm,
          }}
        >
          <Header
            updateUser={this.updateUser}
            updateSessionId={this.updateSessionId}
            user={user}
          />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
          <Route path="/account/favorites" component={AccountFavorites} />
        </AppContext.Provider>
      </BrowserRouter>
    ) : (
      <p>Loading...</p>
    );
  }
}
