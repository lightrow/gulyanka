import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setDetails,
} from '../../../modules/loader';


class Resultsframe extends React.Component {

  handleClick = (placeid, photoref) => {
    fetch(`/api/getdetails?photoref=${photoref}&placeid=${placeid}`).then(res => res.json()).then(res => {
      this.props.setDetails(res)
      this.props.changePage()
      window.scrollTo(0, 0)
    });


  }

  render() {
    return (
      <div id="resultsframe" className="my-3">
        <div className="">
          <div className="list-group">{this.props.data.map(entry => {
            return (
              <button
                className="list-group-item list-group-item-action align-items-start"
                key={entry.id}
                onClick={() => this.handleClick(entry.place_id, entry.photos ? entry.photos[0].photo_reference : null)}
              >
                <div className="d-flex justify-content-between">
                  <h5 className="mb-1">{entry.name}</h5>
                  <small>{entry.opening_hours ? entry.opening_hours.open_now ? "Opened" : "Closed" : ""}</small>
                </div>
                <p className="mb-1">{entry.vicinity}</p>
              </button>
            )
          })}
            <h5 className="list-group-item list-grou-item-action flex-column align-items-start">
              {this.props.loading ? "Loading" : this.props.error}
            </h5>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.loader.data,
  loading: state.loader.loading,
  loaded: state.loader.loaded,
  city: state.loader.city,
  error: state.loader.error,
  selectedEntry: state.loader.selectedEntry,
  photo: state.loader.photo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setDetails,
      changePage: () => push('/details')
    }, dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(Resultsframe);