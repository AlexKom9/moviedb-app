import * as constants from '../constants/constants'

const initialState = {
  showLoginForm: false
};

const reducerModals = (state = initialState, action) => {
  switch (action.type) {

    case constants.TOGGLE_LOGIN_FORM:
      return {
        ...state,
        showLoginForm: !state.showLoginForm
      };
    case constants.HIDE_LOGIN_FORM:
      return {
        ...state,
        showLoginForm: false
      };
    default:
      return state;
  }
};

export default reducerModals;
