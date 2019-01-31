import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { closeErrorPopup } from "../../reducers/errorpopup";
import { saveAuthData, login } from "../../reducers/auth";
import "./error.scss";

class ErrorPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleContStyle = () => {
    console.log("ERORRSHOW: " + this.props.errorHidden);
    if (this.props.errorShow) {
      return {
        animation:
          "errorSlideIn 0.5s cubic-bezier(0.18, 1.01, 0.46, 0.98) 0s 1 normal forwards running"
      };
    } else {
      return {
        animation:
          "errorSlideOut 0.5s cubic-bezier(0.18, 1.01, 0.46, 0.98) 0s 1 normal forwards running"
      };
    }
  };

  handlePopupStyle = () => {
    if (this.props.errorHidden) {
      return {
        display: "none"
      };
    } else {
      return { display: "block" };
    }
  };

  handleLogin = () => {
    this.props.login();
  };

  handleError = () => {
    switch (this.props.errorType) {
      case "LOGIN_SUCCESS":
        if (this.props.authData.data) {
          return (
            <div
              className="error-popup-container"
              style={this.handleContStyle()}
            >
              <button
                className="error-popup-close-button button-good"
                onClick={() => this.props.closeErrorPopup()}
              >
                x
              </button>
              <div>Welcome, {this.props.authData.data.name}</div>
            </div>
          );
        }
      case "LOGGED_OUT":
        return (
          <div className="error-popup-container" style={this.handleContStyle()}>
            <button
              className="error-popup-close-button button-good"
              onClick={() => this.props.closeErrorPopup()}
            >
              x
            </button>
            <div>Successfully logged out.</div>
          </div>
        );

      case "LOGIN_ERROR":
        return (
          <div className="error-popup-container" style={this.handleContStyle()}>
            <button
              className="error-popup-close-button button-bad"
              onClick={() => this.props.closeErrorPopup()}
            >
              x
            </button>
            <div>
              Authorization error. Please,{" "}
              <span onClick={() => this.handleLogin()}>relogin</span> and try
              again.
            </div>
          </div>
        );
      case "GENERIC_ERROR":
        return (
          <div className="error-popup-container" style={this.handleContStyle()}>
            <button
              className="error-popup-close-button button-bad"
              onClick={() => this.props.closeErrorPopup()}
            >
              x
            </button>
            <div>There has been an error with your request. Sorry</div>
          </div>
        );
        case "SUBMITTED":
        return (
          <div className="error-popup-container" style={this.handleContStyle()}>
            <button
              className="error-popup-close-button button-good"
              onClick={() => this.props.closeErrorPopup()}
            >
              x
            </button>
            <div>Choice submitted. It's party time!</div>
          </div>
        );
      default:
        return (
          <div className="error-popup-container" style={this.handleContStyle()}>
            <button
              className="error-popup-close-button button-bad"
              onClick={() => this.props.closeErrorPopup()}
            >
              x
            </button>
            <div>There has been an error with your request. Sorry</div>
          </div>
        );
    }
  };

  render() {
    return (
      <div className="error-popup" style={this.handlePopupStyle()}>
        {this.handleError()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorType: state.errorpopup.errorType,
  errorShow: state.errorpopup.errorShow,
  errorHidden: state.errorpopup.errorHidden,
  authData: state.auth.authData
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeErrorPopup,
      saveAuthData,
      login,
      changePage: () => push("/somewhere")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorPopup);
