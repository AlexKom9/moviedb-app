export const initialState = {
  data: [],
  filters: {
    sort_by: "vote_average.desc",
    primary_release_year: "0",
    with_genres: []
  },
  page: null,
  total_pages: null
};

const reducerMovies = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_MOVIES":
      return {
        ...state,
        data: action.payload.results,
        page: action.payload.page,
        total_pages: action.payload.total_pages
      };
    case "CHANGE_PAGE":
      return {
        ...state,
        page: action.payload
      };
    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case "RESET_FILTERS":
      return initialState;
    default:
      return state;
  }
};

export default reducerMovies;
