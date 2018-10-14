import reducerAuthentication from "./reducerAuthentification";
import reducerMovies from "./reducersMovies";
import { combineReducers } from "redux";
import reducerModals from "./reducersModals";
import reducerAccount from "./reducerAccount";

const reducers = combineReducers({
  authentication: reducerAuthentication,
  account: reducerAccount,
  movies: reducerMovies,
  modals: reducerModals
});

export default reducers;
