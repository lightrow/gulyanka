import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { inputChange } from "../../../../reducers/input";
import {
  typingStart,
  getData
} from "../../../../reducers/loader";
import "./search.scss";
import { SearchIcon } from "./icon/search_icon";
import { SubmitIcon } from "./icon/submit_icon";

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.loaded) {
      this.state = {
        searchClass: "search-small"
      };
    } else {
      this.state = {
        searchClass: ""
      };
    }
  }

  onInputChange = event => {
    this.props.typingStart();
    this.props.inputChange(event.target.value);
  };

  onInputSubmit = event => {
    event.preventDefault();
    if (!this.props.loaded) {
      this.setState({ ...this.state, searchClass: "search-small" });
    }
    this.props.getData(this.props.search_field);
  };

  render() {
    return (
      <div
        className={"search-group " + this.state.searchClass}
        id="search-group"
        style={this.state.styleGroup}
      >
        <SearchIcon style={this.state.styleIcon} />
        <form onSubmit={this.onInputSubmit} className="search-form">
          <div className="form-group">
            <input
              onChange={this.onInputChange}
              type="city"
              className="search-field small-search"
              id="cityFormInput"
              placeholder="Where are you?"
              value={this.props.search_field}
              readOnly={this.state.blocked ? "readonly" : false}
              autocomplete="off"
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
      typingStart,
      getData,
      changePage: () => push("/details")
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Searchbar);
