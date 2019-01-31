import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import Home from "../routes/home";
import About from "../routes/about";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login, saveAuthData } from "../../reducers/auth";
import { showErrorPopup } from "../../reducers/errorpopup";

const NavSpinner = () => <div className="nav-spinner" />;

class Navbar extends React.Component {
  handleClick = () => {
    this.props.login()
  };

  handleLogin = () => {
    if (this.props.auth.loggedIn) {
      return (
        <Link to="/profile">{this.props.auth.authData.data.screen_name}</Link>
      );
    } else {
      return (
        <button className="login-button" onClick={() => this.handleClick()}>
          Login
        </button>
      );
    }
  };

//<button className="login-button" onClick={()=>this.props.showErrorPopup("LOGIN_ERROR")}>TEST</button>


  render() {
    return (
      <div className="navbar">
        <header className="title">GULYANKA</header>
        <nav className="nav-group">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {this.handleLogin()}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveAuthData,
      showErrorPopup,
      login,
      changePage: () => push("/somewhere")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
