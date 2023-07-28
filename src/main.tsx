/* @refresh reload */
import { render } from "solid-js/web";

import "./global.css";
// import App from "./app";
import { Router } from "@solidjs/router";
import App from "./app";
import configuration from "./configuration";

const root = document.getElementById("root");

render(
  () => (
    <Router base={configuration.baseUrl.replace(/^\/|\/$/g, "")}>
      <App />
    </Router>
  ),
  root!
);
