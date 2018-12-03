import React from "react";

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div
      className="map"
      style={{
        width: "90%",
        height: "370px",
      }}
    >
      <iframe
        title="googleMapsEmbed"
        height="360px"
        width="100%"
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
