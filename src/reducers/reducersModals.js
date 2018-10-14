const initialState = {
  showLoginForm: false
};

const reducerModals = (state = initialState, action) => {
  switch (action.type) {

    case "TOGGLE_LOGIN_FORM":
      return {
        ...state,
        showLoginForm: !state.showLoginForm
      };
    case "HIDE_LOGIN_FORM":
      return {
        ...state,
        showLoginForm: false
      };
    default:
      return state;
  }
};

export default reducerModals;
