import React, { memo, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import MonacoEditor from "react-monaco-editor";
import { ipcRenderer } from "electron";
import { FileOpenMessage, RequestFileBodyMessage } from "../../main/message";

ipcRenderer.on("fileOpen", function(args: FileOpenMessage) {
  console.dir(args.fileBody);
});

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
const Page: React.FC<Props> = () => {
  const [code, setCode] = useState("");

  useEffect(() => {
    const channel = `request-fileBody`;
    const handler = (_: unknown, args: RequestFileBodyMessage) => {
      ipcRenderer.send(`response-fileBody-${args.fileName}`, code);
    };
    ipcRenderer.on(channel, handler);
    return () => {
      ipcRenderer.removeListener(channel, handler);
    };
  }, [code]);

  useEffect(() => {
    ipcRenderer.on("fileOpen", (_: unknown, args: FileOpenMessage) => {
      setCode(args.fileBody);
    });
  }, []);

  const onChange = useCallback(
    (e: string) => {
      setCode(() => e);
    },
    [code]
  );
  return (
    <StyledDiv>
      <MonacoEditor
        language="markdown"
        value={code}
        height="100vh"
        options={options}
        onChange={onChange}
      />
    </StyledDiv>
  );
};

export default memo(Page);
