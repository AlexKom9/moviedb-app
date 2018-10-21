import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut,
  actionCreatorGetAccount
} from "./actionsAuthentication";
import {
  actionCreatorUpdateFavorite,
  actionCreatorUpdateWatchList,
} from "./actionsAccount";
import {
  actionCreatorToggleLoginForm,
  actionCreatorHideLoginForm
} from "./actionsModals";

import {
  actionCreatorUpdateMovies,
  actionCreatorGetMovies,
  actionCreatorChangePage,
  actionCreatorUpdateFilters,
  actionCreatorResetFilters
} from "./actionsMovies";

// actionsAuthentication
export {
  actionCreatorUpdateAuth,
  actionCreatorLogOut,
  actionCreatorGetAccount
};

// actionsAccount
export { actionCreatorUpdateFavorite, actionCreatorUpdateWatchList };

// actionsModals
export { actionCreatorToggleLoginForm, actionCreatorHideLoginForm };

// actionsMovies
export { actionCreatorUpdateMovies, actionCreatorGetMovies, actionCreatorChangePage,
  actionCreatorUpdateFilters,
  actionCreatorResetFilters };
