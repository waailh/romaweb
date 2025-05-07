"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
}
const Scratcher = ({ value }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scratched, setScratched] = useState(false);

  const t = useTranslations("Cart");

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Match canvas size to the container size
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Create a pattern of squares with shades of gray
    const squareSize = 10;
    for (let y = 0; y < canvas.height; y += squareSize) {
      for (let x = 0; x < canvas.width; x += squareSize) {
        const grayShade = Math.floor(150 + Math.random() * 100); // Shades of gray (150-250)
        ctx.fillStyle = `rgb(${grayShade}, ${grayShade}, ${grayShade})`;
        ctx.fillRect(x, y, squareSize, squareSize);
      }
    }

    // Add "Scratch Here" text to the canvas
    ctx.font = "18px Arial";
    ctx.fillStyle = "#666";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(t("scrtchere"), canvas.width / 2, canvas.height / 2);

    let isDrawing = false;

    const startScratch = () => {
      isDrawing = true;
    };

    const endScratch = () => {
      if (!isDrawing) return;
      isDrawing = false;

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let cleared = 0;

      // Check how many pixels have been cleared
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) cleared++;
      }

      const percentCleared = (cleared / (canvas.width * canvas.height)) * 100;
      if (percentCleared > 50) setScratched(true); // Reveal after 50% is scratched
    };

    const scratchOff = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = ("touches" in e ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = ("touches" in e ? e.touches[0].clientY : e.clientY) - rect.top;
      ctx.clearRect(x - 15, y - 10, 30, 20); // Clear a small rectangular area where the user interacts
    };

    canvas.addEventListener("mousedown", startScratch);
    canvas.addEventListener("mouseup", endScratch);
    canvas.addEventListener("mousemove", scratchOff);

    canvas.addEventListener("touchstart", startScratch);
    canvas.addEventListener("touchend", endScratch);
    canvas.addEventListener("touchmove", scratchOff);

    return () => {
      canvas.removeEventListener("mousedown", startScratch);
      canvas.removeEventListener("mouseup", endScratch);
      canvas.removeEventListener("mousemove", scratchOff);

      canvas.removeEventListener("touchstart", startScratch);
      canvas.removeEventListener("touchend", endScratch);
      canvas.removeEventListener("touchmove", scratchOff);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "200px", height: "50px" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          backgroundColor: "white",
          color: "black",
          zIndex: 0,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {value}
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          cursor: "pointer",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Scratcher;
