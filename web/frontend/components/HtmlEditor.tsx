import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";
import suneditor from "suneditor";
import React, { Ref, useEffect, useImperativeHandle, useRef } from "react";
import { InlineError } from "@shopify/polaris";
import { Field } from "@shopify/react-form/build/ts";

export interface HtmlEditorProps extends Field<string> {
  maxCharCount?: number;
  charCounter?: boolean;
  showPathLabel?: boolean;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}

export type EditorRef = {
  getContents(): string;
  getText(): string;
  getCharCount(): number;
  isEmpty(): boolean;
};

const initialEditor = suneditor.init({
  buttonList: [["bold", "underline", "italic", "strike"]],
  width: "auto",
});

const HtmlEditorComponent = (
  props: HtmlEditorProps,
  ref: Ref<EditorRef>
): JSX.Element => {
  const {
    defaultValue,
    error,
    onBlur,
    onChange,
    maxCharCount,
    charCounter = true,
    showPathLabel = false,
    height = "100px",
    minHeight = "50px",
    maxHeight = "200px",
  } = props;
  const txtArea = useRef<HTMLTextAreaElement>(null);
  const editor = useRef<SunEditorCore>();

  useEffect(() => {
    editor.current = initialEditor.create(txtArea.current, {
      value: defaultValue,
      maxCharCount,
      charCounter,
      showPathLabel,
      height,
      minHeight,
      maxHeight,
    });
    editor.current.onChange = (content) => {
      if (txtArea.current) txtArea.current.value = content;
      onChange?.(content);
      console.log("onChange", content);
    };

    if (onBlur) editor.current.onBlur = () => editor.current && onBlur();

    return () => {
      editor.current?.destroy();
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      getContents: () => editor.current?.getContents(true) || "",
      getText: () => editor.current?.getText() || "",
      getCharCount: () => editor.current?.getCharCount() || 0,
      isEmpty() {
        if (!editor.current) return true;
        const wysiwyg = editor.current.core.context.element.wysiwyg;
        return editor.current.util.onlyZeroWidthSpace(wysiwyg.textContent);
      },
    }),
    [editor.current]
  );

  return (
    <>
      <textarea style={{ visibility: "hidden" }} ref={txtArea} />
      {error && <InlineError message={error} fieldID="field-id" />}
    </>
  );
};

export const HtmlEditor = React.forwardRef(HtmlEditorComponent);
