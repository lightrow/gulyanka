import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "../routes/home";
import About from "../routes/about";
import Login from "../routes/login";
import Navbar from "../navbar";
import { hot } from "react-hot-loader";
import "./style.scss"

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Navbar />
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
        </main>
      </div>
    );
  }
}

//export default hot(module)(App);
export default App;
