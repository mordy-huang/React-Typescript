import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import "./mocks/index";
import "./index.less";

const container: HTMLElement = document.getElementById("root")!;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <App></App>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
