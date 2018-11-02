import * as constants from '../constants/constants'

export const actionCreatorToggleLoginForm = () => {
  return {
    type: constants.TOGGLE_LOGIN_FORM
  };
};

export const actionCreatorHideLoginForm = () => {
  return {
    type: constants.HIDE_LOGIN_FORM
  };
};

