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
        zIndex: "-1",
        opacity: 0
      },
      overlayStyle: {},
      img: "",

      cardData: this.props.cardData
    };
    this.dark = false;
    this.mounted = false;
    this.disabled = false;
    this.percentX = 0;
    this.percentY = 0;
    this.scrollY = 0;
    this.cardDOM = {};
    this.expansionHeight = 200;
    this.expandedHeight = 300;
    this.expandedWidth = 500;
    this.translExpandOffset = 33;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.wantsClose && this.expanded) {
      this.closeCard();
    } else {
      //  messy
      if (this.expanded) {
        this.closeCard();
      }
      this.setState(
        {
          ...this.state,
          style: {
            ...this.state.style,
            ...newProps.style,
            transition: "none"
          }
        },
        () => {
          setTimeout(() => {
            this.setState(
              {
                ...this.state,
                style: {
                  ...newProps.style
                }
              },
              () => {
                console.log("LOLOLOLOLO");
              }
            );
          }, 20);
        }
      );
    }
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

  fetchDetails = () => {
    fetch(`/api/getdetails?&placeid=${this.props.cardData.place_id}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
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
          this.setState({
            ...this.state,
            style: {
              ...this.state.style
            },
            imgStyle: {
              ...this.state.imgStyle,
              backgroundImage: `url(${res})`,
              opacity: 1
            },
            img: res
          });
        });
    }
  };

  closeCard = () => {
    let cardX = this.cardDOM.offsetLeft + 5 + this.cardDOM.clientWidth / 2;
    let cardY = this.cardDOM.offsetTop + 5 + this.cardDOM.clientHeight / 2;
    this.scrollY = window.scrollY;
    let scaleX = this.cardDOM.clientWidth / this.expandedWidth;
    let scaleY = this.cardDOM.clientHeight / this.expandedHeight;
    let middleX = window.innerWidth / 2;
    let middleY = window.innerHeight / 3;
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
          top: this.savedTop,
          transition:
            "transform 200ms cubic-bezier(0.35, 1, 0.5, 1), height 200ms cubic-bezier(0.5, 1, 0.5, 1)",
          transform: "scale(1.0) translate(-50%,-50%)",
          height: this.expandedHeight
        }
      },
      () => {
        setTimeout(() => {
          this.setState(
            {
              ...this.state,
              style: {
                ...this.state.style,
                position: "absolute",
                top: this.savedTop,
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
              overlayStyle: {
                height: "100%"
              },
              expandedStyle: {
                ...this.state.expandedStyle,
                display: "none"
              },
              imgStyle: {
                ...this.state.imgStyle,
                height: "100%"
              }
            },
            () => {
              setTimeout(() => {
                this.setState(
                  {
                    ...this.state,
                    style: {
                      ...this.state.style,
                      top: this.savedTop,
                      transition:
                        "transform 200ms cubic-bezier(0.19, 1, 0.22, 1)",
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
                              }
                            });
                            this.disabled = false;
                          }, 20);
                        }
                      );
                    }, 20);
                  }
                );
              }, 20);
            }
          );
        }, 20);
      }
    );
  };

  expandCard = (newCardDOM, newContainerDOM) => {
    let box = newCardDOM.getBoundingClientRect();
    this.cardDOM.offsetLeft = box.left;
    this.cardDOM.offsetTop = box.top;
    this.cardDOM.clientHeight = newCardDOM.clientHeight;
    this.cardDOM.clientWidth = newCardDOM.clientWidth;
    let cardX = this.cardDOM.offsetLeft + 5 + this.cardDOM.clientWidth / 2;
    let cardY = this.cardDOM.offsetTop + 5 + this.cardDOM.clientHeight / 2;
    this.scrollY = window.scrollY;
    let middleX = window.innerWidth / 2;
    let middleY = window.innerHeight / 3;
    let scaleX = this.cardDOM.clientWidth / this.expandedWidth;
    let scaleY = this.cardDOM.clientHeight / this.expandedHeight;
    let diffX = cardX - middleX;
    let diffY = cardY - middleY;
    let percentX = (diffX / this.expandedWidth) * 100 - 50;
    let percentY = (diffY / this.expandedHeight) * 100 - 50;
    this.savedTop = window.scrollY + window.innerHeight / 3 - 90 + "px";
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
          top: this.savedTop,
          transition: "none",
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
          padding: "15px"
        }
      },
      () => {
        setTimeout(() => {
          this.setState(
            {
              ...this.state,
              style: {
                ...this.state.style,
                transition: "transform 300ms cubic-bezier(0.19, 1, 0.22, 1)",
                transform: "scale(1.0) translate(-50%,-50%)",
                top: this.savedTop
              },
              darkenStyle: {
                ...this.state.darkenStyle,
                backgroundColor: "rgb(0,0,0,0.5)"
              },
              overlayStyle: {
                ...this.state.overlayStyle,
                height: this.expandedHeight + "px",
                position: "relative"
              },
              imgStyle: {
                ...this.state.imgStyle,
                height: this.expandedHeight - 6 + "px"
              }
            },
            () => {
              setTimeout(() => {
                this.setState({
                  ...this.state,
                  style: {
                    ...this.state.style,
                    top: this.savedTop,
                    transition:
                      "transform 400ms cubic-bezier(0.35, 1, 0.5, 1), height 400ms cubic-bezier(0.5, 1, 0.5, 1)",
                    transform:
                      "scale(1.0) translate(-50%,-" +
                      this.translExpandOffset +
                      "%)",
                    height: this.expandedHeight + this.expansionHeight + "px"
                  },
                  expandedStyle: {
                    display: "block",
                    height: this.expansionHeight + "px"
                  }
                });
                this.disabled = false;
              }, 300);
            }
          );
        }, 20);
      }
    );
  };

  handleClick = () => {
    let newCardDOM = document.getElementById(this.props.id);
    //let newContainerDOM = document.getElementById("container-" + this.props.id);

    if (!this.disabled) {
      this.disabled = true;
      if (!this.expanded) {
        this.props.darken(true);
        this.expandCard(newCardDOM);
      } else {
        this.props.darken(false);
        this.closeCard();
      }
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
      <div
        className="card"
        style={this.state.style}
        id={this.props.id}
        onClick={this.handleClick}
      >
        <div className="card-container" id={"container-" + this.props.id}>
          <div className="card-img" style={this.state.imgStyle} />
          <div className="overlay" style={this.state.overlayStyle}>
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
          <div className="expanded-info" style={this.state.expandedStyle} />
        </div>
      </div>
    );
  }
}

export default Card;
