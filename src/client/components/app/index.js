import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "../routes/home";
import About from "../routes/about";
import Profile from "../routes/profile";
import AuthCallback from "../routes/authcallback";

import Navbar from "../navbar";
import Auth from "../auth";
import ErrorPopup from "../errorpopup";
import { hot } from "react-hot-loader";
import "./style.scss";
import Footer from "../footer";
class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Navbar />
          <Auth />
          <ErrorPopup />
        </header>
        <main id="main">
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/authcallback" component={AuthCallback} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default hot(module)(App);
//export default App;
