import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { button: "", goers: [] };
  }

  handleGo = () => {
    if (this.state.button == "") {
      this.setState({ button: "disabled" });
      fetch("/api/willgo?q=" + this.props.place_id, {
        method: "GET",
        credentials: "include"
      })
        .then(response => response.json())
        .then(response => {
          window.alert(response.message);
        });
    }
  };

  componentWillMount() {
    fetch("/api/getgoers?q=" + this.props.place_id, {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ goers: response });
      });
  }


  render() {
    return (
      <div className="card my-2 tracker p-3" style={{backgroundColor:"black"}}>
        <button
          className={"btn btn-primary " + this.state.button}
          onClick={this.handleGo}
          style={{ width: "25%" }}
        >
          Will Go
        </button>
        <div style={{ marginTop: "16px" }}>
          {this.state.goers.map((entry, index) => {
            return (
              <a href={"https://twitter.com/" + entry.name}>
                <img
                  id={"goer" + index}
                  src={entry.profile_image_url}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderWidth: "5px",
                    borderRadius: "5px",
                    borderStyle: "solid"
                  }}
                />
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.auth.friends,
  logged: state.auth.logged,
  place_id: state.loader.entryData.place_id
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
