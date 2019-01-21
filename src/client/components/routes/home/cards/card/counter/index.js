import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  expandParticipants,
  closeParticipants
} from "../../../../../../reducers/expander";
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
          this.setState({
            ...this.state,
            participants: res.goers
          });
        }
      });
  };

  handleParticipants = () => {
    if (this.props.expanded) {
      let persons = [];
      if (this.state.participants.length <= 5) {
        this.state.participants.map((person, index) => {
          persons.push(
            <div className="person" id={"person" + index}>
              <img src={person.profile_image_url} />
            </div>
          );
        });
        //for testing
        persons.push(
          <div
            className="person person-more"
            onClick={() => this.props.expandParticipants()}
          >
            <div>{this.state.participants.length - 5}+</div>
          </div>
        );
        return <div className="participants">{persons}</div>;
      } else {
        for (let i = 0; i < 4; i++) {
          persons.push(
            <div className="person" id={"person" + index}>
              <img src={this.state.participants[i].profile_image_url} />
            </div>
          );
        }
        persons.push(
          <div className="person person-more">
            <div> {this.state.participants.length - 5}+</div>
          </div>
        );
        return <div className="participants">{persons}</div>;
      }
    } else {
      return this.state.participants.length;
    }
  };

  handleParticipantsExpanded = () => {
    let persons = [];
    this.state.participants.map((person, index) => {
      persons.push(
        <div className="person" id={"person" + index}>
          <img src={person.profile_image_url} />
        </div>
      );
    });
    return persons;
  };

  handleAllParticipans = () => {
    if (this.props.expanded && this.props.participantsExpanded) {
      return (
        <div className={"participants-all"}>
          <div className="participants-all-topbar">
            <button onClick={this.props.closeParticipants}>x</button>
          </div>
          <div className="participants-all-container">
            {this.handleParticipantsExpanded()}
          </div>
        </div>
      );
    }
  };

  componentDidMount() {
    if (this.props.authData.authType != undefined) {
      this.getParticipants();
    }
  }

  render() {
    return (
      <div
        className={"counter " + (this.props.expanded ? "counter-expanded" : "")}
      >
        <span>{this.handleParticipants()}</span>
        {this.handleAllParticipans()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.auth.authData,
  participantsExpanded: state.expander.participantsExpanded
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeParticipants,
      expandParticipants,
      changePage: () => push("/somewhere")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
