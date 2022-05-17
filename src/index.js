import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import "./i18n";
import * as serviceWorker from "./serviceWorker";



const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter basename="/isafety">
    <App />
  </BrowserRouter>
);

serviceWorker.unregister();

