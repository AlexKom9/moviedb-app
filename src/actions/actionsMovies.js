import CallApi from "../api/api";

import * as constants from "../constants/constants";

export const actionCreatorUpdateMovies = data => {
  return {
    type: constants.UPDATE_MOVIES,
    payload: data
  };
};

export const actionCreatorChangePage = payload => {
  return {
    type: constants.CHANGE_PAGE,
    payload: payload
  };
};

export const actionCreatorGetMovies = params => dispatch => {
  dispatch({
    type: constants.FETCHING_MOVIES
  });
  CallApi.get(`/discover/movie`, { params: params })
    .then(data => {
      dispatch(actionCreatorUpdateMovies(data));
    })
    .catch(error => {
      dispatch({
        type: constants.ERROR_GET_MOVIES,
        payload: error
      });
    });
};

export const actionCreatorUpdateFilters = payload => {
  console.log(payload);
  return {
    type: constants.UPDATE_FILTERS,
    payload
  };
};

export const actionCreatorResetFilters = payload => {
  return {
    type: constants.RESET_FILTERS
  };
};
