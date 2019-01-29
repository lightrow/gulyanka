import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import Home from "../routes/home";
import About from "../routes/about";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authorize, saveAuthData } from "../../reducers/auth";

const NavSpinner = () => <div className="nav-spinner" />;

class Navbar extends React.Component {
  handleClick = () => {
    let es = new EventSource("/api/authsse");
    let strWindowFeatures =
      "menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=900,height=500";
    let popup = window.open("", "_blank");
    popup.location.href = "http://" + window.location.host + "/api/auth";
    es.onmessage = event => {
      let data = JSON.parse(event.data);
      if (data != "nothing here") {
        this.props.saveAuthData(JSON.parse(event.data));
      }
    };
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
      authorize,
      saveAuthData,
      changePage: () => push("/somewhere")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
