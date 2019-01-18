import React from "react";
import Search from "./search";
import Cards from "./cards";
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
        <Cards />
        <Error />
      </div>
    );
  }
}

export default Home;
