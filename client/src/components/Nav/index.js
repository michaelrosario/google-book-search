import React from "react";
import { NavLink } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-inverse">
      <a className="navbar-brand" href="/">
       Google Books Search API
      </a>
      <ul className="nav navbar-right">
        <li className="nav-item">
          <NavLink to="/saved" exact activeStyle={{ color: 'red' }}>
              <i className="fa fa-save"></i> &nbsp; Saved</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" exact activeStyle={{ color: 'red' }}>
            <i className="fa fa-search"></i> &nbsp;Search
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
