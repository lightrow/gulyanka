import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  inputChange,
  inputSubmit,
  loadStart,
  loadEnd,
  loadFail,
  loadSuccess
} from '../../../modules/loader';

class Searchbar extends React.Component {

  onInputChange = (event) => {
    this.props.inputChange(event.target.value)
  }

  onInputSubmit = (event) => {
    event.preventDefault();
    this.props.loadStart()
    if (this.props.city.toString() === '') {
      return this.props.loadFail("Nothing entered");
    } else {
      fetch("/api/getplaces?city=" + this.props.city.toString()).then(response => response.json()).then(res => {
        console.log("response received")
        console.log(res.status === "ZERO_RESULTS");
        switch (res.status) {
          case "ZERO_RESULTS":
            return this.props.loadFail("Nothing found");
          case "NO_INPUT":
            return this.props.loadFail("Nothing entered");
          default:
            return this.props.loadSuccess(res.results);
        }
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.onInputSubmit}>
        <div className="form-row">
          <div className="form-group col-sm-10">
            <input
              onChange={this.onInputChange}
              type="city"
              className="form-control form-control-lg"
              id="cityFormInput"
              placeholder="Your city"
              readOnly={this.props.loading ? "readonly" : false} />
          </div>
          <div className="col-sm-2 my-1">
            <button
              style={{ width: "100%" }}
              type="submit"
              className="btn btn-primary"
              disabled={this.props.loading ? "disabled" : false}
            >Search</button>
          </div>
        </div>
      </form>
    )
  }
}



const mapStateToProps = state => ({
  loading: state.loader.loading,
  loaded: state.loader.loaded,
  data: state.loader.data,
  city: state.loader.city
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      inputChange,
      inputSubmit,
      loadStart,
      loadEnd,
      loadFail,
      loadSuccess,
      changePage: () => push('/details')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);