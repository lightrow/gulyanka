import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./counter.scss";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      counterClasses: ""
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
      return (
        <div className="participants">
          {this.state.participants.map((person,index)=>{
            return <div className="person" id={"person"+index}>
              <img src={person.profile_image_url}/>
            </div>
          })}
        </div>
      )
    } else {
      return this.state.participants.length
    }
  }

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
      changePage: () => push("/somewhere")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
