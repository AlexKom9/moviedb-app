import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers/reducers";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  actionCreatorGetFavorite,
  actionCreatorGetWatchlist
} from "../actions/actionsAccount";

import {actionCreatorGetMovies} from '../actions/actionsMovies'

const logger = ({ getState, dispatch }) => next => action => {
  // console.log("dispatch ", dispatch );
  // console.log(action.type, action);
  return next(action);
};

const async = ({ getState, dispatch }) => next => action => {
  if (typeof action === "function") {
    action(dispatch);
  } else {
    return next(action);
  }
};

const getAccountLists = ({ getState, dispatch }) => next => action => {
  if (action.type === "UPDATE_AUTH") {
    dispatch(
      actionCreatorGetFavorite({
        session_id: action.payload.session_id,
        user_id: action.payload.user.id
      })
    );
    dispatch(
      actionCreatorGetWatchlist({
        session_id: action.payload.session_id,
        user_id: action.payload.user.id
      })
    );
  }
  return next(action);
};

const getMovies = ({ getState, dispatch }) => next => action => {
  if (action.type === "UPDATE_FILTERS") {
    console.log(action.payload);
    // dispatch(
    //   actionCreatorGetMovies({})
    // );
  }
  return next(action);
};

const appMiddleWare = [getAccountLists, getMovies];


const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(logger, async, getAccountLists, getMovies))
);

export default store;
