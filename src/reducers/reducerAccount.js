import * as constants from '../constants/constants'

const initialState = {
  favorite: [],
  watchlist: []
};

const reducerAccount = (state = initialState, action) => {
  switch (action.type) {
    case constants.UPDATE_FAVORITE:
      return {
        ...state,
        favorite: action.payload
      };
    case constants.UPDATE_WATCHLIST:
      return {
        ...state,
        watchlist: action.payload
      };
    default:
      return state;
  }
};

export default reducerAccount;
