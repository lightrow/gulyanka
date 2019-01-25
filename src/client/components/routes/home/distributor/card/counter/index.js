import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getGoers } from "../../../../../../reducers/cards";
import "./counter.scss";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      counterClasses: "",
      participantsExpanded: false
    };
    this.key = props.key_prop;
  }

  componentDidMount() {
    if (this.props.authData.authType != undefined) {
      let key = this.props.key_prop;
      let obj = { key: key, placeId: this.props.card.place_id };
      setTimeout(() => {
        this.props.getGoers(obj);
      }, 1000);
    }
  }

  render() {
    return (
      <div className="counter">
        <span>
          {this.props.card.goers ? this.props.card.goers.length : "..."}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  authData: state.auth.authData,
  card: state.cards[ownProps.key_prop]
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getGoers,
      changePage: () => push("/somewhere")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
