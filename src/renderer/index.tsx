import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "./components/Page";

const root = document.getElementById("app");
console.log("200");
if (root) {
  ReactDOM.render(<Page />, root);
}
