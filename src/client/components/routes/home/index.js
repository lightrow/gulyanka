import React from "react";
import Search from "./search";
import Distributor from "./distributor";
import Error from "./error";
import "./home.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("M HOME");
  }

  render() {
    return (
      <div id="home">
        <Search />
        <Distributor />
        <Error />
      </div>
    );
  }
}

export default Home;
