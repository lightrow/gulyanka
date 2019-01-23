import React from "react";

const StarSvg = () => (
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

const HalfStarSvg = () => (
<svg className="halfstar-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
  <g className="halfstar-back" transform="translate(0.001 0.001)">
    <path  d="M-2515.937-480.1l-31.562,15.6L-2536.536-499-2568-514l31.218-16.4-10.716-33.1,31.638,13.774L-2498-584l15.783,33.808,33.713-13.3h0l-13.133,32.729L-2428-514l-33.949,15.364L-2448.5-464.5h0l-33.291-15.9L-2498-444Z" transform="translate(2568 583.999)"/>
    <g className="halfstar-front" >
      <path d="M-2497.5-577.931l15.59,33.259,34.387-13.516-13.395,33.25,34.307,17.035-34.627,15.608,13.715,34.676-33.956-16.158-16.02,35.847Z" transform="translate(2567.5 577.93)"/>
    </g>
  </g>
</svg>
);

//eh, whatever
export class Star extends React.Component {
  render() {
    return <StarSvg />;
  }
}

export class HalfStar extends React.Component {
  render() {
    return <HalfStarSvg />;
  }
}
