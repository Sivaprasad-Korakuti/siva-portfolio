"use client";

import React, { useEffect, useRef } from "react";

export default function ThreeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const parentWidth = canvas.parentElement?.clientWidth;
    const parentHeight = canvas.parentElement?.clientHeight;

    let width = (parentWidth && parentWidth > 0) ? parentWidth : 160;
    let height = (parentHeight && parentHeight > 0) ? parentHeight : 160;

    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const pW = canvas.parentElement.clientWidth;
      const pH = canvas.parentElement.clientHeight;
      width = canvas.width = (pW && pW > 0) ? pW : 160;
      height = canvas.height = (pH && pH > 0) ? pH : 160;
    };

    window.addEventListener("resize", handleResize);

    const sphereRadius = Math.min(width, height) * 0.38;
    const rings = 8;
    const sectors = 10;
    const vertices: { x: number; y: number; z: number }[] = [];

    for (let r = 0; r < rings; r++) {
      const lat = (Math.PI * r) / (rings - 1) - Math.PI / 2;
      const cosLat = Math.cos(lat);
      const sinLat = Math.sin(lat);

      for (let s = 0; s < sectors; s++) {
        const lon = (2 * Math.PI * s) / sectors;
        const cosLon = Math.cos(lon);
        const sinLon = Math.sin(lon);

        vertices.push({
          x: sphereRadius * cosLat * cosLon,
          y: sphereRadius * sinLat,
          z: sphereRadius * cosLat * sinLon,
        });
      }
    }

    let rotationAngleX = 0.0006;
    let rotationAngleY = 0.0012;
    let currentX = 0;
    let currentY = 0;

    const rotateX = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x,
        y: y * cos - z * sin,
        z: y * sin + z * cos,
      };
    };

    const rotateY = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: x * cos + z * sin,
        y,
        z: -x * sin + z * cos,
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      currentX += rotationAngleX;
      currentY += rotationAngleY;

      const centerX = width / 2;
      const centerY = height / 2;
      const distance = 500;

      const projected = vertices.map((v) => {
        let rot = rotateX(v.x, v.y, v.z, currentX);
        rot = rotateY(rot.x, rot.y, rot.z, currentY);
        
        const scale = distance / (distance - rot.z);
        return {
          x: centerX + rot.x * scale,
          y: centerY + rot.y * scale,
          z: rot.z,
          scale,
        };
      });

      // Draw Latitudes
      ctx.lineWidth = 0.65;
      for (let r = 0; r < rings; r++) {
        ctx.beginPath();
        for (let s = 0; s < sectors; s++) {
          const idx = r * sectors + s;
          const nextIdx = r * sectors + ((s + 1) % sectors);
          
          const p1 = projected[idx];
          const p2 = projected[nextIdx];

          const avgZ = (p1.z + p2.z) / 2;
          const alpha = (avgZ + sphereRadius) / (2 * sphereRadius) * 0.25 + 0.05;

          // Warm amber color matches the minimal professional layout
          ctx.strokeStyle = `rgba(196, 155, 108, ${alpha * 0.35})`;

          if (s === 0) {
            ctx.moveTo(p1.x, p1.y);
          } else {
            ctx.lineTo(p1.x, p1.y);
          }
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();
      }

      // Draw Longitudes
      for (let s = 0; s < sectors; s++) {
        ctx.beginPath();
        for (let r = 0; r < rings; r++) {
          const idx = r * sectors + s;
          const nextRowIdx = ((r + 1) % rings) * sectors + s;

          const p1 = projected[idx];
          const p2 = projected[nextRowIdx];

          const avgZ = (p1.z + p2.z) / 2;
          const alpha = (avgZ + sphereRadius) / (2 * sphereRadius) * 0.25 + 0.05;

          // Sand/clay highlight color
          ctx.strokeStyle = `rgba(107, 83, 68, ${alpha * 0.25})`;

          if (r === 0) {
            ctx.moveTo(p1.x, p1.y);
          } else {
            ctx.lineTo(p1.x, p1.y);
          }
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full max-w-[200px] max-h-[200px] select-none pointer-events-none opacity-85"
    />
  );
}
