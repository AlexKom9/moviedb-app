import * as constants from "../constants/constants";

export const initialState = {
  data: [],
  filters: {
    sort_by: "vote_average.desc",
    primary_release_year: "0",
    with_genres: []
  },
  success: null,
  isFetching: false,
  error: false,
  page: null,
  total_pages: null
};

const reducerMovies = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCHING_MOVIES:
      return {
        ...state,
        isFetching: true
      };
    case constants.UPDATE_MOVIES:
      return {
        ...state,
        data: action.payload.results,
        page: action.payload.page,
        total_pages: action.payload.total_pages,
        isFetching: false,
        success: true,
      };
    case constants.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload
      };
    case constants.UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case constants.RESET_FILTERS:
      return { ...initialState, isFetching: true };
    default:
      return state;
  }
};

export default reducerMovies;
