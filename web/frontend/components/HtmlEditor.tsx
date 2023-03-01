import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";
import suneditor from "suneditor";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { InlineError } from "@shopify/polaris";

export interface HtmlEditorProps {
  onChange?: (content: string) => void;
  onBlur?: (event: FocusEvent, editorContents: string) => void;
  disable?: boolean;
  defaultValue?: string;
  readOnly?: boolean;
  maxCharCount?: number;
  charCounter?: boolean;
  showPathLabel?: boolean;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  errorMessage?: string;
  required?: boolean;
}

const initialEditor = suneditor.init({
  buttonList: [["bold", "underline", "italic", "strike"]],
  charCounter: true,
  showPathLabel: false,
  height: "100px",
  minHeight: "50px",
  maxHeight: "300px",
  width: "auto",
});

export const HtmlEditor: FC<HtmlEditorProps> = (
  props: HtmlEditorProps
): JSX.Element => {
  const {
    defaultValue,
    onBlur,
    onChange,
    errorMessage,
    required = false,
    ...options
  } = props;
  const [valueText, setValueText] = useState<string>(defaultValue ?? "");
  const txtArea = useRef<HTMLTextAreaElement>(null);
  const editor = useRef<SunEditorCore>();
  const displayError = useMemo<"inline-block" | "none">(
    () => (!required || !!valueText ? "none" : "inline-block"),
    [valueText, required]
  );

  useEffect(() => {
    editor.current = initialEditor.create(txtArea.current, {
      value: defaultValue,
      ...options,
    });
    setValueText(defaultValue ?? "");

    editor.current.onChange = (content) => {
      if (txtArea.current) txtArea.current.value = content;
      setValueText(editor.current.getText());
      onChange?.(content);
    };

    if (onBlur)
      editor.current.onBlur = (e) =>
        editor.current && onBlur(e, editor.current.getContents(true));

    return () => {
      editor.current?.destroy();
    };
  }, []);

  return (
    <>
      <textarea style={{ visibility: "hidden" }} ref={txtArea} />
      <div style={{ marginTop: 5, display: displayError }}>
        <InlineError message={errorMessage} fieldID="field-id" />
      </div>
    </>
  );
};
