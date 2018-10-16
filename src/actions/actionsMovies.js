import CallApi from "../api/api";

export const actionCreatorUpdateMovies = data => {
  return {
    type: "UPDATE_MOVIES",
    payload: data
  };
};

export const actionCreatorChangePage = payload => {
  return {
    type: "CHANGE_PAGE",
    payload: payload
  };
};

export const actionCreatorGetMovies = params => dispatch => {
  dispatch({
    type: "FETCHING_MOVIES"
  });
  CallApi.get(`/discover/movie`, { params: params })
    .then(data => {
      dispatch(actionCreatorUpdateMovies(data));
    })
    .catch(error => {
      dispatch({
        type: "ERROR_GET_MOVIES",
        payload: error
      });
    });
};

export const actionCreatorUpdateFilters = payload => {
  return {
    type: "UPDATE_FILTERS",
    payload
  };
};

export const actionCreatorResetFilters = payload => {
  return {
    type: "RESET_FILTERS",
  };
};
