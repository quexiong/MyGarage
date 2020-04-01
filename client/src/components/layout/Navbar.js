import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar bg-secondary">
      <h1>
        <a href="index.html">
          <i className="fas ca-code"></i>MyGarage
        </a>
      </h1>
      <ul>
        <li>
          <a href="register.html">Register</a>
        </li>
        <li>
          <a href="login.html">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
