import React from "react";
import { API_KEY_3, API_URL, fetchApi } from "../../api/api";
import AppConsumerHOC from "../HOC/AppConsumerHOC";

class HeaderMenu extends React.Component {
  logOut = () => {
    const { session_id, updateSessionId } = this.props;
    fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
      method: "Delete",
      mode: "cors",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        session_id: session_id
      })
    }).then(({ success = false }) => {
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
