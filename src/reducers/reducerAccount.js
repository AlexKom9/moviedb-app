const initialState = {
  favorite: [],
  watchlist: []
};

const reducerAccount = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_FAVORITE":
      return {
        ...state,
        favorite: action.payload
      };
    case "UPDATE_WATCHLIST":
      return {
        ...state,
        watchlist: action.payload
      };
    default:
      return state;
  }
};

export default reducerAccount;
