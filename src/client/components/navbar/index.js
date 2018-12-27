import React from "react";
import "./navbar.css"

class Navbar extends React.Component {
  render(){
    return(
      <div className="navbar">
        <header className="title">GULYANKA</header>
        <nav className="nav-group">
          <a href="#home">Home</a>
          <a href="#about">About</a> 
          <a href="#login">Login</a>
        </nav>
      </div>
    )
  }
}

export default Navbar