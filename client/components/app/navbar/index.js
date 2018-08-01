import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { saveAuthData, verify, logout } from "../../../modules/auth";

React.createElement();
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color : "white" };
  }

  componentDidMount() {
    if (window.location.pathname == "/details") {
      console.log("black");
      this.setState({color:"black"})
    }
    //wait for a postmessage with verifier token from authorization popup
    console.log("LISTENER");
    window.addEventListener("message", event => {
      if (event.data.verifier) {
        //get access tokens from server
        fetch("/api/access" + `?oauth_verifier=${event.data.verifier}`, {
          credentials: "include"
        }).then(response => {
          if (response.status === 200) {
            this.props.verify();
          }
        });
      }
    });
  }

  handleClick() {
    if (this.props.logged) {
      this.props.logout();
    } else {
      //popup for authorization
      let strWindowFeatures =
        "menubar=no,toolbar=no,location=yes,resizable=yes," +
        "scrollbars=yes,status=no,width=500,height=50";

      let popup = window.open("", "_blank", strWindowFeatures);

      //get request tokens from server
      fetch("/api/auth", {
        credentials: "include"
      })
        .then(response => response.json())
        .then(reqtokens => {
          let url = "https://api.twitter.com/oauth/authenticate?oauth_token=" + reqtokens.reqToken;
          //redirect popup to twitter auth page
          popup.location.href = url;
        });
    }
  }

  //this.props.userinfo.data.screen_name
  render() {
    return (
      <nav className={"navbar navbar-dark"} style={{backgroundColor:this.state.color}}>
        <button className="btn btn-info" onClick={() => this.handleClick()}>
          {this.props.logged ? "Logout" : "Login with Twitter"}
        </button>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  userinfo: state.auth.userinfo,
  logged: state.auth.logged,
  pathname: state.router.location.pathname
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      verify,
      saveAuthData,
      logout
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
