export const actionCreatorUpdateFavorite = data => {
  return {
    type: "UPDATE_FAVORITE",
    payload: data.results
  }
};

export const actionCreatorUpdateWatchList = data => {
  return {
    type: "UPDATE_WATCHLIST",
    payload: data.results
  }
};
