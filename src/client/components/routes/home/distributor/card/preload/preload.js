import React from "react";
import "./preload.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Preload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animationClass: ""
    };
    this.key = props.key_prop;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        animationClass: "preload-animation"
      });
    }, Math.random() * 800);
  }

  render() {
    return (
      <div
        style={
          this.props.card.updated
            ? { display: "none" }
            : { display: "flex" }
        }
        className={"preload " + this.state.animationClass}
      >
        <div className="preload-dots">
          <div className="preload-dot" />
          <div className="preload-dot" />
          <div className="preload-dot" />
          <div className="preload-dot" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cards[ownProps.key_prop]
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
)(Preload);
