"use client";
import React, { useEffect, useRef } from "react";

interface Segment {
  x: number;
  y: number;
  angle: number;
  length: number;
  width: number;
}

interface Flower {
  x: number;
  y: number;
  angle: number;
  size: number;
  bloom: number; // 0 to 1
  petals: number;
  color: string;
  isDead: boolean;
}

interface Plant {
  x: number;
  y: number;
  segments: Segment[];
  growth: number; // 0 to 1
  speed: number;
  direction: number;
  branchAngle: number;
  maxLength: number;
  flowers: Flower[];
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  amplitude: number;
  frequency: number;
  phase: number;
}

export default function ZenBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    let mouseX: number | null = null;
    let mouseY: number | null = null;

    window.addEventListener("resize", handleResize);

    const isMobile = width < 768;
    const plantCount = isMobile ? 6 : 10;
    const maxSegs = isMobile ? 20 : 35;
    const plants: Plant[] = [];

    // Initialize vines growing from the bottom
    for (let i = 0; i < plantCount; i++) {
      const x = (width / (plantCount + 1)) * (i + 1) + (Math.random() - 0.5) * 40;
      const y = height * (0.85 + Math.random() * 0.15);
      plants.push({
        x,
        y,
        segments: [],
        growth: 0,
        speed: 0.0012 + Math.random() * 0.002,
        direction: -Math.PI / 2 + (Math.random() - 0.5) * 0.4,
        branchAngle: (Math.random() - 0.5) * 0.5,
        maxLength: 140 + Math.random() * 160,
        flowers: [],
      });
    }

    // Drifting incense smoke particles
    const smokeParticles: Particle[] = [];
    const maxParticles = isMobile ? 15 : 30;

    const createParticle = (initY = false): Particle => {
      const maxLife = Math.random() * 300 + 200;
      return {
        x: Math.random() * width,
        y: initY ? Math.random() * height : height + 20,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.35 + 0.25),
        size: Math.random() * 7 + 3,
        alpha: 0,
        life: 0,
        maxLife,
        amplitude: Math.random() * 0.7 + 0.3,
        frequency: Math.random() * 0.008 + 0.004,
        phase: Math.random() * Math.PI * 2,
      };
    };

    // Initialize initial batch of particles scattered across screen
    for (let i = 0; i < maxParticles; i++) {
      smokeParticles.push(createParticle(true));
    }

    const ripples: Ripple[] = [];

    const handleMouseClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: Math.random() * 100 + 70,
        alpha: 0.2,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = null;
      mouseY = null;
    };

    window.addEventListener("click", handleMouseClick);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const render = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Linear Background Gradient (Cream -> Warm Sand -> Clay)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#FDF6F0");
      bgGrad.addColorStop(0.5, "#F5E6D3");
      bgGrad.addColorStop(1, "#EDD4C0");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Sand Combed Waves
      ctx.strokeStyle = "rgba(232, 168, 124, 0.035)";
      ctx.lineWidth = 1;
      for (let yPos = height - 130; yPos < height + 60; yPos += 14) {
        ctx.beginPath();
        for (let xPos = 0; xPos < width; xPos += 10) {
          const yOffset = Math.sin(xPos * 0.015) * 4;
          if (xPos === 0) {
            ctx.moveTo(xPos, yPos + yOffset);
          } else {
            ctx.lineTo(xPos, yPos + yOffset);
          }
        }
        ctx.stroke();
      }

      // 3. Update & Draw click ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 1.1;
        r.alpha -= 0.003;
        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(232, 168, 124, ${r.alpha})`;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Second outer ring
        if (r.radius > 20) {
          ctx.strokeStyle = `rgba(232, 168, 124, ${r.alpha * 0.55})`;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius - 16, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 4. Update & Draw Incense Smoke Particles
      smokeParticles.forEach((p, idx) => {
        p.life++;
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.life * p.frequency + p.phase) * p.amplitude * 0.04;

        if (p.life < p.maxLife * 0.2) {
          p.alpha = (p.life / (p.maxLife * 0.2)) * 0.2;
        } else {
          p.alpha = (1 - (p.life - p.maxLife * 0.2) / (p.maxLife * 0.8)) * 0.2;
        }

        if (p.life >= p.maxLife || p.y < -30) {
          smokeParticles[idx] = createParticle();
          return;
        }

        ctx.beginPath();
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * (1 + p.life / p.maxLife));
        radGrad.addColorStop(0, `rgba(212, 165, 165, ${p.alpha})`);
        radGrad.addColorStop(1, "rgba(253, 246, 240, 0)");
        ctx.fillStyle = radGrad;
        ctx.arc(p.x, p.y, p.size * (1 + p.life / p.maxLife), 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Update & Draw Growing Plants & Blossoms
      plants.forEach((plant) => {
        let currentSpeed = plant.speed;
        if (mouseX !== null && mouseY !== null) {
          const dx = plant.x - mouseX;
          const dy = plant.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            currentSpeed *= 1.8 * (1 + (1 - dist / 180) * 1.5);
          }
        }

        if (plant.growth < 1) {
          plant.growth += currentSpeed;
          const targetSegCount = Math.floor(plant.growth * maxSegs);
          if (plant.segments.length < targetSegCount) {
            const last = plant.segments[plant.segments.length - 1];
            const angle = (last ? last.angle : plant.direction) + (Math.random() - 0.5) * 0.35;
            const length = 5 + Math.random() * 10;
            const newX = last ? last.x + Math.cos(last.angle) * last.length : plant.x;
            const newY = last ? last.y + Math.sin(last.angle) * last.length : plant.y;
            plant.segments.push({
              x: newX,
              y: newY,
              angle,
              length,
              width: 1.2 + Math.random() * 1.5,
            });
          }
        }

        const segments = plant.segments;
        for (let i = 0; i < segments.length; i++) {
          const seg = segments[i];
          const progress = i / segments.length;
          const alpha = 0.3 + progress * 0.7;
          const width = seg.width * (0.35 + 0.65 * (1 - progress * 0.45));
          const swayX = Math.sin(time * 0.007 + seg.y * 0.009) * 3.5 * progress;
          const drawX = seg.x + swayX;
          const drawY = seg.y;

          ctx.beginPath();
          ctx.moveTo(
            i === 0
              ? plant.x
              : segments[i - 1].x +
                  Math.sin(time * 0.007 + segments[i - 1].y * 0.009) *
                    3.5 *
                    ((i - 1) / segments.length),
            i === 0 ? plant.y : segments[i - 1].y
          );
          ctx.lineTo(drawX, drawY);
          ctx.strokeStyle = `rgba(122, 155, 110, ${alpha * 0.75})`;
          ctx.lineWidth = width;
          ctx.lineCap = "round";
          ctx.stroke();

          if (progress > 0.75) {
            ctx.shadowColor = "rgba(168, 196, 160, 0.45)";
            ctx.shadowBlur = 8;
            ctx.strokeStyle = `rgba(168, 196, 160, ${(progress - 0.75) * 4})`;
            ctx.lineWidth = width * 1.4;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }

          if (progress > 0.25 && i % 3 === 0) {
            const leafSize = 4 + Math.random() * 5;
            const leafAngle = seg.angle + (i % 2 === 0 ? 1 : -1) * 0.8;
            ctx.save();
            ctx.translate(drawX, drawY);
            ctx.rotate(leafAngle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(leafSize * 1.4, -leafSize * 0.4, leafSize * 2, 0);
            ctx.quadraticCurveTo(leafSize * 1.4, leafSize * 0.4, 0, 0);
            ctx.fillStyle = `rgba(122, 155, 110, ${0.45 + progress * 0.3})`;
            ctx.fill();

            ctx.strokeStyle = "rgba(168, 196, 184, 0.35)";
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(leafSize * 1.7, 0);
            ctx.stroke();
            ctx.restore();
          }
        }

        if (
          plant.growth > 0.65 &&
          segments.length > 5 &&
          plant.flowers.length < (isMobile ? 2 : 4) &&
          Math.random() < 0.0018
        ) {
          const randomIdx = Math.floor(Math.random() * segments.length);
          const randomSeg = segments[randomIdx];

          if (randomSeg) {
            plant.flowers.push({
              x: randomSeg.x,
              y: randomSeg.y,
              angle: Math.random() * Math.PI * 2,
              size: 6 + Math.random() * 8,
              bloom: 0,
              petals: 5 + Math.floor(Math.random() * 4),
              color: ["#E8A87C", "#D4A5A5", "#FFD4C2"][Math.floor(Math.random() * 3)],
              isDead: false,
            });
          }
        }

        plant.flowers.forEach((flower) => {
          flower.bloom = Math.min(1.0, flower.bloom + 0.004);
          const progress = flower.bloom;
          const currentSize = flower.size * progress;
          const swayX = Math.sin(time * 0.007 + flower.y * 0.009) * 3.5;
          const drawX = flower.x + swayX;
          const drawY = flower.y;

          const glowGrad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, currentSize * 2.2);
          glowGrad.addColorStop(0, `rgba(255, 212, 194, ${0.12 * progress})`);
          glowGrad.addColorStop(1, "rgba(255, 212, 194, 0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(drawX, drawY, currentSize * 2.2, 0, Math.PI * 2);
          ctx.fill();

          for (let p = 0; p < flower.petals; p++) {
            const angle = flower.angle + (p / flower.petals) * Math.PI * 2;
            ctx.save();
            ctx.translate(drawX, drawY);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(currentSize * 0.5, -currentSize * 0.7, currentSize * 1.3, 0);
            ctx.quadraticCurveTo(currentSize * 0.5, currentSize * 0.7, 0, 0);
            ctx.fillStyle = flower.color;
            ctx.globalAlpha = 0.75 * progress;
            ctx.fill();
            ctx.globalAlpha = 1.0;
            ctx.restore();
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, currentSize * 0.22, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 165, 165, ${0.85 * progress})`;
          ctx.fill();
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none"
    />
  );
}
