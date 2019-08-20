import React, {
  memo,
  useState,
  useEffect,
  useRef,
  useLayoutEffect
} from "react";
import styled from "styled-components";
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
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
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

interface ResizeObserverEntry {
  contentRect: {
    width: number;
    height: number;
  };
}
const Page: React.FC<Props> = () => {
  const divRef = useRef(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<monacoEditor.editor.ICodeEditor>(
    null as any
  );

  const options: monacoEditor.editor.IEditorConstructionOptions = {
    language: "markdown",
    scrollbar: {
      useShadows: false,
      verticalHasArrows: false,
      horizontalHasArrows: false,
      verticalScrollbarSize: 1,
      horizontalScrollbarSize: 1,
      arrowSize: 11
    },
    minimap: {
      enabled: false
    },
    fontSize: 16,
    lineNumbers: "off" as "off"
  };
  useEffect(() => {
    const channel = `request-fileBody`;
    const handler = (_: unknown, args: RequestFileBodyMessage) => {
      ipcRenderer.send(`response-fileBody-${args.fileName}`, editor.getValue());
    };
    ipcRenderer.on(channel, handler);
    return () => {
      ipcRenderer.removeListener(channel, handler);
    };
  }, [editor]);

  useEffect(() => {
    ipcRenderer.on("fileOpen", (_: unknown, args: FileOpenMessage) => {
      editor.setValue(args.fileBody);
    });
    return () => {
      ipcRenderer.removeAllListeners("fileOpen");
    };
  }, [editor]);

  useLayoutEffect(() => {
    if (editorRef.current && divRef.current) {
      const editor = monacoEditor.editor.create(editorRef.current, options);
      const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        const entry = entries[0];
        editor.layout({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      });
      observer.observe(divRef.current);
      setEditor(editor);
      return () => {
        editor.dispose();
        observer.disconnect();
      };
    }
  }, []);
  return (
    <StyledDiv ref={divRef}>
      <div ref={editorRef} />
    </StyledDiv>
  );
};

export default memo(Page);
