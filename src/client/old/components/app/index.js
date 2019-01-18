import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "../home";
import Details from "../details";
import Navbar from "./navbar";
import AuthPopup from "../authpopup";
import purgeStoredState from "redux-persist";

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Navbar />
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/details" component={Details} />
          <Route exact path="/auth" component={AuthPopup} />
        </main>
      </div>
    );
  }
}

export default App;
