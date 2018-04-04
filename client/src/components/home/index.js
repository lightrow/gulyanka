import React from 'react';
import Searchbar from './searchbar';
import Resultsframe from './resultsframe';

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="my-auto">
          <h1>GULYANKA</h1>
          <Searchbar />
          <Resultsframe />
        </div>
      </div>
    )
  }
}

export default Home;