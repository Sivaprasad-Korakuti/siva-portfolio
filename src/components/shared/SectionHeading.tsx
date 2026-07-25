import React from "react";
import TextEffect from "../animations/TextEffect";

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ number, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="space-y-2 mb-10 select-none">
      <div className="flex items-baseline space-x-2 text-[10px] font-mono text-[#C49B6C] uppercase tracking-widest font-bold">
        <span>{number}</span>
        <span>//</span>
        <TextEffect text="SECTION_JOURNEY" effect="grow" delay={0.1} />
      </div>
      
      <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] tracking-wide">
        <TextEffect text={title} effect="typewriter" delay={0.2} />
      </h2>
      
      {subtitle && (
        <p className="text-xs font-mono text-[#6B6359] uppercase tracking-widest">
          <TextEffect text={subtitle} effect="fade" delay={0.4} />
        </p>
      )}
      
      <div className="w-12 h-[1px] bg-[#C49B6C]/40 pt-1" />
    </div>
  );
}
