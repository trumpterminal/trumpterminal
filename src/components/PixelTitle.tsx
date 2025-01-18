"use client";

import React, { useEffect, useState } from 'react';

const PixelTitle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const originalText = "TRUMP AI";
  const [displayText, setDisplayText] = useState(originalText);
  const [glitchText, setGlitchText] = useState(originalText);
  const [iteration, setIteration] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);

  // Regular text animation
  useEffect(() => {
    setIsVisible(true);
    let intervalId: NodeJS.Timeout;

    const startAnimation = () => {
      let iterationCount = 0;
      setIsWaiting(false);
      setIteration(0);

      intervalId = setInterval(() => {
        setDisplayText(prev => {
          let result = "";
          for (let i = 0; i < originalText.length; i++) {
            if (i < iterationCount) {
              result += originalText[i];
            } else if (originalText[i] === " ") {
              result += " ";
            } else {
              result += letters[Math.floor(Math.random() * 26)];
            }
          }
          
          if (iterationCount >= originalText.length) {
            clearInterval(intervalId);
            setIsWaiting(true);
            setTimeout(startAnimation, 2000);
          } else {
            iterationCount += 1/3;
          }

          return result;
        });
      }, 30);
    };

    startAnimation();
    return () => clearInterval(intervalId);
  }, []);

  // Glitch effect interval
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      
      // Create glitch text effect
      const glitchTextInterval = setInterval(() => {
        setGlitchText(prev => {
          let result = "";
          for (let i = 0; i < originalText.length; i++) {
            if (originalText[i] === " ") {
              result += " ";
            } else {
              result += letters[Math.floor(Math.random() * 26)];
            }
          }
          return result;
        });
      }, 50);

      setTimeout(() => {
        setIsGlitching(false);
        clearInterval(glitchTextInterval);
        setGlitchText(displayText);
      }, 200);
    }, 1000);

    return () => clearInterval(glitchInterval);
  }, [displayText]);

  return (
    <div className={`relative py-6 ${isGlitching ? 'animate-terminal-glitch' : ''}`}>
      {/* Glitch Layers */}
      <div className={`absolute inset-0 ${isGlitching ? 'animate-glitch-layer-1' : 'opacity-0'}`}>
        <div className="w-full h-full bg-red-500/10" />
      </div>
      <div className={`absolute inset-0 ${isGlitching ? 'animate-glitch-layer-2' : 'opacity-0'}`}>
        <div className="w-full h-full bg-green-500/10" />
      </div>

      {/* Main title with glitch text */}
      <div className="relative">
        {/* Base text */}
        <h1 
          className={`
            font-['Press_Start_2P'] text-4xl md:text-6xl text-center text-green-500
            transition-all duration-1000 transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            ${isWaiting ? 'animate-pulse-slow' : ''}
            hover:text-green-400 cursor-default
            relative z-10
            text-shadow-pixel
          `}
        >
          {isGlitching ? glitchText : displayText}
        </h1>

        {/* Glitch text layers */}
        {isGlitching && (
          <>
            <h1 
              className="absolute inset-0 text-4xl md:text-6xl text-center text-red-500 opacity-50 animate-glitch-text-1 font-['Press_Start_2P']"
              style={{ clipPath: 'polygon(0 15%, 100% 15%, 100% 30%, 0 30%)' }}
            >
              {glitchText}
            </h1>
            <h1 
              className="absolute inset-0 text-4xl md:text-6xl text-center text-green-500 opacity-50 animate-glitch-text-2 font-['Press_Start_2P']"
              style={{ clipPath: 'polygon(0 70%, 100% 70%, 100% 85%, 0 85%)' }}
            >
              {glitchText}
            </h1>
          </>
        )}
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 bg-scanline opacity-10 animate-scanline"></div>
    </div>
  );
};

export default PixelTitle;