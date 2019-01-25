import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  closeCard,
  closeParticipants,
  expandParticipants
} from "../../../../../reducers/expander";
import Map from "./map";
import { Star, HalfStar } from "../card/star.js";
import "./card-viewer.scss";
import Splitter from "./splitter.js";

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleParticipants = () => {
    let persons = [];
    if (this.props.cards[this.props.loadedCard].goers.length <= 5) {
      this.props.cards[this.props.loadedCard].goers.map((person, index) => {
        persons.push(
          <div className="person" id={"person" + index}>
            <img src={person.profile_image_url} />
          </div>
        );
      });
      //for testing
      persons.push(
        <div
          className="person person-more"
          onClick={e => this.props.expandParticipants(e)}
        >
          {this.props.participantsExpanded
            ? this.handleParticipantsExpanded()
            : "+" + (this.props.cards[this.props.loadedCard].goers.length - 5).toString()}
        </div>
      );
      persons.push(
        <div
          className="tonight-text"
        >
          <span>...will be chilling here tonight.</span>
        </div>
      );
      return <div className="participants">{persons}</div>;
    } else {
      for (let i = 0; i < 4; i++) {
        persons.push(
          <div className="person" id={"person" + index}>
            <img src={this.props.cards[this.props.loadedCard].goers[i].profile_image_url} />
          </div>
        );
      }
      persons.push(
        <div className="person person-more">
          {this.props.participantsExpanded
            ? this.handleParticipantsExpanded
            : "+" + (this.props.cards[this.props.loadedCard].goers.length - 5).toString}
        </div>
      );
      persons.push(
        <div
          className="tonight-text"
        >
          <span>...will be chilling here tonight.</span>
        </div>
      );
      return <div className="participants">{persons}</div>;
    }
  };

  prepareAllParticipants = () => {
    let persons = [];
    this.props.cards[this.props.loadedCard].goers.map((person, index) => {
      persons.push(
        <div className="person" id={"person" + index}>
          <img src={person.profile_image_url} />
        </div>
      );
    });
    return persons;
  };

  closeParticipants = e => {
    e.stopPropagation();
    this.props.closeParticipants();
  };

  handleParticipantsExpanded = () => (
    <div className={"participants-all"}>
      <div className="participants-all-topbar">
        <button className="button" onClick={e => this.closeParticipants(e)}>
          x
        </button>
      </div>
      <div className="participants-all-container">
        {this.prepareAllParticipants()}
      </div>
    </div>
  );

  stopContainerClickPropagation = e => {
    //only close if clicked outside the card on the padding surrounding it.
    e.stopPropagation();
  };

  handleClick = e => {
    if (this.props.isOpened) {
      this.props.closeCard();
      this.props.closeParticipants();
    }
  };

  handleRating = () => {
    let starsNum = Math.floor(this.props.cards[this.props.loadedCard].rating);
    let Stars = [];
    for (let i = 0; i < starsNum; i++) {
      Stars.push(<Star key={"star" + i} />);
    }
    if (this.props.cards[this.props.loadedCard].rating % 1 >= 0.5) {
      Stars.push(<HalfStar key="halfstar" />);
    }
    return Stars;
  };

  handleViewer = () => {
    if (this.props.isOpened) {
      return (
        <div
          id="card-viewer-container"
          onClick={e => this.stopContainerClickPropagation(e)}
        >
          <div className="card-viewer-subcontainer">
            <div id="title">
              <span>{this.props.cards[this.props.loadedCard].name}</span>
              <div id="rating">{this.handleRating()}</div>
            </div>

            <div id="button-group-top">
              {this.handleParticipants()}
              <button className="button button-willgo">Will Go</button>
            </div>
            <div className="mid-container">
              <div
                id="img"
                style={{ backgroundImage: `url(${this.props.cards[this.props.loadedCard].img})` }}
              />
              <div id="button-group-bottom">
                <button className="button button-opensat">Opens At {}</button>
                <div className="splitter-line1" />
                <div className="splitter">
                  <Splitter />
                </div>
                <div className="splitter-line2" />
                <div id="buttons-social">
                  <button className="button button-facebook">f</button>
                  <button className="button button-twitter">t</button>
                  <button className="button button-google">g+</button>
                </div>
              </div>
              <Map place_id={this.props.cards[this.props.loadedCard].place_id} />
            </div>
            <div className="address">
              <span>{this.props.cards[this.props.loadedCard].vicinity}</span>
            </div>
            <div className="disclaimer">Powered by GoogleAPI</div>
          </div>
          <div id="corner-box1">
            <div id="corner1" />
          </div>
          <div id="corner-box2">
            <div id="corner2" />
          </div>
          <div id="corner-box3">
            <div id="corner3" />
          </div>
          <div id="corner-box4">
            <div id="corner4" />
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div
        id="card-viewer"
        className={this.props.isOpened ? "" : "hide"}
        onClick={e => this.handleClick(e)}
      >
        {this.handleViewer()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cards:state.cards,
  loadedCard: state.expander.loadedCard,
  isOpened: state.expander.isOpened,
  participantsExpanded: state.expander.participantsExpanded
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeCard,
      closeParticipants,
      expandParticipants,
      changePage: () => push("/somewhere")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardViewer);
