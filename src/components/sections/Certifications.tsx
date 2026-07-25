"use client";

import React from "react";
import { Award, ShieldCheck, Database, Cloud, BookOpen } from "lucide-react";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";
import RevealOnScroll from "../shared/RevealOnScroll";
import TextEffect from "../animations/TextEffect";

export default function Certifications() {
  const list = [
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      icon: <Cloud className="w-4 h-4 text-[#C49B6C]" />,
    },
    {
      title: "GATE 2026 Qualification",
      issuer: "IIT / Graduate Aptitude Test in Engineering",
      icon: <Award className="w-4 h-4 text-[#C49B6C]" />,
    },
    {
      title: "NPTEL Online Certifications (Privacy & Security / Big Data)",
      issuer: "IIT Kharagpur / Madras",
      icon: <BookOpen className="w-4 h-4 text-[#C49B6C]" />,
    },
    {
      title: "MongoDB Core Concepts",
      issuer: "MongoDB Academy",
      icon: <Database className="w-4 h-4 text-[#C49B6C]" />,
    },
    {
      title: "Cisco: JavaScript Essentials & Cybersecurity Fundamentals",
      issuer: "Cisco Networking Academy",
      icon: <ShieldCheck className="w-4 h-4 text-[#C49B6C]" />,
    },
  ];

  return (
    <section id="certifications" className="w-full bg-transparent py-20 md:py-28 border-b border-[#F5E6D3]/30 select-none">
      <Container>
        
        {/* Section Heading */}
        <SectionHeading 
          number="04" 
          title="CERTIFICATIONS" 
          subtitle="BLOSSOMS_KNOWLEDGE" 
        />

        <div className="space-y-6 pt-4 max-w-4xl select-text">
          {list.map((c, idx) => (
            <RevealOnScroll key={c.title} animation="slide" direction="bottom" delay={idx * 0.1}>
              <div className="flex items-center space-x-4 py-4 border-b border-[#F5E6D3]/40 last:border-b-0 hover:bg-[#F8F6F5]/40 transition-colors px-2.5 rounded-lg">
                <div className="p-2 bg-slate-50 border border-[#F5E6D3] rounded-lg">
                  {c.icon}
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-bold font-sans text-[#1A1A1A]">
                    <TextEffect text={c.title} effect="typewriter" delay={idx * 0.08} />
                  </h4>
                  <div className="text-[9px] font-mono text-[#6B6359] uppercase tracking-widest">
                    ISSUER: <TextEffect text={c.issuer} effect="grow" delay={idx * 0.12} />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </Container>
    </section>
  );
}
