import React from "react";
import './map.scss';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div
      className="map"
    >
      <iframe
        title="googleMapsEmbed"
        width="100%"
        frameBorder="0"
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
