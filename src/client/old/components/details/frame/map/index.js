import React from "react";

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div
      className="card p-1 mb-2"
      style={{
        width: "370px",
        height: "370px",
        position: "absolute",
        bottom: "15px",
        right: "15px"
      }}
    >
      <iframe
        title="googleMapsEmbed"
        height="360px"
        width="360px"
        frameBorder="0"
        style={{ border: "0", borderRadius: "5px" }}
        src={
          "https://www.google.com/maps/embed/v1/place?key=AIzaSyDPQNABRT48CdsoR_UHMBpYWmnRhWmuBcU&q=place_id:" +
          this.props.place_id
        }
        allowFullScreen
      />
    </div>);
  }
}

export default Map;
