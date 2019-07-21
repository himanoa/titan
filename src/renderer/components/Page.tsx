import React, { memo } from "react";
import styled from "styled-components";
import MonacoEditor from "react-monaco-editor";

export type Props = {};

const StyledDiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vh;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const options = {
  scrollbar: {
    // Subtle shadows to the left & top. Defaults to true.
    useShadows: false,

    // Render vertical arrows. Defaults to false.
    verticalHasArrows: false,
    // Render horizontal arrows. Defaults to false.
    horizontalHasArrows: false,

    verticalScrollbarSize: 0,
    horizontalScrollbarSize: 0,
    arrowSize: 0
  },
  fontSize: 16,
  lineNumbers: "off" as "off"
};
const Page: React.FC<Props> = props => {
  return (
    <StyledDiv>
      <MonacoEditor
        language="markdown"
        value=""
        height="100vh"
        options={options}
      />
    </StyledDiv>
  );
};

export default memo(Page);
