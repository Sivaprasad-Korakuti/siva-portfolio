import React from "react";
import Container from "../shared/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-transparent py-12 select-none border-t border-[#F5E6D3]/20">
      <Container className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 text-[10px] font-mono text-[#6B6359] uppercase tracking-widest">
        <div>
          Engineered by Siva Prasad © {currentYear}
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available Worldwide</span>
        </div>
      </Container>
    </footer>
  );
}
