import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "../routes/home";
import Details from "../routes/details";
import Auth from "../routes/auth"
import Navbar from "../navbar"

export class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Navbar />
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/details" component={Details} />
          <Route exact path="/auth" component={Auth} />
        </main>
      </div>
    );
  }
}
