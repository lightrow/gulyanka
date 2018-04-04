import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import Details from '../details';

const App = () => (
  <div >
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/details" component={Details} />
    </main>
  </div>
);

export default App;
