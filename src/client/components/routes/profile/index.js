import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logout } from "../../../reducers/auth";
import { showErrorPopup } from "../../../reducers/errorpopup";
import "./profile.scss";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {
    this.props.logout();
    fetch("/api/logout")
      .then(res => res.json())
      .then(res => {
        if (res.message == "OK") {
          this.props.showErrorPopup("LOGGED_OUT");
        }
      });
  };

  componentDidMount() {}

  render() {
    if (this.props.auth.loggedIn) {
      return (
        <div id="profile-page">
          <img
            className="profile-page-avatar"
            src={this.props.auth.authData.data.profile_image_url}
            alt="profile-picture"
          />
          <p>User Name: {this.props.auth.authData.data.screen_name}</p>
          <button
            className="button button-logout"
            onClick={() => this.handleLogout()}
          >
            Logout
          </button>
        </div>
      );
    } else {
      return <div id="profile-page" />;
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      showErrorPopup,
      changePage: () => push("/somewhere")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
