import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./counter.scss";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      counterClasses: "",
      participantsExpanded: false
    };
  }

  getParticipants = () => {
    fetch(`/api/getgoers?q=${this.props.place_id}`)
      .then(res => res.json())
      .then(res => {
        if (res.status == 200) {
          this.setState(
            {
              ...this.state,
              participants: res.goers
            },
            () => {
              this.props.saveParticipants(res.goers);
            }
          );
        }
      });
  };

  componentDidMount() {
    if (this.props.authData.authType != undefined) {
      this.getParticipants();
    }
  }

  render() {
    return (
      <div className="counter">
        <span>{this.state.participants.length}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.auth.authData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/somewhere")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
