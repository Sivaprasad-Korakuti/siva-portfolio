"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeBeads, setActiveBeads] = useState(1);

  // Monitor scroll percent to light up Mala Beads
  useEffect(() => {
    return scrollYProgress.onChange((val) => {
      // 6 thresholds for 6 beads representing completed sections
      if (val < 0.12) {
        setActiveBeads(1);
      } else if (val < 0.32) {
        setActiveBeads(2);
      } else if (val < 0.52) {
        setActiveBeads(3);
      } else if (val < 0.72) {
        setActiveBeads(4);
      } else if (val < 0.9) {
        setActiveBeads(5);
      } else {
        setActiveBeads(6);
      }
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none flex flex-col items-center">
      {/* Golden Thread Line */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-[#D4A5A5] via-[#E8A87C] to-[#A8C4B8] w-full"
        style={{ scaleX, transformOrigin: "left" }}
      />

      {/* Floating Mala Beads Container */}
      <div className="flex items-center space-x-2.5 mt-2 bg-[#FDF6F0]/80 backdrop-blur-sm border border-[#8B6F5C]/10 px-3.5 py-1.5 rounded-full shadow-[0_2px_10px_rgba(93,64,55,0.03)]">
        <span className="text-[7px] font-mono text-slate-400 uppercase tracking-widest mr-1">
          Mala:
        </span>
        {[1, 2, 3, 4, 5, 6].map((bead) => {
          const isLit = bead <= activeBeads;
          return (
            <div key={bead} className="relative">
              <motion.div
                animate={{
                  scale: isLit ? 1.08 : 0.9,
                  backgroundColor: isLit ? "#E8A87C" : "rgba(139, 111, 92, 0.25)",
                  boxShadow: isLit
                    ? "0 0 6px rgba(232, 168, 124, 0.7), 0 0 2px rgba(232, 168, 124, 0.4)"
                    : "none",
                }}
                transition={{ duration: 0.35 }}
                className="w-2 h-2 rounded-full border border-white/40"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
