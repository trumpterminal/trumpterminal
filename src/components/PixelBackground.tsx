"use client";

import React, { useEffect, useRef } from "react";

const PixelBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update canvas size when the window is resized
  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixelSize = 10; // Size of each "pixel"
    const colors = [
      "rgba(34, 197, 94, 0.2)", // Green
      "rgba(239, 68, 68, 0.2)", // Red
      "rgba(0, 0, 0, 0.1)", // Black
      "rgba(59, 130, 246, 0.2)", // Blue
    ];

    const drawPixels = () => {
      // Get the current canvas size
      const cols = Math.ceil(canvas.width / pixelSize);
      const rows = Math.ceil(canvas.height / pixelSize);

      // Draw the "pixeled" background
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          ctx.fillStyle = randomColor;

          // Slight randomness for the pixel positions to give a glitchy look
          const offsetX = Math.random() * 2 - 1; // Random X offset
          const offsetY = Math.random() * 2 - 1; // Random Y offset

          ctx.fillRect(
            i * pixelSize + offsetX,
            j * pixelSize + offsetY,
            pixelSize,
            pixelSize
          );
        }
      }
    };

    const animate = () => {
      // Clear the canvas before redrawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPixels();
      requestAnimationFrame(animate); // Keep the animation going
    };

    animate(); // Start the animation loop

  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 bg-black w-full h-full -z-10"
    />
  );
};

export default PixelBackground;
