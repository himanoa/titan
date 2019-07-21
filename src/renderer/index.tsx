import * as React from "react";
import * as ReactDOM from "react-dom";
import MonacoEditor from "./components/monaco-editor";

const root = document.getElementById("app");
if (root) {
  ReactDOM.render(<MonacoEditor language="markdown" value="" />, root);
}
