import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  data: { ar: string; en: string };
}

const ProductDescriptionHtmlViewer = ({ data: { ar, en } }: Props) => {
  const { lang } = useParams();
  const html = lang === "ar" ? ar : en;

  const [cleanHtml, setCleanHtml] = useState<string>("");

  const sanitizeAndModifyHtml = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Remove all style tags
    const styleTags = doc.querySelectorAll("style");
    styleTags.forEach((tag) => tag.remove());

    // Add classes to paragraphs and headings
    doc.querySelectorAll("p").forEach((el) => {
      el.classList.add("pasted-p");
    });
    doc.querySelectorAll("h1").forEach((el) => {
      el.classList.add("pasted-h1");
    });
    doc.querySelectorAll("h2").forEach((el) => {
      el.classList.add("pasted-h2");
    });
    doc.querySelectorAll("h3").forEach((el) => {
      el.classList.add("pasted-h3");
    });
    doc.querySelectorAll("h4").forEach((el) => {
      el.classList.add("pasted-h4");
    });
    doc.querySelectorAll("h5").forEach((el) => {
      el.classList.add("pasted-h5");
    });
    doc.querySelectorAll("h6").forEach((el) => {
      el.classList.add("pasted-h6");
    });

    return doc.body.innerHTML;
  };

  useEffect(() => {
    const sanitizedHtml = sanitizeAndModifyHtml(html);
    setCleanHtml(sanitizedHtml);
  }, [html]);

  return (
    <div className="max-w-[660px]">
      <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
    </div>
  );
};

export default ProductDescriptionHtmlViewer;
