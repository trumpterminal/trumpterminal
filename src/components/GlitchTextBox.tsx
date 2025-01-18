"use client";

import React, { useState, useEffect } from 'react';

const GlitchTextBox = () => {

  const [isGlitching, setIsGlitching] = useState(false);

  const [prefixText, setPrefixText] = useState("CA");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Glitch effect for prefix (CA)

  useEffect(() => {

    const glitchInterval = setInterval(() => {

      setIsGlitching(true);

      

      let iterations = 0;

      const intervalId = setInterval(() => {

        setPrefixText(prev => {

          if (iterations >= 2) {

            clearInterval(intervalId);

            setIsGlitching(false);

            return "CA";

          }

          

          return "CA".split("")

            .map((_, index) => {

              if(index < iterations) {

                return "CA"[index];

              }

              return letters[Math.floor(Math.random() * 26)];

            })

            .join("");

        });

        

        iterations += 1/2;

      }, 30);

      

    }, 3000);

    return () => clearInterval(glitchInterval);

  }, []);

  return (

    <div className="max-w-xs mx-auto">

      <div className={`

        relative p-4 rounded-lg

        bg-black/30 backdrop-blur

        border border-green-500/30

        overflow-hidden

      `}>

        {/* Background glitch effects */}

        <div className={`absolute inset-0 ${isGlitching ? 'animate-glitch-layer-1' : 'opacity-0'}`}>

          <div className="w-full h-full bg-red-500/10" />

        </div>

        <div className={`absolute inset-0 ${isGlitching ? 'animate-glitch-layer-2' : 'opacity-0'}`}>

          <div className="w-full h-full bg-green-500/10" />

        </div>

        <div className="relative z-10 flex items-center justify-center space-x-2">

          {/* Prefix with glitch effect */}

          <span className={`

            font-['Press_Start_2P'] text-2xl text-green-500

            ${isGlitching ? 'animate-terminal-glitch' : ''}

          `}>

            {prefixText}:

          </span>

          {/* TBA with constant glitch effect */}

          <span className="

            font-['Press_Start_2P'] text-2xl text-green-500

            glitch-text animate-pulse-slow

            relative

          ">

            TBA

            <span className="absolute top-0 left-0 -translate-x-[2px] translate-y-[2px] text-red-500 opacity-50">TBA</span>

            <span className="absolute top-0 left-0 translate-x-[2px] -translate-y-[2px] text-green-500 opacity-50">TBA</span>

          </span>

        </div>

      </div>

    </div>

  );

};

export default GlitchTextBox;