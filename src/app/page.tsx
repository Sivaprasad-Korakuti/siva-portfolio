"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Certifications from "../components/sections/Certifications";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";

import ScrollProgress from "../components/animations/ScrollProgress";
import ZenBackground from "../components/ZenBackground";

import { useChatStore } from "../store/chatStore";

export default function Home() {
  const {
    visitorName,
    stage,
    initializeJourney,
    clearChat,
    ringBell,
  } = useChatStore();

  const [inputName, setInputName] = useState("");
  const [systemTime, setSystemTime] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [shakeError, setShakeError] = useState(false);

  // Trigger entrance prompt fade-in
  useEffect(() => {
    if (stage === "entry") {
      const timer = setTimeout(() => {
        setShowPrompt(true);
        ringBell();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [stage, ringBell]);

  // Synchronize local clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) {
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
      return;
    }
    initializeJourney(inputName);
  };

  return (
    <div className="relative min-h-screen bg-transparent text-[#1A1A1A] font-sans antialiased selection:bg-[#C49B6C]/20 selection:text-[#1A1A1A] overflow-x-hidden flex flex-col justify-between">
      
      {/* Zen Sand Garden & Growing Vines background */}
      <ZenBackground />

      {/* Top Mala Bead Scroll Progress Indicator */}
      {stage === "garden" && <ScrollProgress />}

      <AnimatePresence mode="wait">
        
        {/* STAGE 1: THE ENTRY GATE (Silent Welcome Prompt) */}
        {stage === "entry" ? (
          <motion.div
            key="gate-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full flex flex-col items-center justify-center p-6 bg-transparent"
          >
            <div className="flex flex-col items-center space-y-8 max-w-sm w-full text-center">
              
              {/* Minimal Accent Symbol */}
              <motion.div 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                className="text-xs font-mono text-[#C49B6C] tracking-widest font-bold select-none"
              >
                [ SIVA.DEV // INITIATION ]
              </motion.div>

              <AnimatePresence>
                {showPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 w-full"
                  >
                    <p className="text-sm font-serif italic text-[#6B6359]">
                      "Enter your identity to unlock the design chronicles..."
                    </p>

                    <form
                      onSubmit={handleNameSubmit}
                      className={`space-y-4 transition-transform duration-300 ${
                        shakeError ? "animate-[shake_0.5s_ease-in-out]" : ""
                      }`}
                    >
                      <input
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder="Your name..."
                        className="w-full text-center bg-white border border-[#6B6359]/15 focus:border-[#C49B6C] rounded-xl px-5 py-3.5 text-xs text-[#1A1A1A] placeholder-slate-400 focus:outline-none transition-all font-mono shadow-[0_2px_10px_rgba(0,0,0,0.01)]"
                        maxLength={20}
                      />
                      <button
                        type="submit"
                        className="w-full py-3.5 text-xs font-bold uppercase tracking-widest text-[#C49B6C] hover:text-white border border-[#C49B6C]/30 hover:border-transparent bg-white hover:bg-[#C49B6C] rounded-xl transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.01]"
                      >
                        Enter Chronicles
                      </button>
                    </form>

                    {shakeError && (
                      <p className="text-[10px] text-red-550 font-bold uppercase tracking-wider font-mono">
                        Verification failed. Please input your name.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {showPrompt && (
              <div className="absolute bottom-6 text-[8px] text-[#6B6359] uppercase tracking-widest select-none font-mono">
                CLOCK: {systemTime}
              </div>
            )}
          </motion.div>
        ) : (

          /* STAGE 2: MAIN SCROLLABLE CHRONICLES PORTFOLIO */
          <motion.div
            key="workspace-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col min-h-screen bg-transparent"
          >
            {/* Top Fixed Header Specs Bar */}
            <header className="fixed top-0 left-0 right-0 border-b border-[#F5E6D3]/35 bg-white/40 backdrop-blur-md px-6 py-4 flex items-center justify-between select-none z-40">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C49B6C] animate-pulse" />
                  <span className="text-[10px] font-bold font-mono text-[#1A1A1A] tracking-wider">SIVA.DEV</span>
                </div>
                <span className="text-[9px] text-[#C49B6C]/30">|</span>
                <span className="text-[9px] text-[#6B6359] font-mono tracking-widest uppercase">
                  SEEKER: {visitorName}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-[9px] text-slate-500 font-mono">
                {/* Reset button inside header */}
                <button
                  onClick={clearChat}
                  title="Resets visitor session and redirects to entry page"
                  className="flex items-center space-x-1 border border-red-500/10 hover:border-red-500 text-red-650 hover:bg-red-500 hover:text-white px-2.5 py-1 rounded transition-all cursor-pointer font-bold"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>RESET</span>
                </button>
                <div className="hidden sm:block">CLOCK: {systemTime}</div>
              </div>
            </header>

            {/* Scrollable Layout Pages */}
            <div className="w-full pt-14">
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Certifications />
              <Contact />
              <Footer />
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `}</style>
      
    </div>
  );
}
