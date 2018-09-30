import React, { Component } from "react";
import Login from "./Login/Login";
import User from "./User";

const Header = ({user}) => (
  <nav className="navbar navbar-dark bg-primary">
    <div className="container">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a href="#" className="nav-link">
            Home
          </a>
        </li>
      </ul>
      {user ? <User /> : <Login />}
    </div>
  </nav>
);

export default Header;
