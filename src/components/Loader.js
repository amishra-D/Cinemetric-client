"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Loader2 } from "lucide-react";

const sections = [
  { 
    title: "Input Stage", 
    steps: ["Input Movie Title", "Data Processing"] 
  },
  {
    title: "Analysis Stage",
    steps: [
      "Collaborative Filtering",
      "TF-IDF Vector Similarity",
      "Content-Based Filtering",
    ],
  },
  {
    title: "Final Stage",
    steps: ["Generating Recommendations", "Output Results"],
  },
];

const PipelineArrow = ({ active }) => (
  <div className="flex justify-center items-center py-2 lg:px-4">
    <ChevronRight 
      className={`hidden lg:block transition-all duration-500 ${
        active ? "text-yellow-400 translate-x-1" : "text-zinc-800"
      }`} 
      size={32} 
    />
    <ChevronDown 
      className={`lg:hidden transition-all duration-500 ${
        active ? "text-yellow-400 translate-y-1" : "text-zinc-800"
      }`} 
      size={32} 
    />
  </div>
);

function Loader() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % sections.length);
    }, 1500); // Increased time slightly to allow eyes to read the steps
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-neutral-950 px-6">
      <div className="flex flex-col lg:flex-row items-stretch gap-2 w-full max-w-6xl">
        {sections.map((section, sIndex) => {
          const isActive = stage === sIndex;
          const isCompleted = stage > sIndex;

          return (
            <React.Fragment key={sIndex}>
              <div
                className={`flex flex-col gap-4 p-6 rounded-2xl transition-all duration-700 border relative overflow-hidden flex-1
                ${
                  isActive
                    ? "border-yellow-400/50 bg-zinc-900/50 shadow-[0_0_30px_rgba(250,204,21,0.1)] scale-[1.02]"
                    : "border-zinc-800 opacity-40 scale-100"
                }`}
              >
                {/* Scanning Light Effect for Active Stage */}
                {isActive && (
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-scan" />
                )}

                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.3em]
                    ${isActive ? "text-yellow-500" : "text-zinc-600"}`}
                  >
                    {section.title}
                  </span>
                  {isActive && <Loader2 className="animate-spin text-yellow-500" size={14} />}
                </div>

                <div className="flex flex-col gap-2">
                  {section.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`px-4 py-3 border rounded-xl transition-all duration-500 flex items-center gap-3
                      ${
                        isActive
                          ? "border-yellow-400/20 bg-yellow-400/5 text-yellow-50"
                          : "border-zinc-800 text-zinc-500"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-yellow-400 animate-pulse" : "bg-zinc-700"}`} />
                      <span className="text-xs font-medium tracking-wide">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {sIndex < sections.length - 1 && (
                <PipelineArrow active={isActive || isCompleted} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Loader;