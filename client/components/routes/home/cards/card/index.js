import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./style.css";
import { Star, HalfStar } from "./star.js";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        ...props.style,
        transform: "scale(0)",
        opacity: 0
      },
      img: ""
    };
    this.mounted = false;
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      style: { ...this.state.style, ...newProps.style }
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        style: {
          transform: "scale(1)",
          opacity: 1,
          ...this.props.style
        }
      });
      setTimeout(() => {
        this.setState({
          style: {
            ...this.props.style
          }
        });
      });

      if (this.props.cardData.photos && 1 == 2) {
        fetch(
          `/api/getdetails?photoref=${
            this.props.cardData.photos[0].photo_reference
          }&placeid=${this.props.cardData.place_id}`
        )
          .then(res => res.json())
          .then(res => {
            this.setState({
              style: {
                ...this.props.style,
                backgroundImage: `url(${res.photo})`
              }
            });
          });
      }
    }, 100);
  }

  handleRating = () => {
    let starsNum = Math.floor(this.props.cardData.rating);
    let Stars = [];
    for (let i = 0; i < starsNum; i++) {
      Stars.push(<Star key={"star" + i} />);
    }
    if (this.props.cardData.rating % 1 >= 0.5) {
      Stars.push(<HalfStar key="halfstar1" />);
    }
    return Stars;
  };

  render() {
    return (
      <div className="card" style={this.state.style} id={this.props.id}>
        <div className="overlay">
          <div className="headline">
            <span className="card-title">{this.props.cardData.name}</span>
            <div className="stars">{this.handleRating()}</div>
          </div>
          <div className="midline" />
          <div className="footer">
            <span className="openclosed">
              {this.props.cardData.opening_hours
                ? this.props.cardData.opening_hours.open_now
                  ? "Open"
                  : ""
                : ""}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
