import React, { Component } from "react";
import Login from "./Login/Login";
import User from "./User"
import PropTypes from "prop-types";

class Header extends Component {
  // static propTypes = {
  //   user: PropTypes.isRequired
  // };

  render() {
    const { updateUser, updateSessionId, user } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a href="#" className="nav-link">
                Home
              </a>
            </li>
          </ul>
          {user ? <User user={user}/>: <Login updateUser={updateUser} updateSessionId={updateSessionId}/> }
        </div>
      </nav>
    );
  }
}

Header.propTypes = {};

export default Header;
