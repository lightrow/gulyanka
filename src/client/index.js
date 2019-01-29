import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'

//import { ConnectedRouter } from "connected-react-router";
import { store, persistor } from "./store.js";
import App from "./components/app";
import { PersistGate } from "redux-persist/integration/react";
import "./index.scss";

const target = document.querySelector("#root");

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <div>
          <App />
        </div>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  target
);
