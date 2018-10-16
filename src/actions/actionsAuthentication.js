import CallApi from "../api/api";

import {
  actionCreatorGetFavorite,
  actionCreatorGetWatchlist
} from "./actionsAccount";

export const actionCreatorGetAccount = payload => dispatch => {
  const { session_id } = payload;
  CallApi.get("/account?", {
    params: {
      session_id
    }
  }).then(user => {
    dispatch(actionCreatorUpdateAuth({ user, session_id }));
  });
};

export const actionCreatorUpdateAuth = payload => dispatch => {
  dispatch({
    type: "UPDATE_AUTH",
    payload
  });
  dispatch(
    actionCreatorGetFavorite({
      session_id: payload.session_id,
      user_id: payload.user.id
    })
  );
  dispatch(
    actionCreatorGetWatchlist({
      session_id: payload.session_id,
      user_id: payload.user.id
    })
  );
};

export const actionCreatorLogOut = () => {
  return {
    type: "ON_LOGOUT"
  };
};
