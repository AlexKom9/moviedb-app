import React from "react";
import AppConsumerHOC from "../HOC/AppConsumerHOC";
import CallApi from "../../api/api";

class HeaderMenu extends React.Component {
  logOut = () => {
    const { session_id, updateSessionId } = this.props;
    CallApi.delete("/authentication/session?", {
      body: { session_id: session_id }
    })
      .then(({ success = false }) => {
        if (success) {
          updateSessionId(null);
        }
      });
  };

  render() {
    return (
      <div className="dropdown-menu">
        <h6 className="dropdown-header">Меню</h6>
        <div className="dropdown-divider" />
        <span className="dropdown-item" onClick={this.logOut}>
          Выйти
        </span>
      </div>
    );
  }
}

export default AppConsumerHOC(HeaderMenu);
