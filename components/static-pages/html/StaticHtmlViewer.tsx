"use client";

import { useEffect, useState } from "react";

interface Props {
  html: string;
}

const StaticHtmlViewer = ({ html }: Props) => {
  const [cleanHtml, setCleanHtml] = useState<string>("");

  const sanitizeAndModifyHtml = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Remove all br tags
    // const brTags = doc.querySelectorAll("br");
    // brTags.forEach((tag) => tag.remove());

    // Remove style attributes from all elements
    const allElements = doc.querySelectorAll("*");
    allElements.forEach((el) => {
      el.removeAttribute("style");
    });

    // Add classes to paragraphs and headings
    doc.querySelectorAll("p").forEach((el) => {
      el.classList.add("pasted-p");
    });
    doc.querySelectorAll("strong").forEach((el) => {
      el.classList.add("pasted-strong");
    });
    doc.querySelectorAll("a").forEach((el) => {
      el.classList.add("pasted-a");
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
    <div dangerouslySetInnerHTML={{ __html: cleanHtml }} id="pastedHtml" />
  );
};

export default StaticHtmlViewer;
