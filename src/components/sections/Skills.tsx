"use client";

import React from "react";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";
import RevealOnScroll from "../shared/RevealOnScroll";
import TextEffect from "../animations/TextEffect";

export default function Skills() {
  const groups = [
    {
      category: "Cloud & Backend Infrastructure",
      tags: ["Java", "Spring Boot", "Node.js", "Express.js", "Docker Containerization", "AWS (Cloud Practitioner)"],
    },
    {
      category: "Frontend & Web Design",
      tags: ["React.js", "Tailwind CSS", "Next.js (App Router)", "HTML5", "CSS3 / Vanilla CSS", "JavaScript (ES6+)"],
    },
    {
      category: "Databases & Registries",
      tags: ["MongoDB", "MySQL", "Mongoose ODM"],
    },
    {
      category: "Utilities & Diagnostics",
      tags: ["Git & GitHub", "Postman API Diagnostics", "RESTful APIs", "VSCode Ecosystem"],
    },
  ];

  return (
    <section id="skills" className="w-full bg-transparent py-20 md:py-28 border-b border-[#F5E6D3]/40 select-none">
      <Container>
        
        {/* Section Heading */}
        <SectionHeading 
          number="03" 
          title="EXPERTISE" 
          subtitle="BRANCHES_SKILLS" 
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14 pt-4 select-text">
          {groups.map((group, idx) => (
            <RevealOnScroll key={group.category} animation="slide" direction="left" delay={idx * 0.1}>
              <div className="space-y-4">
                <h4 className="text-xs font-mono text-[#C49B6C] uppercase tracking-widest font-bold">
                  {group.category}
                </h4>
                
                <div className="flex flex-wrap gap-2.5">
                  {group.tags.map((t, tIdx) => (
                    <span
                      key={t}
                      className="text-xs font-sans text-[#1A1A1A] border border-[#6B6359]/15 hover:border-[#C49B6C] bg-white px-3.5 py-2 rounded-xl transition-all duration-300 shadow-[0_1px_3px_rgba(93,64,55,0.01)] hover:scale-[1.02] cursor-default"
                    >
                      <TextEffect text={t} effect="grow" delay={idx * 0.08 + tIdx * 0.02} />
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </Container>
    </section>
  );
}
