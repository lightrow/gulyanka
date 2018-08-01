import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {} from "../../../modules/loader";
import Review from "./review";
import Tracker from "./tracker";

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: false,
      stars: []
    };
  }
  " ";

  componentWillMount() {
    if (!this.props.entryData.photo) {
      this.props.changePage();
    }
    stars = [""];
    let stars = [];
    for (var i = this.props.entryData.rating; i > 0; i--) {
      stars.push(
        <svg
          style={{ fill: "yellow", stroke: "orange", margin: "auto 1px" }}
          width="13"
          height="13"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="175.706 104.107 18.71 17.456"
        >
          <path
            className="a"
            d="M119.864,111.14l5.858-.769,2.641-4.97,2.8,4.97,5.148.769-4.142,3.846.947,5.764-4.755-3.219-5.422,3.219,1.3-5.764Z"
            transform="translate(57 -0.252)"
          />
        </svg>
      );
    }
    for (var i = 5 - stars.length; i > 0; i--) {
      stars.push(
        <svg
          style={{ fill: "none", stroke: "white", margin: "auto 1px" }}
          width="13"
          height="13"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="175.706 104.107 18.71 17.456"
        >
          <path
            className="a"
            d="M119.864,111.14l5.858-.769,2.641-4.97,2.8,4.97,5.148.769-4.142,3.846.947,5.764-4.755-3.219-5.422,3.219,1.3-5.764Z"
            transform="translate(57 -0.252)"
          />
        </svg>
      );
    }
    this.setState({ stars: stars });
  }

  render() {
    const imgstyle = {
      width: "100%",
      backgroundImage: `url(${this.props.entryData.photo})`,
      backgroundRepeat: "no-repeat",
      backgroundColor: "black",
      backgroundSize: "cover",
      objectFit: "cover",
      border: "none"
    };

    const gradstyle = {
      background:
        "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.2), rgba(0,0,0,0.6) )",
      height: "100%",
      width: "100%"
    };

    return (
      <div>
        <div style={imgstyle}>
          <div style={gradstyle}>
            <div className=" p-3 mb-2" style={{ height: "auto" }}>
              <h3 className="mb-1" style={{ color: "white" }}>
                {this.props.entryData.name}
              </h3>
              <div className="mb-1" id="rating">
                {this.state.stars}
              </div>
              <h6 className="mb-1" style={{ color: "white" }}>
                {this.props.entryData.formatted_address}
              </h6>
              <div style={{ height: "250px" }} />
              <small style={{ color: "white" }}>
                {this.props.entryData.opening_hours
                  ? this.props.entryData.opening_hours.open_now
                    ? "Opened"
                    : "Closed"
                  : ""}
              </small>
              <h6 style={{ color: "white" }} className="mb-1">
                {this.props.entryData.formatted_phone_number}
              </h6>
              <Tracker />
            </div>
          </div>
        </div>

        <div className="card p-3 mb-2">
          {this.props.entryData.reviews.map(review => (
            <Review key={review.id} review={review} />
          ))}
        </div>

        <div className="card p-1 mb-2">
          <iframe
            title="googleMapsEmbed"
            height="300"
            width="100%"
            frameBorder="0"
            style={{ border: "0", borderRadius: "5px" }}
            src={
              "https://www.google.com/maps/embed/v1/place?key=AIzaSyDPQNABRT48CdsoR_UHMBpYWmnRhWmuBcU&q=place_id:" +
              this.props.entryData.place_id
            }
            allowFullScreen
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entryData: state.loader.entryData,
  photo: state.loader.photo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/")
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Frame);
