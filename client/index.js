import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { history, store, persistor } from "./store";
import App from "./components/app";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";

const target = document.querySelector("#root");



render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <div>
          <App />
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  target
);
