import React from "react";
import "./error.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorClass: ""
    };
  }

  checkHideStatus = () => {
    if (this.props.printError) {
      return "error-unhide";
    } else {
      return "";
    }
  };

  render() {
    return (
      <div className={"error " + this.checkHideStatus()}>
        {this.props.load_status}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  load_status: state.loader.load_status,
  printError: state.loader.printError,
});

export default connect(mapStateToProps)(Error);
