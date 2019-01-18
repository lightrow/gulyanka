import React from "react";
import "./navbar.scss"
import {Link} from "react-router-dom"
import Home from "../routes/home";
import About from "../routes/login";
import Login from "../routes/about";
class Navbar extends React.Component {
  render(){
    return(
      <div className="navbar">
        <header className="title">GULYANKA</header>
        <nav className="nav-group">
          <Link to="/">Home</Link>
          <Link  to="/about">About</Link> 
          <Link  to="/login">Login</Link>
        </nav>
      </div>
    )
  }
}

export default Navbar