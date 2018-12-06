import React from "react";
import "./style.css";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Card from "./card";

let getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

let getRandomCardInCol = (numRows, cardsInRow, remainder, index) => {
  let rngRow = getRandomInt(1, numRows + 1);
  let rngCard = rngRow * cardsInRow - 1 + remainder - cardsInRow - index;
  if (rngCard < 0) {
    rngCard += cardsInRow;
  }
  return rngCard;
};

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      cardsStyle: {
        height: "1000px"
      },
      darkenStyle: {
        position: "fixed",
        zIndex: 1,
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        transition: "background-color 200ms cubic-bezier(0.19, 1, 0.22, 1)",
        height: "100vh",
        width: "100vw",
        display: "none",
        backgroundColor: "rgb(0,0,0,0.0)"
      },
      cards: ""
    };
    this.cardsStyles = [];
    this.mounted = false;
    this.targetCardHeight = 150;
    this.cardHeight = this.targetCardHeight;
    this.cardWidth = 200;
    this.margin = 10;
    this.cardsInRow = 4;
    this.numRows = Math.floor(this.props.data.length / this.cardsInRow);
    this.targetColHeight = 0;
    this.totalWidth = this.cardsInRow * (this.cardWidth + this.margin);
  }

  handleResize = () => {
    let docWidth = document.getElementById("root").clientWidth;
    this.cardsInRow = Math.floor(docWidth / (this.cardWidth + this.margin));
    this.numRows = Math.floor(this.props.data.length / this.cardsInRow);
    this.totalWidth = this.cardsInRow * (this.cardWidth + this.margin);
    this.handleCardsProper();
    this.setState({
      cardsStyle: {
        height: (this.targetColHeight + this.margin * 2).toString() + "px",
        width: this.totalWidth
      }
    });
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillReceiveProps() {
    this.setState(
      {
        ...this.state,
        cards: ""
      },
      () => {
        this.handleResize();
      }
    );
  }

  darken = dark => {
    if (dark) {
      this.setState(
        {
          ...this.state,
          darkenStyle: {
            ...this.state.darkenStyle,
            display: "block"
          }
        },
        () => {
          setTimeout(() => {
            this.setState({
              ...this.state,
              darkenStyle: {
                ...this.state.darkenStyle,
                backgroundColor: "rgb(0,0,0,0.5)"
              }
            });
          }, 20);
        }
      );
    } else {
      this.setState(
        {
          ...this.state,
          darkenStyle: {
            ...this.state.darkenStyle,
            backgroundColor: "rgb(0,0,0,0.0)"
          }
        },
        () => {
          setTimeout(() => {
            this.setState({
              ...this.state,
              darkenStyle: {
                ...this.state.darkenStyle,
                display: "none"
              }
            });
          }, 100);
        }
      );
    }
  };

  closeCards = () => {
    //  redistribute cards
    let sumJSX = [];
    this.props.data.map((entry, index) => {
      sumJSX.push(
        <Card
          key={"card" + index}
          id={"card" + index}
          cardData={entry}
          style={this.cardsStyles[index]}
          darken={this.darken}
          wantsClose={true}
        />
      );
    });
    this.setState(
      {
        ...this.state,
        darkenStyle: {
          ...this.state.darkenStyle,
          backgroundColor: "rgb(0,0,0,0)"
        },
        cards: sumJSX
      },
      () => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            darkenStyle: {
              ...this.state.darkenStyle,
              display: "none"
            }
          });
        }, 200);
      }
    );
  };

  handleCardsProper = () => {
    let style = {};
    let top = 0;
    let left = 0;
    let sumJSX = [];
    let cardsSums = []; // storage for each card's top+height sum value
    let cardsHeights = []; // storage for each card's height value
    let cardsStyles = []; // storage for cards' styles
    //  calc all the heights ( and tops )
    for (let h = 0; h < this.props.data.length; h++) {
      this.cardHeight = this.targetCardHeight + getRandomInt(-2, 2) * 25;
      cardsHeights.push(this.cardHeight);
      if (h >= this.cardsInRow) {
        cardsSums.push(
          this.cardHeight + cardsSums[h - this.cardsInRow] + this.margin
        );
      } else {
        cardsSums.push(this.cardHeight + this.margin);
      }
    }

    //  adjust heights and tops to make columns the same height
    //  get target height ( average height of all columns )
    let topHeights = [];
    for (let av = 0; av < this.cardsInRow; av++) {
      topHeights.push(cardsSums[cardsSums.length - 1 - av]);
    }
    this.targetColHeight = topHeights.reduce((a, b) => {
      return a > b ? a : b;
    });
    //  set parent container element's height
    //  we cant rely on last card always being the last one in a row,
    //  so we get around that using modulo
    let remainder = cardsSums.length % this.cardsInRow;
    for (let i = 0; i < this.cardsInRow; i++) {
      let heightDif =
        this.targetColHeight - cardsSums[cardsSums.length - i - 1];
      //  change random card in column
      let newHeight = 0;
      let cardToAdjust;
      cardToAdjust = getRandomCardInCol(
        this.numRows,
        this.cardsInRow,
        remainder,
        i
      );
      newHeight = cardsHeights[cardToAdjust] + heightDif;

      cardsHeights[cardToAdjust] += heightDif;
      for (
        let c = cardToAdjust;
        c < cardsSums.length - 1;
        c += this.cardsInRow
      ) {
        cardsSums[c] += heightDif;
      }
    }

    //  prepare the styles
    for (let index = 0; index < this.props.data.length; index++) {
      //  first card
      if (index == 0) {
        top = 0;
        left = 0;
      }
      //  first card in a row
      else if (index % this.cardsInRow == 0) {
        top = cardsSums[index - this.cardsInRow];
        left = 0;
      }
      //  all other cards
      else {
        left =
          100 / this.cardsInRow +
          (100 / this.cardsInRow) * ((index % this.cardsInRow) - 1);
        // only second row and onwards have cards above them
        if (index - this.cardsInRow > 0) {
          top = cardsSums[index - this.cardsInRow];
        }
        // first row, second to last cards
        else {
          top = 0;
        }
      }

      style = {
        position: "absolute",
        left: left.toString() + "%",
        top: top.toString() + "px",
        height: cardsHeights[index].toString() + "px",
        width: this.cardWidth.toString() + "px"
      };

      cardsStyles.push(style);
    }

    this.cardsStyles = cardsStyles;

    //  distribute cards
    this.props.data.map((entry, index) => {
      sumJSX.push(
        <Card
          key={"card" + index}
          id={"card" + index}
          cardData={entry}
          style={this.cardsStyles[index]}
          darken={this.darken}
          wantsClose={false}
        />
      );
    });

    this.setState({
      ...this.state,
      cardsStyle: { ...this.state.cardsStyle },
      cards: sumJSX
    });
    //return sumJSX;
  };

  //  this variant distributes cards in columns instead of rows
  //  and relies on "flex" instead of "position:absolute" with
  //  "top" adjustments.
  /*  
  handleCards = () => {
    let ratio = Math.floor(this.props.data.length / 4);
    let cardHeight = 200;
    let margin = 5;
    let targetColHeight = (cardHeight + margin) * ratio + 100;
    let colHeight = [];
    let allColHeights = [];
    let sumColHeight;
    let currentLimit = ratio;
    let currentCard = 0;
    let sumJSX = [];
    let lastHeight;
    let newHeight;

    // prevent same height on neighbouring cards

    for (let col = 0; col < 4; col++) {
      //  card heights are randomized in order to make the card grid look more "natural"
      colHeight = [];
      for (let card = 0; card < ratio; card++) {
        while (
          newHeight == lastHeight ||
          matchPrevCol(col, card, newHeight, allColHeights)
        ) {
          newHeight = getRandomInt(-1, 4) * 25 + cardHeight;
        }
        lastHeight = newHeight;
        colHeight.push(newHeight);
      }
      allColHeights.push(colHeight);
      //  new total column height
      sumColHeight = colHeight.reduce((a, b) => {
        return a + b;
      }, 0);

      //  value to add/subtract from one of the cards in a column
      //  to make the column's height match the target column height,
      //  this is needed to align column ends.
      let diffHeight = targetColHeight - sumColHeight;

      //adjust the size of one of the cards in a column
      let cardToAdjust = getRandomInt(0, ratio);
      colHeight[cardToAdjust] += diffHeight;

      //distribute the cards
      sumJSX.push(
        <div key={"col" + col} className="column">
          {this.props.data.map((entry, index) => {
            if (index < currentCard || currentCard >= currentLimit) {
              return;
            } else {
              currentCard++;
              return (
                <Card
                  key={"card" + index}
                  cardData={entry}
                  height={colHeight[index % ratio]}
                />
              );
            }
          })}
        </div>
      );
      currentLimit += ratio;
    }
    console.log("DONE");
    return sumJSX;
  };
*/

  render() {
    if (this.props.loaded) {
      return (
        <div id="cards" style={this.state.cardsStyle}>
          <span
            id="dark-overlay"
            style={this.state.darkenStyle}
            onClick={this.closeCards}
          />
          {this.state.cards}
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  data: state.loader.data,
  loaded: state.loader.loaded
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/details")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards);
