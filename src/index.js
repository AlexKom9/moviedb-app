import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import Cookies from "universal-cookie";

import { createStore } from "redux";

const cookies = new Cookies();

const actionCreatorUpdateAuth = payload => {
  return {
    type: "UPDATE_AUTH",
    payload
  };
};

const initialState = {
  user: null,
  isAuth: false,
  session_id: cookies.get("session_id"),
  favorite_movies: [],
  watchlist: [],
  showLoginForm: false
};

const reducerApp = (state = initialState, action) => {
  switch (action.type){
    case "UPDATE_AUTH":
      cookies.set("session_id", action.payload.session_id, {
        path: "/",
        maxAge: 2592000
      });
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true
      }
  }
  return state;
};

const store = createStore(reducerApp);

store.subscribe(()=>{
  console.log('change', store.getState());
});

ReactDOM.render(<App store={store}/>, document.getElementById("root"));
