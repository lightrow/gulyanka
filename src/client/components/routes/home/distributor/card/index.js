import React from "react";
import "./card.scss";
import { Star, HalfStar } from "./star.js";
import Preload from "./preload/preload.js";
import Counter from "./counter";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from 'connected-react-router'
import { openCard, closeCard } from "../../../../../reducers/expander";
import {
  updateCard,
  cardUpdated,
  saveImage
} from "../../../../../reducers/cards";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { ...this.props.style },
      imageStyle: {},
      containerClasses: [],
      classes: []
    };
    this.key = props.key_prop;
    this.animDuration = 1000;
  }

  loadCard = () => {
    let newClasses = this.state.classes;
    newClasses.push("load-animation");
    this.setState(
      {
        ...this.state,
        classes: newClasses,
        containerClasses: ["hide-animation"]
      },
      () => {
        setTimeout(() => {
          newClasses = newClasses.filter(entry => {
            return entry.match(/load-animation/g) ? false : true;
          });
          this.setState(
            {
              ...this.state,
              classes: newClasses
            },
            () => {
              this.handleImgStyle();
            }
          );
        }, this.animDuration - 300);
      }
    );
  };

  componentDidMount() {
    this.loadCard();
    if (!this.props.card.updated) {
    }
  }

  /*
  componentWillReceiveProps(newprops) {
    let newClasses = this.state.classes;
    newClasses = newClasses.filter(entry => {
      return entry.match(/animation/g) ? false : true;
    });
    this.setState(
      {
        ...this.state,
        style: { ...newprops.style },
        classes: newClasses
      },
      () => {
        setTimeout(() => {
          let newClasses = this.state.classes;
          newClasses = newClasses.filter(entry => {
            return entry.match(/animation/g) ? false : true;
          });
          this.setState({
            ...this.state,
            classes: newClasses
          });
        }, this.animDuration);
      }
    );
  }
*/

  handleImgStyle = () => {
    if (this.props.card.img == "null") {
      this.imgLoaded(null);
    } else if (this.props.card.img != "") {
      this.imgLoaded(this.props.card.img);
    } else {
      console.log("CARD IMG IS EMPTY");
      this.fetchImage();
    }
  };

  fetchImage = () => {
    if (this.props.card.photos) {
      fetch(
        `/api/getphoto?photoref=${
          this.props.card.photos[0].photo_reference
        }&placeref=${this.props.card.place_id}`
      )
        .then(res => res.json())
        .then(res => {
          this.props.saveImage({ key: this.key, img: res });
          this.imgLoaded(res);
        });
    } else {
      this.props.saveImage({ key: this.key, img: null });
      this.imgLoaded(null);
    }
  };

  imgLoaded = res => {
    if (res != null) {
      const bgImage = new Image();
      bgImage.src = res;
      bgImage.onload = () => {
        this.setState(
          {
            ...this.state,
            imageStyle: {
              backgroundImage: `url(${
                bgImage.src
              }), linear-gradient(rgba(0, 0, 0, 0.73) 15%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.54) 100%)`
            }
          },
          () => {
            if (!this.props.card.updated) {
              this.props.cardUpdated({ key: this.key });
            }
            this.animate();
          }
        );
      };
    } else {
      this.setState(
        {
          ...this.state,
          imageStyle: {
            background: "black"
          }
        },
        () => {
          if (!this.props.card.updated) {
            this.props.cardUpdated({ key: this.key });
          }
          this.animate();
        }
      );
    }
  };

  animate = () => {
    let newClasses = this.state.classes;
    newClasses.push("img-load-animation");
    this.setState({
      ...this.state,
      classes: newClasses,
      containerClasses: ["img-load-animation"]
    });
    setTimeout(() => {
      let newClasses = this.state.classes;
      newClasses = newClasses.filter(entry => {
        return entry.match(/animation/g) ? false : true;
      });
      this.setState({
        ...this.state,
        classes: newClasses
      });
    }, this.animDuration);
  };

  handleRating = () => {
    let starsNum = Math.floor(this.props.card.rating);
    let Stars = [];
    for (let i = 0; i < starsNum; i++) {
      Stars.push(<Star key={"star" + i} />);
    }
    if (this.props.card.rating % 1 >= 0.5) {
      Stars.push(<HalfStar key="halfstar1" />);
    }
    return Stars;
  };

  prepClasses = what => {
    return what.join(" ");
  };

  saveParticipants = goers => {
    let key = this.props.key_prop;
    let obj = { key: key, goers: goers };
    this.props.saveGoers(obj);
  };

  openCard = () => {
    this.props.changePage("#" + this.key.toString())
    this.props.openCard(this.key);
  };

  render() {
    return (
      <div
        className={"card " + this.prepClasses(this.state.classes)}
        style={this.props.style}
        id={this.props.id}
        onClick={this.openCard}
      >
        <div
          className={
            "card-container " + this.prepClasses(this.state.containerClasses)
          }
          id={"container-" + this.props.id}
        >
          <div className="card-img" style={this.state.imageStyle}>
            <div className="headline">
              <span className="card-title">{this.props.card.name}</span>
              <div className="stars">{this.handleRating()}</div>
            </div>
            <div className="midline" />
            <div className="bottomline">
              <span className="openclosed">
                {this.props.card.opening_hours
                  ? this.props.card.opening_hours.open_now
                    ? "Open"
                    : ""
                  : ""}
              </span>
              <Counter
                place_id={this.props.card.place_id}
                key_prop={this.key}
              />
            </div>
          </div>
        </div>
        <Preload key_prop={this.key} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cards[ownProps.key_prop],
  style: state.loader.cardStyles[ownProps.key_prop]
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openCard,
      closeCard,
      updateCard,
      cardUpdated,
      saveImage,
      changePage: (where) => push("/" + where)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
