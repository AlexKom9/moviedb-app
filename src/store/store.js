import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers/reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import * as constants from '../constants/constants'

import {
  actionCreatorGetFavorite,
  actionCreatorGetWatchlist
} from "../actions/actionsAccount";

import { actionCreatorGetMovies } from "../actions/actionsMovies";
import { initialMoviesState }  from '../reducers/reducersMovies'

const async = ({ getState, dispatch }) => next => action => {
  if (typeof action === "function") {
    action(dispatch);
  } else {
    return next(action);
  }
};

const getAccountListsAfterUpdateAuth = ({ getState, dispatch }) => next => action => {
  if (action.type === constants.UPDATE_AUTH) {
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

const getMoviesAfterChangingFilters = ({ getState, dispatch }) => next => action => {
  if (action.type === constants.UPDATE_FILTERS) {
    dispatch(
      actionCreatorGetMovies({...getState().movies.filters, ...action.payload}, 1)
    );
  }

  if (action.type === constants.CHANGE_PAGE) {
    const pervStore = getState();
    const prevFilters = pervStore.movies.filters;
    const page = action.payload;
    dispatch(
      actionCreatorGetMovies(prevFilters, page)
    );
  }

  if (action.type === constants.RESET_FILTERS) {
    dispatch(
      actionCreatorGetMovies(initialMoviesState.filters, 1)
    );
  }
  return next(action);
};

const appMiddleWare = [getAccountListsAfterUpdateAuth, getMoviesAfterChangingFilters];


const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(async, ...appMiddleWare))
);

export default store;
