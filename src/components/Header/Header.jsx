import React from "react";
import Login from "./Login/Login";
import User from "./User";
import { Link } from "react-router-dom";

const Header = ({ user }) => (
  <nav className="navbar">
    <div className="container">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link header__home-link" to="/">
            Home
          </Link>
        </li>
      </ul>
      {user ? <User /> : <Login />}
    </div>
  </nav>
);

export default Header;
