import CallApi from "../api/api";

export const actionCreatorGetFavorite = ({session_id, user_id }) => dispatch => {
  const queryStringParams = {
    session_id
  };
  CallApi.get(`/account/${user_id}/favorite/movies`, {
    params: queryStringParams
  }).then(data => {
    dispatch(
      actionCreatorUpdateFavorite(data)
    )
  });
};

export const actionCreatorGetWatchlist = ({session_id, user_id }) => dispatch => {
  const queryStringParams = {
    session_id
  };
  CallApi.get(`/account/${user_id}/watchlist/movies`, {
    params: queryStringParams
  }).then(data => {
    dispatch(
      actionCreatorUpdateWatchList(data)
    )
  });
};


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
