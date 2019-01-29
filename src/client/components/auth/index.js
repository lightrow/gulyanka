import "./auth.scss";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authorize } from "../../reducers/auth";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authClass: ""
    };
  }


  componentDidMount() {
    //ask user for authorization
   // this.props.authorize();
  }

  render() {
    return (
      <div id="auth" className={"auth " + this.state.authClass}>
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
      authorize,
      changePage: () => push("/somewhere")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
