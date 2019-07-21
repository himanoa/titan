import React from "react";
import TestRenderer from "react-test-renderer";
import MonacoEditor from "./monaco-editor";

describe("#MonacoEditor", () => {
  it("should be render", () => {
    const subject = TestRenderer.create(
      <MonacoEditor language="markdown" value="" />
    ).toJSON();
    expect(subject).toMatchInlineSnapshot();
  });
});
