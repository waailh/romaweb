"use client";

import React, { useRef } from "react";

interface Props {
  url: string;
}

const QuiqupIFrame: React.FC<Props> = ({ url }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.open(url, "_blank");
  };

  return (
    <div
      className="w-full h-fit flex items-center justify-center relative"
      onClick={handleClick}
    >
      <iframe
        ref={iframeRef}
        className="w-full h-[1000px] pointer-events-none"
        src={url}
      />
      <div className="absolute inset-0 cursor-pointer" />
    </div>
  );
};

export default QuiqupIFrame;
