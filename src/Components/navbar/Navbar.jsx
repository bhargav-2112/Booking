import React, { useContext } from 'react'
import "./navbar.css"
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
  const {user,dispatch} = useContext(AuthContext);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({type: "LOGOUT"});
    localStorage.removeItem("user");
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.reload();
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">logo</span>
        </Link>
        {user ? (
          <div>
            {user.username}
            <button className="navButton" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar