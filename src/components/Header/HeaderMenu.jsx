import React from "react";
import { Link } from "react-router-dom";
import CallApi from "../../api/api";
import { actionCreatorLogOut } from "./../../actions/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class HeaderMenu extends React.Component {
  logOut = () => {
    const { session_id, onLogOut } = this.props;
    CallApi.delete("/authentication/session?", {
      body: { session_id: session_id }
    }).then(({ success = false }) => {
      if (success) {
        onLogOut();
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

const mapStateToProps = store => {
  return {
    session_id: store.authentication.session_id
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    onLogOut: actionCreatorLogOut
  }, dispatch)
 };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
