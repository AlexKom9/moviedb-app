import React, { Component } from "react";
import PropTypes from "prop-types";
import { API_KEY_3, API_URL, fetchApi } from "../../api/api";
import {AppContext} from "../App";

class HeaderMenu extends React.Component {
  LogOut = () => {
    const {session_id, updateSessionId} = this.props;
    fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
      method: "Delete",
      mode: "cors",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        session_id: session_id
      })
    }).then(({success = false}) => {
      if(success){
        updateSessionId(null);
      }
    });
  };

  render() {
    return (
      <div className="dropdown-menu">
        <h6 className="dropdown-header">Меню</h6>

        <div className="dropdown-divider" />
        <span className="dropdown-item" onClick={this.LogOut}>
          Выйти
        </span>
      </div>
    );
  }
}

HeaderMenu.propTypes = {};

const HeaderMenuContext = () => {
  return (
    <AppContext.Consumer>
      {context => (
        <HeaderMenu
          session_id={context.session_id}
          updateSessionId={context.updateSessionId}
        />
      )}
    </AppContext.Consumer>
  );
};

HeaderMenuContext.displayName = "HeaderMenuContext";

export default HeaderMenuContext;

