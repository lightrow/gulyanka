import React from "react";
import Search from "./search"
import Cards from "./cards"
import "./style.css"

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="home">
        <Search/>
        <Cards/>
      </div>
    )
  }
}

export default Home;