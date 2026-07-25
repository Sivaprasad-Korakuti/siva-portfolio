"use client";

import React, { useState } from "react";
import { ArrowUpRight, ShieldAlert, Plus, X } from "lucide-react";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";
import RevealOnScroll from "../shared/RevealOnScroll";
import TextEffect from "../animations/TextEffect";
import { useChatStore, UserProject } from "../../store/chatStore";

export default function Projects() {
  const { plantedProjects, plantProject } = useChatStore();

  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [projName, setProjName] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projTech, setProjTech] = useState("");

  const staticProjects = [
    {
      name: "PharmoQR",
      desc: "Pharmacy inventory system featuring QR-based instant code scanning for checkout, custom database structures, and secure session authentications.",
      tech: ["React.js", "Node.js", "Express", "MongoDB", "JWT", "Mongoose"],
      status: "IN DEVELOPMENT",
      statusStyle: "text-[#C49B6C] border-[#C49B6C]/20 bg-[#FDF6F0]",
      github: "https://github.com/sivaprasad-korakuti/PharmoQR",
    },
    {
      name: "Tech Arms",
      desc: "Emergency response portal implementing persistent Web Socket connections for geospatial broadcasting and Gemini AI incident reporting.",
      tech: ["MongoDB", "Express", "React", "Node", "Socket.io", "Gemini AI", "Nodemailer"],
      status: "ACTIVE",
      statusStyle: "text-emerald-700 border-emerald-500/20 bg-emerald-50/50",
      github: "https://github.com/sivaprasad-korakuti",
    },
  ];

  const handlePasswordCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "SivAsha") {
      setIsPasswordOpen(false);
      setIsFormOpen(true);
      setPasswordError(false);
      setPasswordInput("");
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 500);
      setPasswordInput("");
    }
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim() || !projDesc.trim()) return;

    const newProject: UserProject = {
      projectName: projName,
      description: projDesc,
      techStack: projTech.split(",").map((t) => t.trim()).filter((t) => t !== ""),
      status: "ACTIVE",
    };

    plantProject(newProject);
    setIsFormOpen(false);
    setProjName("");
    setProjDesc("");
    setProjTech("");
  };

  return (
    <section id="projects" className="w-full bg-transparent py-20 md:py-28 border-b border-[#F5E6D3]/30 select-none">
      <Container>
        
        {/* Section Heading */}
        <SectionHeading 
          number="02" 
          title="SELECTED WORK" 
          subtitle="SAPLINGS_SHOWCASE" 
        />

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 pt-4">
          
          {/* Static Projects */}
          {staticProjects.map((p, idx) => (
            <RevealOnScroll key={p.name} animation="rotate" delay={idx * 0.1}>
              <div className="group border border-[#F5E6D3]/40 bg-[#F8F6F5]/40 rounded-2xl p-6.5 hover:border-[#C49B6C]/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(93,64,55,0.035)] flex flex-col justify-between min-h-[220px]">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-serif text-[#1A1A1A]">
                      <TextEffect text={p.name} effect="typewriter" delay={idx * 0.1} />
                    </h3>
                    <span className={`text-[8px] font-mono border px-2.5 py-0.5 rounded-full font-bold uppercase ${p.statusStyle}`}>
                      {p.status}
                    </span>
                  </div>
                  
                  <p className="text-xs text-[#6B6359] leading-relaxed font-sans select-text">
                    <TextEffect text={p.desc} effect="fade" delay={idx * 0.15} />
                  </p>
                </div>

                <div className="pt-4 space-y-4">
                  {/* Tech Stack tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t, tIdx) => (
                      <span key={t} className="text-[8px] font-mono text-[#6B6359] bg-[#F5E6D3] border border-[#F5E6D3] px-2 py-0.5 rounded">
                        <TextEffect text={t} effect="grow" delay={idx * 0.12 + tIdx * 0.03} />
                      </span>
                    ))}
                  </div>

                  {/* GitHub link */}
                  <div className="flex pt-1 border-t border-[#F5E6D3]/40 mt-1">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[9px] text-[#C49B6C] border border-[#C49B6C]/20 hover:border-[#C49B6C] px-3.5 py-1.5 rounded-full bg-white hover:bg-[#C49B6C] hover:text-white transition-all duration-300 font-mono flex items-center gap-1 cursor-pointer"
                    >
                      <span>[ OPEN_REPOSITORY ]</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}

          {/* Planted User Projects */}
          {plantedProjects.map((p, idx) => (
            <RevealOnScroll key={idx} animation="scale" delay={idx * 0.08}>
              <div className="group border border-emerald-500/10 bg-emerald-50/10 rounded-2xl p-6.5 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.02)] flex flex-col justify-between min-h-[220px]">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-serif text-[#1A1A1A]">
                      <TextEffect text={p.projectName} effect="typewriter" />
                    </h3>
                    <span className="text-[8px] font-mono border border-emerald-500/20 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold uppercase">
                      {p.status}
                    </span>
                  </div>
                  
                  <p className="text-xs text-[#6B6359] leading-relaxed font-sans select-text">
                    <TextEffect text={p.description} effect="fade" />
                  </p>
                </div>

                <div className="pt-4 space-y-4">
                  {p.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {p.techStack.map((t, tIdx) => (
                        <span key={t} className="text-[8px] font-mono text-[#6B6359] bg-[#F5E6D3] border border-[#F5E6D3] px-2 py-0.5 rounded">
                          <TextEffect text={t} effect="grow" delay={tIdx * 0.03} />
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          ))}

        </div>

        {/* Action Trigger Button */}
        <div className="w-full flex justify-center pt-10">
          {!isPasswordOpen && !isFormOpen && (
            <button
              onClick={() => setIsPasswordOpen(true)}
              className="flex items-center space-x-2 text-[10px] text-[#C49B6C] hover:text-[#1A1A1A] border border-dashed border-[#C49B6C]/40 hover:border-[#C49B6C] px-5 py-2.5 rounded-full bg-white hover:bg-[#F5E6D3]/15 transition-all duration-300 cursor-pointer font-mono"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>[ PLANT A NEW PROJECT ]</span>
            </button>
          )}

          {/* Password Validation Form */}
          {isPasswordOpen && (
            <form
              onSubmit={handlePasswordCheck}
              className={`flex items-center space-x-2 border border-[#C49B6C]/20 bg-slate-50 p-2.5 rounded-xl transition-all duration-300 ${
                passwordError ? "animate-[shake_0.5s_ease-in-out]" : ""
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-[#C49B6C]" />
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter gate password..."
                className="bg-transparent text-xs font-mono text-[#1A1A1A] placeholder-slate-400 focus:outline-none w-44"
              />
              <button
                type="submit"
                className="text-[9px] font-mono font-bold bg-[#C49B6C] text-white px-3 py-1.5 rounded hover:bg-[#1A1A1A] cursor-pointer"
              >
                VERIFY
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPasswordOpen(false);
                  setPasswordInput("");
                }}
                className="text-slate-400 hover:text-red-500 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Dynamic Plant Form Block */}
          {isFormOpen && (
            <form
              onSubmit={handleAddProjectSubmit}
              className="w-full max-w-md border border-emerald-500/20 bg-slate-50 p-5 rounded-2xl space-y-4 text-left shadow-lg"
            >
              <div className="flex justify-between items-center border-b border-[#F5E6D3]/60 pb-2">
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">
                  🌱 SEED_ENTRY: PLANT_NEW_SAPLING
                </span>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 font-mono text-xs text-[#5D4037]">
                <div className="space-y-1">
                  <label className="text-[9px] text-[#6B6359] uppercase tracking-wider font-bold">PROJECT_NAME:</label>
                  <input
                    type="text"
                    required
                    value={projName}
                    onChange={(e) => setProjName(e.target.value)}
                    placeholder="Enter project name..."
                    className="w-full bg-white border border-[#F5E6D3] rounded-lg px-3.5 py-2 text-xs focus:outline-none"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] text-[#6B6359] uppercase tracking-wider font-bold">DESCRIPTION:</label>
                  <textarea
                    required
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    placeholder="Describe your project..."
                    className="w-full bg-white border border-[#F5E6D3] rounded-lg px-3.5 py-2 text-xs focus:outline-none h-18 resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-[#6B6359] uppercase tracking-wider font-bold">TECH_STACK (comma separated):</label>
                  <input
                    type="text"
                    value={projTech}
                    onChange={(e) => setProjTech(e.target.value)}
                    placeholder="React, Express, AWS..."
                    className="w-full bg-white border border-[#F5E6D3] rounded-lg px-3.5 py-2 text-xs focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg cursor-pointer transition-all"
                >
                  PLANT SEED
                </button>
              </div>
            </form>
          )}

        </div>

      </Container>
    </section>
  );
}
