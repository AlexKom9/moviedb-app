import CallApi from "../api/api";

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

export const actionCreatorUpdateAuth = payload => {
  return { type: "UPDATE_AUTH", payload };
};

export const actionCreatorLogOut = () => {
  return {
    type: "ON_LOGOUT"
  };
};
