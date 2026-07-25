"use client";

import React from "react";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";
import RevealOnScroll from "../shared/RevealOnScroll";
import TextEffect from "../animations/TextEffect";

export default function About() {
  const stats = [
    { label: "GATE SCORE", value: "383", sub: "AIR: 21,411" },
    { label: "B.TECH CGPA", value: "8.48", sub: "CSE at MITS" },
    { label: "DSA PROBLEMS", value: "109+", sub: "Solved on LeetCode" },
  ];

  return (
    <section id="about" className="w-full bg-transparent py-20 md:py-28 border-b border-[#F5E6D3]/40 select-none">
      <Container>
        
        {/* Section Heading */}
        <SectionHeading 
          number="01" 
          title="THE ROOTS" 
          subtitle="PROFILE_CHRONICLES" 
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pt-4">
          
          {/* Left Column: Bio paragraph */}
          <div className="md:col-span-7 space-y-5 text-[#6B6359] leading-relaxed font-sans text-sm md:text-base select-text">
            <RevealOnScroll animation="fade" delay={0.2}>
              <p>
                <TextEffect 
                  text="I am a Computer Science student at Madanapalle Institute of Technology & Science (MITS), passionate about cloud computing and software architecture." 
                  effect="fade" 
                />
              </p>
            </RevealOnScroll>
            
            <RevealOnScroll animation="fade" delay={0.4}>
              <p>
                <TextEffect 
                  text="With a GATE 2026 qualification and hands-on experience in full-stack development, I build software systems that prioritize scalability, reliability, and meaningful user interactions." 
                  effect="fade" 
                />
              </p>
            </RevealOnScroll>

            <RevealOnScroll animation="fade" delay={0.6}>
              <p className="text-xs font-mono text-[#C49B6C]">
                CURRENT_OBJECTIVE: GRADUATE_GATEWAY_SPECIALIST // CLOUD_DEVELOPER
              </p>
            </RevealOnScroll>
          </div>

          {/* Right Column: Stats indicators */}
          <div className="md:col-span-5 flex flex-col justify-center space-y-8 border-l border-[#C49B6C]/20 pl-6 md:pl-10">
            {stats.map((st, idx) => (
              <RevealOnScroll key={st.label} animation="slide" direction="right" delay={idx * 0.15}>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-[#6B6359] uppercase tracking-widest">
                    {st.label}
                  </div>
                  <div className="text-4xl font-serif text-[#1A1A1A]">
                    <TextEffect text={st.value} effect="grow" delay={idx * 0.15} />
                  </div>
                  <div className="text-[10px] font-mono text-[#C49B6C] uppercase tracking-wider">
                    {st.sub}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

        </div>

      </Container>
    </section>
  );
}
