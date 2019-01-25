import React from "react";
import "./distributor.scss";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Card from "./card";
import CardViewer from "./card-viewer";
import {
  cardsDistributeDone,
  cardsRedistribute
} from "../../../../reducers/loader";

let getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

let getHeightOffset = (min, max, multi) => {
  let randomOffset = (Math.floor(Math.random() * (max - min)) + min) * multi;
  return randomOffset;
};

let getRandomCardHeight = (min, max, multiplier) => {
  let randomHeight = getRandomInt(min, max) * multiplier;
  console.log(randomHeight);
  if (randomHeight > 250) {
    return 250;
  } else if (randomHeight < 150) {
    return 150;
  } else {
    return randomHeight;
  }
};

let getRandomCardInCol = (numRows, cardsInRow, remainder, index) => {
  let rngRow = getRandomInt(1, numRows + 1);
  let rngCard = rngRow * cardsInRow - 1 + remainder - cardsInRow - index;
  if (rngCard < 0) {
    rngCard += cardsInRow;
  }
  return rngCard;
};

class Distributor extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      distributorStyle: {
        height: "1000px"
      },
      cards: []
    };
    this.cardStyles = [];
    this.distributorStyle = {};
    this.mounted = false;
    this.targetCardHeight = 180;
    this.cardHeight = this.targetCardHeight;
    this.minCardHeight = 150;
    this.cardWidth = 200;
    this.margin = 15;
    this.cardsInRow = 4;
    this.numRows = Math.floor(this.props.data.length / this.cardsInRow);
    this.targetColHeight = 0;
    this.totalWidth = this.cardsInRow * (this.cardWidth + this.margin);
  }

  handleCardsProper = () => {
    if (!this.props.loaded) {
      return;
    }
    let docWidth = document.getElementById("root").clientWidth;
    this.cardsInRow = Math.floor(docWidth / (this.cardWidth + this.margin));
    this.numRows = Math.floor(this.props.data.length / this.cardsInRow);
    this.totalWidth = this.cardsInRow * (this.cardWidth + this.margin);
    let style = {};
    let top = 0;
    let left = 0;
    let sumJSX = [];
    let cardsSums = []; // storage for each card's top+height sum value
    let cardsHeights = []; // storage for each card's height value
    let cardStyles = []; // storage for cards' styles
    //  calc all the heights ( and tops )
    for (let h = 0; h < this.props.data.length; h++) {
      this.cardHeight = this.targetCardHeight + getHeightOffset(-5, 3, 10);
      cardsHeights.push(this.cardHeight);
      if (h >= this.cardsInRow) {
        cardsSums.push(
          this.cardHeight + cardsSums[h - this.cardsInRow] + this.margin
        );
      } else {
        cardsSums.push(this.cardHeight + this.margin);
      }
    }

    //  Adjust heights and tops to give columns the same height:
    //  Get target height (height of the biggest column)
    let topHeights = [];
    for (let av = 0; av < this.cardsInRow; av++) {
      if (cardsSums[cardsSums.length - 1 - av] != undefined) {
        topHeights.push(cardsSums[cardsSums.length - 1 - av]);
      }
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
      cardStyles.push(style);
    }

    this.cardStyles = cardStyles;
    this.distributorStyle = {
      height: (this.targetColHeight + this.margin * 2).toString() + "px",
      width: this.totalWidth
    };
    //  distribute cards
    this.props.data.map((entry, index) => {
      sumJSX.push(
        <Card key={"card" + index} key_prop={index} id={"card" + index} />
      );
    });
    this.props.cardsDistributeDone(this.cardStyles, this.distributorStyle);
    return sumJSX;
  };

  handleCardsSimple = () => {
    let sumJSX = [];
    this.props.data.map((entry, index) => {
      sumJSX.push(
        <Card key={"card" + index} key_prop={index} id={"card" + index} />
      );
    });
    return sumJSX;
  };

  componentDidMount() {
    window.addEventListener("resize", () => {
      if (this.props.cardsDistributed) {  //  otherwise it recalculates ~15 times 
        this.props.cardsRedistribute();   //  per single resize event
      }
    });
  }

  render() {
    if (this.props.loaded) {
      return (
        <div id="cards" style={this.props.distributorStyle}>
          <CardViewer />
          {this.props.cardsDistributed
            ? this.handleCardsSimple()
            : this.handleCardsProper()}
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  data: state.loader.data,
  loaded: state.loader.loaded,
  loading: state.loader.loading,
  load_status: state.loader.load_status,
  cardsDistributed: state.loader.cardsDistributed,
  cardStyles: state.loader.cardStyles,
  distributorStyle: state.loader.distributorStyle
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      cardsDistributeDone,
      cardsRedistribute,
      changePage: () => push("/details")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Distributor);
