import CallApi from '../api/api'

export const actionCreatorUpdateMovies = data => {
  return {
    type: "UPDATE_MOVIES",
    payload: data.results
  };
};

export const actionCreatorGetMovies = params => dispatch => {
  dispatch({
    type: "FETCHING_MOVIES"
  });
  CallApi.get(`/discover/movie?`, { params: params })
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

