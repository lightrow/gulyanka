import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { inputChange } from "../../../../reducers/input";
import {
  loadStart,
  loadEnd,
  loadFail,
  loadSuccess
} from "../../../../reducers/loader";
import "./style.css";
import { SearchIcon } from "./icon/search_icon";
import { SubmitIcon } from "./icon/submit_icon";

class Searchbar extends React.Component {
  onInputChange = event => {
    this.props.inputChange(event.target.value);
    if (!event.target.value){

    }
  };

  onInputSubmit = event => {
    this.setState({
      ...this.state,
      blocked:true
    })
    if (!this.props.loaded) {
      this.shrinkSearch();
    }
    event.preventDefault();
    this.props.loadStart();
    if (this.props.search_field.toString() === "") {
      return this.props.loadFail("Error: Field is empty");
    } else {
      fetch("/api/getplaces?city=" + this.props.search_field.toString())
        .then(response => response.json())
        .then(res => {
          console.log("response received");
          console.log(res.status === "ZERO_RESULTS");
          switch (res.status) {
            case "ZERO_RESULTS":
              return this.props.loadFail("Nothing found");
            case "NO_INPUT":
              return this.props.loadFail("Nothing entered");
            default:
              return this.props.loadSuccess(res.results);
          }
        }).then(()=>{
          this.setState({
            ...this.state,
            blocked:false
          })
        });
    }
  };

  shrinkSearch = () => {
    let groupDOM = document.getElementById("search-group");
    let groupStyle = window.getComputedStyle(groupDOM);
    console.log(groupStyle.marginTop);
    this.setState(
      {
        ...this.state,
        styleGroup: {
          marginTop: groupStyle.marginTop.toString()
        }
      },
      () => {
        setTimeout(() => {
          this.setState(
            {
              ...this.state,
              styleIcon: {
                opacity: "0",
                transform: "scale(0)",
                height: "0px",
                margin: "0 auto"
              },
              styleGroup: {
                height: "35px",
                marginTop: "50px",
                marginBottom: "0px"
              }
            },
            () => {
              setTimeout(() => {
                this.setState({
                  styleIcon: {
                    display: "none"
                  },
                  styleGroup: {
                    transition: "none",
                    position: "relative",
                    height: "35px",
                    marginTop: "12px",
                    marginBottom: "0px"
                  }
                });
              }, 700);
            }
          );
        }, 100);
      }
    );
  };

  constructor(props) {
    super(props);
    console.log(this.props.loaded);
    if (this.props.loaded) {
      this.state = {
        styleIcon: {
          display: "none"
        },
        styleGroup: {
          transition: "none",
          position: "relative",
          height: "35px",
          marginTop: "12px",
          marginBottom: "0px"
        }
      };
    } else {
      this.state = {
        blocked: false,
        styleGroup: {},
        styleIcon: {
          opacity: "1"
        }
      };
    }
  }

  render() {
    return (
      <div
        className="search-group"
        id="search-group"
        style={this.state.styleGroup}
      >
        <SearchIcon style={this.state.styleIcon} />
        <form onSubmit={this.onInputSubmit} className="search-form">
          <div className="form-group">
            <input
              onChange={this.onInputChange}
              type="city"
              className="search-field"
              id="cityFormInput"
              placeholder="Where are you?"
              readOnly={this.state.blocked ? "readonly" : false}
            />
            <button
              type="submit"
              className="search-button"
              disabled={this.state.blocked ? "disabled" : false}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loader.loading,
  load_status: state.loader.load_status,
  loaded: state.loader.loaded,
  typing: state.loader.typing,
  data: state.loader.data,
  search_field: state.input.search_field
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      inputChange,
      loadStart,
      loadEnd,
      loadSuccess,
      loadFail,
      changePage: () => push("/details")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Searchbar);
