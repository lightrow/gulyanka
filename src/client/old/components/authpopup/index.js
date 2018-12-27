import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveAuthData } from "../../modules/auth";

class AuthPopup extends React.Component {
  componentWillMount() {
    let params = new URL(document.location).searchParams;
    let reqtoken = params.get("oauth_token");
    let verifier = params.get("oauth_verifier");
    const parentWindow = window.opener;
    parentWindow.postMessage({ verifier }, "*");
    var popup = window;
    popup.close();
  }

  render() {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authdata: state.auth.authdata
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveAuthData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AuthPopup);
