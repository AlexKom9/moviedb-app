import CallApi from "../api/api";

import {actionCreatorUpdateFavorite, actionCreatorUpdateWatchList} from './actionsAccount'

export const actionCreatorGetAccount = payload => dispatch => {
  const {session_id} = payload;
  CallApi.get("/account?", {
    params: {
      session_id
    }
  }).then(user => {
    dispatch(actionCreatorUpdateAuth({ user, session_id }));
  });


}

export const actionCreatorUpdateAuth = payload => dispatch => {
  dispatch({
    type: "UPDATE_AUTH",
    payload
  });
  const queryStringParams = {
    session_id: payload.session_id
  };

  CallApi.get(`/account/${payload.user.id}/favorite/movies?`, {
    params: queryStringParams
  }).then(data => {
    dispatch(
      actionCreatorUpdateFavorite(data)
    )
  });
  CallApi.get(`/account/${payload.user.id}/watchlist/movies?`, {
    params: queryStringParams
  }).then(data => {
    dispatch(actionCreatorUpdateWatchList(data))
  });
};

export const actionCreatorLogOut = () => {
  return {
    type: "ON_LOGOUT"
  };
};