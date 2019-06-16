import React from "react";
import { NavLink } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-inverse">
      <NavLink to="/" className="navbar-brand" exact>
       Google Books Search API
      </NavLink>
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
