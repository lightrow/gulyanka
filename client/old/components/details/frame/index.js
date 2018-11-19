import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {} from "../../../modules/loader";
import Review from "./review";
import Tracker from "./tracker";
import Map from "./map";
import { changeColor } from "../../../modules/navbar";
import "./style.css";

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: false,
      stars: [],
      framestyle: {
        opacity: "0%",
        transition: "background-color 0.5s ease-in-out"
      },
      styleset: false
    };
  }
  " ";

  componentDidMount() {
    if (!this.state.styleset) {
      this.setState({ framestyle: { opacity: "100%" }, styleset: true });
    }
  }

  componentWillMount() {
    this.props.changeColor("black");
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
      backgroundImage: `url(${this.props.entryData.photo})`
    };

    const gradstyle = {
      background:
        "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.2), rgba(0,0,0,0.6) )",
      height: "100%",
      width: "100%"
    };

    return (
      <div style={this.state.framestyle}>
        <div id="image" style={imgstyle}>
          <div id="gradient" style={{ display: "flex" }}>
            <div className="p-3 mb-2">
              <h3 className="mb-1" style={{ color: "white" }}>
                {this.props.entryData.name}
              </h3>
              <div className="mb-1" id="rating">
                {this.state.stars}
              </div>
              <h6 className="mb-1" style={{ color: "white" }}>
                {this.props.entryData.formatted_address}
              </h6>
              <div style={{ position: "absolute", bottom: "15px" }}>
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
            <Map place_id={this.props.entryData.place_id}/>
          </div>
        </div>

        <div className="card p-3 mb-2">
          {this.props.entryData.reviews.map(review => (
            <Review key={review.id} review={review} />
          ))}
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
      changeColor,
      changePage: () => push("/")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Frame);
