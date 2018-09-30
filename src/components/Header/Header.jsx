import React from "react";
import Login from "./Login/Login";
import User from "./User";

const Header = ({user}) => (
  <nav className="navbar navbar-dark bg-primary">
    <div className="container">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <span className="nav-link">
            Home
          </span>
        </li>
      </ul>
      {user ? <User /> : <Login />}
    </div>
  </nav>
);

export default Header;
