import React, { useLayoutEffect, useRef, memo } from "react";
import * as monaco from "monaco-editor";

export type Props = {
  language: string;
  value: string;
} & monaco.editor.IEditorConstructionOptions;

const Editor: React.FC<Props> = props => {
  const editorRef = useRef<HTMLDivElement>(null as any);
  useLayoutEffect(() => {
    monaco.editor.create(editorRef.current, {
      ...props
    });
  });
  return <div ref={editorRef}></div>;
};

export default memo(Editor);
