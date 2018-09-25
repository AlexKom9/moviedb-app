import React, { Component } from "react";
import Login from "./Login";
import PropTypes from "prop-types";

class Header extends Component {
  render() {
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
          <Login/>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {};

export default Header;
