import "./auth.scss";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { saveAuth } from "../../reducers/auth";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authClass: ""
    };
  }

  authorizeUser = () => {
    this.setState({
      ...this.state,
      authClass: ""
    });
    fetch("/api/auth")
      .then(res => res.json())
      .then(res => {
        if (res.message == "OK") {
          this.props.saveAuth({ authType: "user", authInfo: res });
        }
      });
  };

  authorizeApp = () => {
    this.setState({
      ...this.state,
      authClass: ""
    });
    fetch("/api/auth2")
      .then(res => res.json())
      .then(res => {
        if (res.message == "OK") {
          console.log("BEARER: " + res);
          this.props.saveAuth({ authType: "bearer", authInfo: res });
        }
      });
  };

  componentDidMount() {
    //ask user for authorization
    this.authorizeApp();
  }

  render() {
    return (
      <div id="auth" className={"auth " + this.state.authClass}>
        <div className="auth-backdrop" />
        <div className="auth-container">
          <p>
            Login with <span className="twitter">Twitter</span> account to
            access more features!
          </p>
          <div className="auth-buttons">
            <button onClick={this.authorizeUser}>Login</button>
            <button onClick={this.authorizeApp}>Skip</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.auth.authData
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveAuth,
      changePage: () => push("/somewhere")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
