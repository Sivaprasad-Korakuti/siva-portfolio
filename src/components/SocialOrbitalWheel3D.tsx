"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail } from "lucide-react";

interface OrbitNode {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  orbitRadiusX: number;
  orbitRadiusZ: number;
  speed: number;
  brandColor: string;
  hoverBorder: string;
}

export default function SocialOrbitalWheel3D() {
  const items: OrbitNode[] = [
    {
      id: "email",
      label: "Email",
      value: "ksivaprasad032@gmail.com",
      href: "mailto:ksivaprasad032@gmail.com",
      icon: <Mail className="w-4 h-4 text-[#EA4335]" />,
      orbitRadiusX: 75,
      orbitRadiusZ: 75, // Perfect circle radius
      speed: 0.009,
      brandColor: "#EA4335",
      hoverBorder: "hover:border-[#EA4335]/65",
    },
    {
      id: "github",
      label: "GitHub",
      value: "github.com/sivaprasad-korakuti",
      href: "https://github.com/sivaprasad-korakuti",
      icon: (
        <svg className="w-4 h-4 text-[#24292F] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      orbitRadiusX: 115,
      orbitRadiusZ: 115, // Perfect circle radius
      speed: 0.007,
      brandColor: "#24292F",
      hoverBorder: "hover:border-[#24292F]/65",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/k-siva-prasad-0089662ba",
      href: "https://www.linkedin.com/in/k-siva-prasad-0089662ba/",
      icon: (
        <svg className="w-4 h-4 text-[#0A66C2] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      orbitRadiusX: 155,
      orbitRadiusZ: 155, // Perfect circle radius
      speed: 0.005,
      brandColor: "#0A66C2",
      hoverBorder: "hover:border-[#0A66C2]/65",
    },
    {
      id: "instagram",
      label: "Instagram",
      value: "instagram.com/_iam_brat",
      href: "https://www.instagram.com/_iam_brat?igsh=ZmxmaXJiaXBnb2Zw",
      icon: (
        <svg className="w-4 h-4 text-[#E1306C] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      orbitRadiusX: 195,
      orbitRadiusZ: 195, // Perfect circle radius
      speed: 0.004,
      brandColor: "#E1306C",
      hoverBorder: "hover:border-[#E1306C]/65",
    },
    {
      id: "youtube",
      label: "YouTube",
      value: "youtube.com/@Travel_with_me_TheSivaDrives",
      href: "https://www.youtube.com/@Travel_with_me_TheSivaDrives",
      icon: (
        <svg className="w-4 h-4 text-[#FF0000] fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.163c-.272-.98-1.04-1.748-2.02-2.02C19.716 3.745 12 3.745 12 3.745s-7.715 0-9.478.398c-.98.272-1.748 1.04-2.02 2.02C0 7.925 0 12 0 12s0 4.075.402 5.837c.272.98 1.04 1.748 2.02 2.02 1.763.398 9.478.398 9.478.398s7.715 0 9.478-.398c.98-.272 1.748-1.04 2.02-2.02C24 16.075 24 12 24 12s0-4.075-.402-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      orbitRadiusX: 235,
      orbitRadiusZ: 235, // Perfect circle radius
      speed: 0.003,
      brandColor: "#FF0000",
      hoverBorder: "hover:border-[#FF0000]/65",
    },
    {
      id: "x",
      label: "X / Twitter",
      value: "x.com",
      href: "https://x.com",
      icon: (
        <svg className="w-4 h-4 text-[#1A1A1A] fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      orbitRadiusX: 275,
      orbitRadiusZ: 275, // Perfect circle radius
      speed: 0.002,
      brandColor: "#1A1A1A",
      hoverBorder: "hover:border-[#1A1A1A]/65",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [ticks, setTicks] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const velocity = useRef(0);
  const lastTime = useRef(0);

  const perspective = 400;

  // Animation Loop
  useEffect(() => {
    let animationId: number;

    const tick = () => {
      setTicks((t) => t + 1);

      if (!isDragging) {
        // Slow drag friction to decay drag offset adjustments
        velocity.current *= 0.95;
        setDragOffset((prev) => prev + velocity.current);
      }

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging]);

  // Mouse drag handlers to rotate system
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartOffset.current = dragOffset;
    velocity.current = 0;
    lastTime.current = performance.now();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    const deltaAngle = (deltaX / 160) * Math.PI;
    const nextOffset = dragStartOffset.current + deltaAngle;

    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (nextOffset - dragOffset) / (dt / 16.66);
    }
    lastTime.current = now;

    setDragOffset(nextOffset);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    dragStartOffset.current = dragOffset;
    velocity.current = 0;
    lastTime.current = performance.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartX.current;
    const deltaAngle = (deltaX / 160) * Math.PI;
    const nextOffset = dragStartOffset.current + deltaAngle;

    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (nextOffset - dragOffset) / (dt / 16.66);
    }
    lastTime.current = now;

    setDragOffset(nextOffset);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUpOrLeave}
      className="relative w-full max-w-lg h-[580px] select-none cursor-grab active:cursor-grabbing flex items-center justify-center"
    >
      {/* Central Glowing Sun Node */}
      <div 
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        className="absolute w-6 h-6 rounded-full bg-[#C49B6C] border border-white z-10 shadow-[0_0_12px_#C49B6C] pointer-events-none opacity-80 animate-pulse"
      />

      {/* Orbit pathways (dashed 3D perspective rings) */}
      {items.map((item) => (
        <div
          key={`path-${item.id}`}
          style={{
            width: `${item.orbitRadiusX * 2}px`,
            height: `${item.orbitRadiusZ * 2}px`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="absolute border border-[#C49B6C]/15 border-dashed rounded-full pointer-events-none -z-10"
        />
      ))}

      {/* Orbiting Planetary Nodes */}
      {items.map((item) => {
        // Planetary angle: cumulative tick motion + drag offset adjustment
        const angle = dragOffset + ticks * item.speed;

        // Position coordinates projected onto horizontal ellipse
        const x = Math.cos(angle) * item.orbitRadiusX;
        const z = Math.sin(angle) * item.orbitRadiusZ;

        // Projection math
        const scale = (perspective + z) / perspective;
        const opacity = 0.35 + (z + item.orbitRadiusZ) / (2 * item.orbitRadiusZ) * 0.65;
        const zIndex = Math.round(z) + 10;

        return (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${z}px), 0px) scale(${scale})`,
              opacity,
              zIndex,
            }}
            className={`absolute p-3 bg-white border border-[#F5E6D3] ${item.hoverBorder} rounded-full shadow-[0_4px_16px_rgba(93,64,55,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:scale-[1.05] transition-all duration-300 group flex items-center justify-center cursor-pointer`}
          >
            {/* Logo Sphere */}
            <div className="flex items-center justify-center p-1 font-mono">
              {item.icon}
            </div>

            {/* Hover Tooltip display */}
            <span className="absolute bottom-full mb-2 scale-0 group-hover:scale-100 whitespace-nowrap bg-[#1A1A1A] text-white text-[8px] font-mono px-2.5 py-1.5 rounded-lg border border-slate-800 transition-all duration-200 pointer-events-none flex flex-col items-start leading-tight shadow-md">
              <span 
                style={{ color: item.brandColor }}
                className="font-bold tracking-widest text-[7px] uppercase"
              >
                {item.label}
              </span>
              <span>{item.value}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
