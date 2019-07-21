import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "./components/Page";
import styled from "styled-components";

const root = document.getElementById("app");
if (root) {
  ReactDOM.render(<Page />, root);
}
