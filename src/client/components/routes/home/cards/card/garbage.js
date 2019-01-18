expandCard = (newCardDOM, newContainerDOM) => {
    /*
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
                transition: "transform 200ms cubic-bezier(.0,0,.07,1)",
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
                height: this.expandedHeight + "px"
              }
            },
            () => {
              setTimeout(() => {
                this.setState(
                  {
                    ...this.state,
                    style: {
                      ...this.state.style,
                      transition: "none",
                      transform: "scale(1.0) translate(-50%,-50%)"
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
                            "transform 400ms cubic-bezier(.04,.62,.12,.96), height 400ms cubic-bezier(.08,.62,.24,.96)",
                          transform:
                            "scale(1.0) translate(-50%,-" +
                            this.translExpandOffset +
                            "%)",
                          height:
                            this.expandedHeight + this.expansionHeight + "px"
                        },
                        expandedStyle: {
                          display: "block",
                          height: this.expansionHeight + "px"
                        }
                      });
                      this.disabled = false;
                    }, 20);
                  }
                );
              }, 100);
            }
          );
        }, 20);
      }
    );*/
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
            "transform 400ms cubic-bezier(.86,0,.07,1), height 400ms cubic-bezier(.86,0,.07,1)",
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
                transition:
                  "transform 300ms cubic-bezier(0.19, 1, 0.22, 1), opacity 500ms cubic-bezier(0.19, 1, 0.22, 1)",
                opacity: 0,
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
                      transition:
                        "opacity 500ms cubic-bezier(0.19, 1, 0.22, 1)",
                      opacity: 1
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
              }, 100);
            }
          );
        }, 20);
      }
    );
  };

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
            this.setState({
              ...this.state,
              style: {
                ...newProps.style
              }
            });
          }, 20);
        }
      );
    }
  }