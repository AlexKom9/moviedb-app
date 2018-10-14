import CallApi from "../api/api";

export const actionCreatorUpdateAuth = payload => {
  return {
    type: "UPDATE_AUTH",
    payload
  };
};

export const actionCreatorLogOut = () => {
  return {
    type: "LOGOUT"
  };
};

export const actionCreatorToggleLoginForm = () => {
  return {
    type: "TOGGLE_LOGIN_FORM"
  };
};

export const actionCreatorHideLoginForm = () => {
  return {
    type: "HIDE_LOGIN_FORM"
  };
};

export const actionCreatorUpdateMovies = movies => {
  return {
    type: "UPDATE_MOVIES",
    payload: movies
  };
};

export const actionCreatorGetMovies = params => dispatch => {
  dispatch({
    type: "FETCHING_MOVIES"
  });
  CallApi.get(`/discover/movie?`, { params: params })
    .then(data => {
      dispatch({
        type: "UPDATE_MOVIES",
        payload: data.results
      });
    })
    .catch(error => {
      dispatch({
        type: "ERROR_GET_MOVIES",
        payload: error
      });
    });
};
