import {
  actionCreatorUpdateFavorite,
  actionCreatorUpdateWatchlist
} from "../../actions/actionsAccount";
import * as constants from "../../constants/constants";

describe("actionsAccount", () => {
  test("actionCreatorUpdateAuth", () => {
    const data = [];

    const result = actionCreatorUpdateFavorite(data);
    // expect(result.type).toBe(constants.UPDATE_AUTH);
    // expect(result.payload.user).toBe(payload.user);
    // expect(result.payload.session_id).toBe(payload.session_id);
    // expect(result.payload.isAuth).toBe(payload.isAuth);
    expect(result).toMatchSnapshot();
  });
});


