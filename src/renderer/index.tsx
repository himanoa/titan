import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "./components/Page";

import { ipcRenderer } from "electron";
const root = document.getElementById("app");
if (root) {
  ReactDOM.render(<Page />, root);
}

ipcRenderer.on("fileOpen", function(event, args) {
  console.dir(args);
});
