import React from "react";
import AppConsumerHOC from "../HOC/AppConsumerHOC";
import { Link } from "react-router-dom";
import CallApi from "../../api/api";

class HeaderMenu extends React.Component {
  logOut = () => {
    const { session_id, logOut } = this.props;
    CallApi.delete("/authentication/session?", {
      body: { session_id: session_id }
    }).then(({ success = false }) => {
      if (success) {
        // updateSessionId(null);
        logOut();
      }
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className="dropdown-menu">
        <h6 className="dropdown-header">Меню</h6>
        <div className="dropdown-divider" />
        <span className="dropdown-item" onClick={this.logOut}>
          Выйти
        </span>
        <span className="dropdown-item">
          <Link to="/account/favorites">Избранные</Link>
        </span>
        <span className="dropdown-item">
          <Link to="/account/watchlist">К просмотру</Link>
        </span>
      </div>
    );
  }
}

export default AppConsumerHOC(HeaderMenu);
