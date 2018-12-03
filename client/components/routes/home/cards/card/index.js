import React from "react";
import "./style.css";
import { Star, HalfStar } from "./star.js";
import Map from "./map";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.expanded = false;
    this.state = {
      style: {
        ...props.style,
        transform: "scale(0)",
        opacity: 0,
        zIndex: 1
      },
      darkenStyle: {
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        transition: "background-color 200ms cubic-bezier(0.19, 1, 0.22, 1)",
        height: "100vh",
        width: "100vw",
        display: "none",
        backgroundColor: "rgb(0,0,0,0.0)"
      },
      headlineStyle: {
        padding: "0px"
      },
      expandedStyle: {
        display: "none"
      },
      imgStyle: {
        position: "absolute",
        height: "100%",
        width: "100%",
        zIndex: "-1"
      },
      img: "",

      cardData: this.props.cardData
    };
    this.initState = this.state;
    this.dark = false;
    this.mounted = false;
    this.disabled = false;
    this.percentX = 0;
    this.percentY = 0;
    this.scrollY = 0;
    this.cardDOM = {};
    this.expandedHeight = 500;
    this.expandedWidth = 700;
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...this.state,
      style: {
        ...this.state.style,
        ...newProps.style
      }
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        ...this.state,
        style: {
          transform: "scale(1)",
          opacity: 1,
          ...this.props.style
        }
      });
      setTimeout(() => {
        this.setState({
          ...this.state,
          style: {
            ...this.props.style
          }
        });
      });

      this.fetchImage();
    }, 100);
  }

  fetchImage = () => {
    if (this.props.cardData.photos && this.state.img == "") {
      fetch(
        `/api/getdetails?photoref=${
          this.props.cardData.photos[0].photo_reference
        }&placeid=${this.props.cardData.place_id}`
      )
        .then(res => res.json())
        .then(res => {
          this.setState({
            ...this.state,
            style: {
              ...this.state.style
            },
            imgStyle: {
              ...this.state.imgStyle,
              backgroundImage: `url(${res.photo})`
            },
            img: res.photo
          });
        });
    }
  };

  closeCard = () => {
    let cardX = this.cardDOM.offsetLeft + this.cardDOM.clientWidth / 2;
    let cardY =
      this.cardDOM.offsetTop +
      (this.scrollY - window.scrollY) +
      this.cardDOM.clientHeight / 2;
    this.scrollY = window.scrollY;
    let scaleX = this.cardDOM.clientWidth / this.expandedWidth;
    let scaleY = this.cardDOM.clientHeight / this.expandedHeight;
    let middleX = window.innerWidth / 2;
    let middleY = window.innerHeight / 2;
    let diffX = cardX - middleX;
    let diffY = cardY - middleY;
    let percentX = (diffX / this.expandedWidth) * 100 - 50;
    let percentY = (diffY / this.expandedHeight) * 100 - 50;

    this.expanded = false;

    this.setState(
      {
        ...this.state,
        style: {
          ...this.state.style,
          position: "absolute",
          top: window.scrollY + window.innerHeight / 2 - 85 + "px",
          transform: "scale(1.0) translate(-50%,-50%)"
        },
        darkenStyle: {
          ...this.state.darkenStyle,
          backgroundColor: "rgb(0,0,0,0.0)"
        },
        expandedStyle: {
          ...this.state.expandedStyle,
          display: "none"
        }
      },
      () => {
        setTimeout(() => {
          this.setState(
            {
              ...this.state,
              style: {
                ...this.state.style,
                top: window.scrollY + window.innerHeight / 2 - 85 + "px",
                transition: "transform 200ms cubic-bezier(0.19, 1, 0.22, 1)",
                transform:
                  "translate(" +
                  percentX +
                  "%," +
                  percentY +
                  "%) scaleX(" +
                  scaleX +
                  ") scaleY(" +
                  scaleY +
                  ")"
              },
              headlineStyle: {
                padding: "0px"
              }
            },
            () => {
              setTimeout(() => {
                this.setState(
                  {
                    ...this.state,
                    style: {
                      ...this.props.style,
                      zIndex: 0,
                      transition: "none"
                    },
                    imgStyle: {
                      ...this.state.imgStyle,
                      backgroundImage: `url(${this.state.img})`
                    }
                  },
                  () => {
                    setTimeout(() => {
                      this.setState({
                        style: {
                          ...this.props.style
                        },
                        darkenStyle: {
                          ...this.state.darkenStyle,
                          zIndex: 0,
                          display: "none"
                        }
                      });
                    }, 20);
                  }
                );
              }, 100);
            }
          );
          this.disabled = false;
        }, 30);
      }
    );
  };

  expandCard = (newCardDOM, newContainerDOM) => {
    let box = newCardDOM.getBoundingClientRect();
    this.cardDOM.offsetLeft = box.left;
    this.cardDOM.offsetTop = box.top;
    this.cardDOM.clientHeight = newCardDOM.clientHeight;
    this.cardDOM.clientWidth = newCardDOM.clientWidth;
    let cardX = this.cardDOM.offsetLeft + this.cardDOM.clientWidth / 2;
    let cardY = this.cardDOM.offsetTop + this.cardDOM.clientHeight / 2;
    this.scrollY = window.scrollY;
    let middleX = window.innerWidth / 2;
    let middleY = window.innerHeight / 2;
    let scaleX = this.cardDOM.clientWidth / this.expandedWidth;
    let scaleY = this.cardDOM.clientHeight / this.expandedHeight;
    let diffX = cardX - middleX;
    let diffY = cardY - middleY;
    let percentX = (diffX / this.expandedWidth) * 100 - 50;
    let percentY = (diffY / this.expandedHeight) * 100 - 50;

    this.expanded = true;

    this.setState(
      {
        ...this.state,
        style: {
          ...this.state.style,
          zIndex: 2,
          position: "absolute",
          height: this.expandedHeight,
          width: this.expandedWidth,
          left: "50%",
          top: window.scrollY + window.innerHeight / 2 - 85 + "px",
          transition: "none",
          overflowY: "scroll",
          transform:
            "translate(" +
            percentX +
            "%," +
            percentY +
            "%) scaleX(" +
            scaleX +
            ") scaleY(" +
            scaleY +
            ")"
        },
        darkenStyle: {
          ...this.state.darkenStyle,
          display: "block",
          zIndex: 1
        },
        headlineStyle: {
          padding: "15px"
        }
      },
      () => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            style: {
              ...this.state.style,
              transition: "transform 300ms cubic-bezier(0.19, 1, 0.22, 1)",
              transform: "scale(1.0) translate(-50%,-50%)",
              top: window.scrollY + window.innerHeight / 2 - 85 + "px"
            },
            darkenStyle: {
              ...this.state.darkenStyle,
              backgroundColor: "rgb(0,0,0,0.5)"
            }
          });

          setTimeout(() => {
            this.setState({
              ...this.state,
              style: {
                ...this.state.style,
                position: "fixed",
                top: "50%",
                transition: "none"
              },
              expandedStyle: {
                display: "block",
                height: "200px"
              }
            });
            this.disabled = false;
          }, 300);
        }, 20);
      }
    );
  };

  handleClick = () => {
    //  To avoid performance problems of animating left and top transitions,
    //  animations are done using css translate, scale and opacity instead.
    //  The card's coordinates are first recalculated into
    //  "translate" relative screen coordinates, then changed to visually
    //  move the card, then a transitionless transformation happens, making an
    //  expanded card into a fixed position element. The backwards process is the
    //  same reversed. Opacity transitions are applied to mask the translate
    //  transitions. Transitions are done in multiple stages, requiring chaining
    //  up to 4 "setState"s with "setTimeout"s in a row. TODO: promisify setState
    let newCardDOM = document.getElementById(this.props.id);
    let newContainerDOM = document.getElementById("container-" + this.props.id);
    let box = newCardDOM.getBoundingClientRect();
    console.log("top: " + box.top + " left: " + box.left);
    console.log(
      "offtop: " + newCardDOM.offsetTop + " offleft:" + newCardDOM.offsetLeft
    );
    //  we need to save the DOM values to make the card return to its proper
    //  place even if the user scrolls the page after opening the card.

    if (!this.disabled) {
      this.disabled = true;
      if (!this.expanded) {
        this.expandCard(newCardDOM, newContainerDOM);
      } else {
        this.closeCard();
      }
    }
  };

  handleDarken = () => {
    if (this.expanded && !this.disabled) {
      this.closeCard();
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

  render() {
    return (
      <div className="card-container" id={"container-" + this.props.id}>
        <span
          className="darken"
          onClick={this.handleDarken}
          style={this.state.darkenStyle}
        />
        <div
          className="card"
          style={this.state.style}
          id={this.props.id}
          onClick={this.handleClick}
        >
          <div className="card-img" style={this.state.imgStyle} />
          <div className="overlay">
            <div className="headline" style={this.state.headlineStyle}>
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
          <div className="expanded-info" style={this.state.expandedStyle}>
 
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
