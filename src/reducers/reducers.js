import reducerAuthentication from "./reducerAuthentification";
import reducerMovies from "./reducersMovies";
import { combineReducers } from "redux";
import reducerModals from "./reducersModals";

const reducers = combineReducers({
  authentication: reducerAuthentication,
  movies: reducerMovies,
  modals: reducerModals
});

export default reducers;
