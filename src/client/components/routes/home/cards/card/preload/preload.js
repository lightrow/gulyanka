import React from "react";
import "./preload.scss";
const PreloadSvg = () => (
  <svg
    className="star-svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 140 140"
  >
    <path
      className="star"
      d="M-2515.869-479.968l-31.6,15.621,10.979-34.537L-2568-513.91l31.258-16.42-10.73-33.141,31.678,13.793L-2497.91-584l15.21,34.085,34.354-13.556-13.648,34.011,34.177,15.55-33.993,15.384,13.464,34.178-33.337-15.925-16.228,36.456Z"
      transform="translate(2568 583.999)"
    />
  </svg>
);

export class Preload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animationClass: ""
    };
  }

  componentWillReceiveProps(newprops) {
    console.log(newprops.preloading);
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
          this.props.preloading ? { display: "flex" } : { display: "none" }
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
