"use client";

import React from "react";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";
import RevealOnScroll from "../shared/RevealOnScroll";
import TextEffect from "../animations/TextEffect";
import SocialOrbitalWheel3D from "../SocialOrbitalWheel3D";

export default function Contact() {
  return (
    <section id="contact" className="w-full bg-transparent py-20 md:py-28 border-b border-[#F5E6D3]/40 select-none">
      <Container>
        
        {/* Section Heading */}
        <SectionHeading 
          number="05" 
          title="GET IN TOUCH" 
          subtitle="GARDEN_GATE_CONNECT" 
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pt-4 items-center">
          
          {/* Left Column: Direct Copy Text */}
          <div className="md:col-span-5 space-y-5 select-text">
            <RevealOnScroll animation="fade">
              <h3 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] leading-tight">
                <TextEffect text="Let's build something scalable together." effect="typewriter" />
              </h3>
            </RevealOnScroll>
            
            <RevealOnScroll animation="fade" delay={0.25}>
              <p className="text-xs md:text-sm text-[#6B6359] leading-relaxed font-sans max-w-sm">
                <TextEffect text="Whether you want to discuss cloud architecture, database systems, GATE preparation, or connect on social media—my gateway is always open." effect="fade" />
              </p>
            </RevealOnScroll>

            <RevealOnScroll animation="fade" delay={0.5}>
              <p className="text-[10px] font-mono text-[#C49B6C] tracking-widest uppercase font-bold">
                * Drag or swipe the orbits to spin the planets *
              </p>
            </RevealOnScroll>
          </div>

          {/* Right Column: Interactive 3D Oval Orbital Wheel */}
          <div className="md:col-span-7 flex justify-center items-center w-full overflow-visible">
            <RevealOnScroll animation="scale" delay={0.1} className="w-full flex justify-center">
              <SocialOrbitalWheel3D />
            </RevealOnScroll>
          </div>

        </div>

      </Container>
    </section>
  );
}
