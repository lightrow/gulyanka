import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveAuthData } from "../../../reducers/auth";

class AuthCallback extends React.Component {
  componentWillMount() {
    let params = new URL(document.location).searchParams;
    let accToken = params.get("oauth_token");
    let verifier = params.get("oauth_verifier");
    this.props.authorize({ verifier, accToken });
  }

  handleAuthRender = () => {
    if (this.props.loggedIn) {
      setTimeout(() => {
        window.close();
      }, 3000);
      return <div>Success! Logged in as: {this.props.userName}</div>;
    } else {
      return <div>Logging in...</div>;
    }
  };

  render() {
    return (
      <div>
        <h1>{this.handleAuthRender()}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authdata: state.auth.authData,
  userName: state.auth.userName
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveAuthData
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthCallback);
