"use client";

import React, { useState } from "react";
import { ArrowUpRight, ShieldAlert, Plus, X, Key, CheckCircle, Loader2 } from "lucide-react";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";
import RevealOnScroll from "../shared/RevealOnScroll";
import TextEffect from "../animations/TextEffect";
import { useChatStore, UserProject } from "../../store/chatStore";
import initialProjectsData from "../../data/userProjects.json";
import { commitProjectToGitHub } from "../../utils/githubCommit";

export default function Projects() {
  const { plantedProjects, plantProject } = useChatStore();

  // Password & Token state
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  
  const [isTokenOpen, setIsTokenOpen] = useState(false);
  const [githubToken, setGithubToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("siva_admin_pat") || "";
    }
    return "";
  });
  const [tokenInput, setTokenInput] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form Fields
  const [projName, setProjName] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projTech, setProjTech] = useState("");
  const [projGithub, setProjGithub] = useState("");
  const [projStatus, setProjStatus] = useState("ACTIVE");

  // Commit Feedback State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commitFeedback, setCommitFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  // Merge static initial data with dynamic user projects
  const allInitialProjects = initialProjectsData as Array<{
    projectName?: string;
    name?: string;
    description?: string;
    desc?: string;
    techStack?: string[];
    tech?: string[];
    status: string;
    github?: string;
  }>;

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "IN DEVELOPMENT":
        return "text-[#C49B6C] border-[#C49B6C]/20 bg-[#FDF6F0]";
      case "COMPLETED":
        return "text-blue-700 border-blue-500/20 bg-blue-50/50";
      case "STANDBY":
        return "text-slate-600 border-slate-400/20 bg-slate-100";
      case "ACTIVE":
      default:
        return "text-emerald-700 border-emerald-500/20 bg-emerald-50/50";
    }
  };

  const handlePasswordCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "SivAsha") {
      setIsPasswordOpen(false);
      setPasswordError(false);
      setPasswordInput("");
      
      // Check if GitHub token is saved
      const savedToken = localStorage.getItem("siva_admin_pat");
      if (savedToken) {
        setGithubToken(savedToken);
        setIsFormOpen(true);
      } else {
        setIsTokenOpen(true);
      }
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 500);
      setPasswordInput("");
    }
  };

  const handleTokenSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    const cleanToken = tokenInput.trim();
    localStorage.setItem("siva_admin_pat", cleanToken);
    setGithubToken(cleanToken);
    setIsTokenOpen(false);
    setTokenInput("");
    setIsFormOpen(true);
  };

  const handleAddProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim() || !projDesc.trim()) return;

    const newProject: UserProject = {
      projectName: projName.trim(),
      description: projDesc.trim(),
      techStack: projTech.split(",").map((t) => t.trim()).filter((t) => t !== ""),
      status: projStatus || "ACTIVE",
      github: projGithub.trim() ? projGithub.trim() : undefined,
    };

    setIsSubmitting(true);
    setCommitFeedback(null);

    // Auto-commit to GitHub if token is present
    if (githubToken) {
      const res = await commitProjectToGitHub(githubToken, newProject);
      if (res.success) {
        setCommitFeedback({ text: res.message, isError: false });
      } else {
        setCommitFeedback({ text: `Local save ok. GitHub Commit Notice: ${res.message}`, isError: true });
      }
    } else {
      setCommitFeedback({ text: "Saved to local browser. Token missing for GitHub commit.", isError: false });
    }

    // Always plant in local state for instant rendering
    plantProject(newProject);
    setIsSubmitting(false);

    // Reset inputs after 2.5 seconds
    setTimeout(() => {
      setIsFormOpen(false);
      setCommitFeedback(null);
      setProjName("");
      setProjDesc("");
      setProjTech("");
      setProjGithub("");
      setProjStatus("ACTIVE");
    }, 2500);
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
          
          {/* Initial Committed Projects */}
          {allInitialProjects.map((p, idx) => {
            const pName = p.projectName || p.name || "";
            const pDesc = p.description || p.desc || "";
            const pTech = p.techStack || p.tech || [];
            
            return (
              <RevealOnScroll key={pName} animation="rotate" delay={idx * 0.1}>
                <div className="group border border-[#F5E6D3]/40 bg-[#F8F6F5]/40 rounded-2xl p-6.5 hover:border-[#C49B6C]/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(93,64,55,0.035)] flex flex-col justify-between min-h-[220px]">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-serif text-[#1A1A1A]">
                        <TextEffect text={pName} effect="typewriter" delay={idx * 0.1} />
                      </h3>
                      <span className={`text-[8px] font-mono border px-2.5 py-0.5 rounded-full font-bold uppercase ${getStatusStyle(p.status)}`}>
                        {p.status}
                      </span>
                    </div>
                    
                    <p className="text-xs text-[#6B6359] leading-relaxed font-sans select-text">
                      <TextEffect text={pDesc} effect="fade" delay={idx * 0.15} />
                    </p>
                  </div>

                  <div className="pt-4 space-y-4">
                    {/* Tech Stack tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {pTech.map((t, tIdx) => (
                        <span key={t} className="text-[8px] font-mono text-[#6B6359] bg-[#F5E6D3] border border-[#F5E6D3] px-2 py-0.5 rounded">
                          <TextEffect text={t} effect="grow" delay={idx * 0.12 + tIdx * 0.03} />
                        </span>
                      ))}
                    </div>

                    {/* GitHub link */}
                    {p.github && (
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
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}

          {/* Planted User Projects (Avoiding duplicates with initial array) */}
          {plantedProjects
            .filter((p) => !allInitialProjects.some((init) => (init.projectName || init.name) === p.projectName))
            .map((p, idx) => (
              <RevealOnScroll key={idx} animation="scale" delay={idx * 0.08}>
                <div className="group border border-emerald-500/15 bg-emerald-50/10 rounded-2xl p-6.5 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.02)] flex flex-col justify-between min-h-[220px]">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-serif text-[#1A1A1A]">
                        <TextEffect text={p.projectName} effect="typewriter" />
                      </h3>
                      <span className={`text-[8px] font-mono border px-2.5 py-0.5 rounded-full font-bold uppercase ${getStatusStyle(p.status)}`}>
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

                    {/* Optional GitHub Repo Link */}
                    {p.github && (
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
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            ))}

        </div>

        {/* Action Trigger Button */}
        <div className="w-full flex justify-center pt-10">
          {!isPasswordOpen && !isTokenOpen && !isFormOpen && (
            <button
              onClick={() => setIsPasswordOpen(true)}
              className="flex items-center space-x-2 text-[10px] text-[#C49B6C] hover:text-[#1A1A1A] border border-dashed border-[#C49B6C]/40 hover:border-[#C49B6C] px-5 py-2.5 rounded-full bg-white hover:bg-[#F5E6D3]/15 transition-all duration-300 cursor-pointer font-mono"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>[ PLANT A NEW PROJECT ]</span>
            </button>
          )}

          {/* Step 1: Gate Password Validation Form */}
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

          {/* Step 2: GitHub PAT Token Setup (stored locally on admin's device) */}
          {isTokenOpen && (
            <form
              onSubmit={handleTokenSave}
              className="w-full max-w-md border border-[#C49B6C]/30 bg-slate-50 p-4.5 rounded-2xl space-y-3 font-mono text-xs text-[#5D4037] shadow-md"
            >
              <div className="flex justify-between items-center border-b border-[#F5E6D3]/60 pb-2">
                <div className="flex items-center space-x-1.5 text-xs text-[#C49B6C] font-bold">
                  <Key className="w-3.5 h-3.5" />
                  <span>GITHUB ADMIN COMMIT TOKEN</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTokenOpen(false)}
                  className="text-slate-400 hover:text-red-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] text-[#6B6359] leading-relaxed">
                Enter your GitHub Personal Access Token (PAT). It is stored <strong>ONLY</strong> locally in your browser memory to execute auto-commits directly to your repository!
              </p>

              <div className="space-y-1">
                <input
                  type="password"
                  required
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-white border border-[#F5E6D3] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#C49B6C]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#C49B6C] hover:bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-widest rounded-lg cursor-pointer transition-all"
              >
                SAVE TOKEN & CONTINUE
              </button>
            </form>
          )}

          {/* Step 3: Dynamic Plant Form Block with Auto-Commit */}
          {isFormOpen && (
            <form
              onSubmit={handleAddProjectSubmit}
              className="w-full max-w-md border border-emerald-500/20 bg-slate-50 p-5 rounded-2xl space-y-4 text-left shadow-lg font-mono text-xs text-[#5D4037]"
            >
              <div className="flex justify-between items-center border-b border-[#F5E6D3]/60 pb-2">
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">
                  🌱 SEED_ENTRY: PLANT_NEW_SAPLING
                </span>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="text-slate-400 hover:text-red-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-[#6B6359] uppercase tracking-wider font-bold">PROJECT_NAME:</label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={projName}
                    onChange={(e) => setProjName(e.target.value)}
                    placeholder="Enter project name..."
                    className="w-full bg-white border border-[#F5E6D3] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#C49B6C] disabled:opacity-50"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] text-[#6B6359] uppercase tracking-wider font-bold">DESCRIPTION:</label>
                  <textarea
                    required
                    disabled={isSubmitting}
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    placeholder="Describe your project..."
                    className="w-full bg-white border border-[#F5E6D3] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#C49B6C] h-18 resize-none disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-[#6B6359] uppercase tracking-wider font-bold">STAGE / STATUS:</label>
                  <select
                    disabled={isSubmitting}
                    value={projStatus}
                    onChange={(e) => setProjStatus(e.target.value)}
                    className="w-full bg-white border border-[#F5E6D3] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#C49B6C] cursor-pointer disabled:opacity-50"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="IN DEVELOPMENT">IN DEVELOPMENT</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="STANDBY">STANDBY</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-[#6B6359] uppercase tracking-wider font-bold">TECH_STACK (comma separated):</label>
                  <input
                    type="text"
                    disabled={isSubmitting}
                    value={projTech}
                    onChange={(e) => setProjTech(e.target.value)}
                    placeholder="React, Express, AWS..."
                    className="w-full bg-white border border-[#F5E6D3] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#C49B6C] disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-[#6B6359] uppercase tracking-wider font-bold">GITHUB_REPO_URL (optional):</label>
                  <input
                    type="url"
                    disabled={isSubmitting}
                    value={projGithub}
                    onChange={(e) => setProjGithub(e.target.value)}
                    placeholder="https://github.com/sivaprasad-korakuti/repo..."
                    className="w-full bg-white border border-[#F5E6D3] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#C49B6C] disabled:opacity-50"
                  />
                </div>

                {commitFeedback && (
                  <div className={`p-2.5 rounded-lg text-[10px] flex items-center space-x-1.5 ${commitFeedback.isError ? "bg-amber-50 text-amber-800 border border-amber-200" : "bg-emerald-50 text-emerald-800 border border-emerald-200"}`}>
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{commitFeedback.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-xs uppercase tracking-widest rounded-lg cursor-pointer transition-all mt-2 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>COMMITTING TO GITHUB REPO...</span>
                    </>
                  ) : (
                    <span>PLANT SEED & COMMIT TO GITHUB</span>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

      </Container>
    </section>
  );
}
