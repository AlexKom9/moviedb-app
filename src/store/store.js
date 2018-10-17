import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers/reducers";
import {
  actionCreatorGetFavorite,
  actionCreatorGetWatchlist
} from "../actions/actionsAccount";

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

const store = createStore(
  reducers,
  {},
  applyMiddleware(logger, async, getAccountLists)
);

export default store;
