"use client";

import React, { useState, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

const Draggable = ({ children }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
      e.preventDefault(); // Prevent default behavior to avoid interference
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    if (containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Adjust the multiplier to control the scroll speed
      containerRef.current.scrollLeft = scrollLeft - walk;
      e.preventDefault(); // Prevent default behavior to avoid interference
    }
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="overflow-x-scroll custom-x-scrollbar py-1"
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUpOrLeave}
      onMouseLeave={onMouseUpOrLeave}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
      onDragStart={(e) => e.preventDefault()} // Prevent default drag behavior on images
    >
      {children}
    </div>
  );
};

export default Draggable;
