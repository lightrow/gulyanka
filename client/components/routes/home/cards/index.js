import React from "react";
import "./style.css";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Card from "./card";

let getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

let matchPrevCol = (col, card, height, heightsArr) => {
  if (col == 0) {
    return false;
  } else if (height == heightsArr[col - 1][card]) {
    return true;
  }
};

class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

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
        <div key={"col"+col} className="column">
          {this.props.data.map((entry, index) => {
            if (index < currentCard || currentCard >= currentLimit) {
              return;
            } else {
              currentCard++;
              return (
                <Card key={"card"+index} cardData={entry} height={colHeight[index % ratio]} />
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

  render() {
    if (this.props.loaded) {
      return <div id="cards">{this.handleCards()}</div>;
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
