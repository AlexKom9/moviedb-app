import CallApi from "../api/api";
import * as constants from '../constants/constants'

export const actionCreatorGetAccount = payload => dispatch => {
  const { session_id } = payload;
  CallApi.get("/account", {
    params: {
      session_id
    }
  }).then(user => {
    dispatch(actionCreatorUpdateAuth({ user, session_id }));
  });
};

export const actionCreatorUpdateAuth = ({ user, session_id }) => {
  return { type: constants.UPDATE_AUTH, payload: { user, session_id } };
};

export const actionCreatorLogOut = () => {
  return {
    type: constants.LOG_OUT
  };
};
