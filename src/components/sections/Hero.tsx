"use client";

import React from "react";
import Container from "../shared/Container";
import TextEffect from "../animations/TextEffect";
import { useChatStore } from "../../store/chatStore";

export default function Hero() {
  const { visitorName } = useChatStore();

  const handleScrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full min-h-[85vh] flex flex-col justify-center bg-transparent border-b border-[#F5E6D3]/30 select-none">
      <Container className="py-20 md:py-32 flex flex-col items-start text-left space-y-8">
        
        {/* Serial Count */}
        <div className="text-[10px] font-mono text-[#C49B6C] uppercase tracking-widest font-bold">
          00 // <TextEffect text="TEMPLE_GATE_AWAKENING" effect="grow" />
        </div>

        {/* Welcome Greeting */}
        <div className="text-2xl sm:text-3xl font-serif text-[#C49B6C] italic select-text">
          <TextEffect text={`Namaste, ${visitorName || "Seeker"}. 🪷`} effect="typewriter" delay={0.12} />
        </div>

        {/* Large Display Name */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif text-[#1A1A1A] tracking-wider leading-none select-text">
          <TextEffect text="SIVA PRASAD" effect="typewriter" delay={0.4} speed={0.06} />
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-mono text-[#6B6359] uppercase tracking-widest max-w-xl leading-relaxed">
          <TextEffect 
            text="Cloud & Software Architecture | CSE Student | GATE 2026" 
            effect="dropdown" 
            delay={0.85} 
          />
        </p>

        {/* Short Bio Line */}
        <p className="text-xl sm:text-2xl font-serif italic text-[#6B6359] max-w-2xl leading-relaxed select-text">
          <TextEffect 
            text="Building scalable systems with mindfulness and purpose." 
            effect="fade" 
            delay={1.2} 
          />
        </p>

        {/* Clean CTA Trigger */}
        <div className="pt-4">
          <button
            onClick={handleScrollToProjects}
            className="group flex items-center space-x-3 text-xs font-mono uppercase tracking-widest text-[#C49B6C] border border-[#C49B6C]/30 hover:border-[#C49B6C] px-6 py-3.5 rounded-full bg-white hover:bg-[#C49B6C] hover:text-white transition-all duration-300 shadow-sm cursor-pointer hover:scale-[1.02]"
          >
            <span>[ EXPLORE MY WORK ]</span>
            <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
          </button>
        </div>

      </Container>
    </section>
  );
}
