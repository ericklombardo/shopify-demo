import DOMPurify from "dompurify";

export const HtmlViewer = ({ html }: { html: string }) => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html),
      }}
    />
  );
};
