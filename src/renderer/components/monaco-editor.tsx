import React, { useLayoutEffect, useRef, memo } from "react";
import { editor } from "monaco-editor";

export type Props = {
  language: string;
  value: string;
};

const Editor: React.FC<Props> = props => {
  const editorRef = useRef<HTMLDivElement>(null as any);
  useLayoutEffect(() => {
    editor.create(editorRef.current, {
      ...props
    });
  });
  return <div ref={editorRef}></div>;
};

export default memo(Editor);
