import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logout } from "../../../reducers/auth";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div id="profile-page">
        <img
          className="profile-page-avatar"
          src={this.props.auth.authData.data.profile_image_url}
          alt="profile-picture"
        />
        <p>User Name: {this.props.auth.authData.data.screen_name}</p>
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
      logout,
      changePage: () => push("/somewhere")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
