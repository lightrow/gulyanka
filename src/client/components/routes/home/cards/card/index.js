import React from "react";
import "./card.scss";
import { Star, HalfStar } from "./star.js";
import { Preload } from "./preload/preload.js";
import Counter from "./counter";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  openCard,
  closeCard,
  closeParticipants
} from "../../../../../reducers/expander";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { ...this.props.style },
      imageStyle: {},
      containerClasses: [],
      classes: [],
      img: "",
      preloading: true,
      goers: [],
      expanded: false
    };
    this.animDuration = 1000;
  }

  componentDidMount() {
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
              this.fetchImage();
            }
          );
        }, this.animDuration - 300);
      }
    );
  }

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

  fetchDetails = () => {
    fetch(`/api/getdetails?&placeid=${this.props.cardData.place_id}`)
      .then(res => res.json())
      .then(res => {});
  };

  fetchImage = () => {
    if (this.props.cardData.photos && this.state.img == "") {
      fetch(
        `/api/getphoto?photoref=${
          this.props.cardData.photos[0].photo_reference
        }&placeref=${this.props.cardData.place_id}`
      )
        .then(res => res.json())
        .then(res => {
          const bgImage = new Image();
          bgImage.src = res;
          bgImage.onload = () => {
            this.imgLoaded(bgImage.src);
          };
        });
    } else if (this.state.img != "") {
      const bgImage = new Image();
      bgImage.src = this.state.img;
      bgImage.onload = () => {
        this.imgLoaded(bgImage.src);
      };
    } else {
      this.imgLoaded(null);
    }
  };

  imgLoaded = res => {
    //hide loader
    //show card
    let newClasses = this.state.classes;
    newClasses.push("img-load-animation");

    if (res != null) {
      this.setState({
        ...this.state,
        classes: newClasses,
        preloading: false,
        containerClasses: ["img-load-animation"],
        imgStyle: {
          backgroundImage: `url(${res}), linear-gradient(rgba(0, 0, 0, 0.73) 15%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.54) 100%)`
        },
        img: res
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
    } else {
      setTimeout(() => {
        this.setState({
          ...this.state,
          classes: newClasses,
          containerClasses: ["img-load-animation"],
          preloading: false,
          imgStyle: {
            background: `black`
          },
          img: res
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
      }, this.animDuration);
    }
  };

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

  prepClasses = what => {
    return what.join(" ");
  };

  saveParticipants = goers => {
    this.setState({
      ...this.state,
      goers: goers
    });
  };

  openCard = () => {
    let cardData = { data: this.props.cardData, goers: this.state.goers, img:this.state.img };
    this.props.openCard(cardData);
  };

  render() {
    return (
      <div
        className={"card " + this.prepClasses(this.state.classes)}
        style={this.state.style}
        id={this.props.id}
        onClick={this.openCard}
      >
        <div
          className={
            "card-container " + this.prepClasses(this.state.containerClasses)
          }
          id={"container-" + this.props.id}
        >
          <div className="card-img" style={this.state.imgStyle}>
            <div className="headline">
              <span className="card-title">{this.props.cardData.name}</span>
              <div className="stars">{this.handleRating()}</div>
            </div>
            <div className="midline" />
            <div className="bottomline">
              <span className="openclosed">
                {this.props.cardData.opening_hours
                  ? this.props.cardData.opening_hours.open_now
                    ? "Open"
                    : ""
                  : ""}
              </span>
              <Counter
                saveParticipants={this.saveParticipants}
                place_id={this.props.cardData.place_id}
              />
            </div>
          </div>
        </div>
        <Preload preloading={this.state.preloading} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  expanded: state.expander.expanded
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openCard,
      closeCard,
      closeParticipants,
      changePage: () => push("/somewhere")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
