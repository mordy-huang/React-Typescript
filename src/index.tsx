import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.less";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store";
import "./mocks/index";
const container: HTMLElement = document.getElementById("root")!;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App></App>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>
);
