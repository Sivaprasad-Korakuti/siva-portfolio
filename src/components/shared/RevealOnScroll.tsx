"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  animation?: "fade" | "slide" | "scale" | "rotate";
  delay?: number;
  duration?: number;
  direction?: "left" | "right" | "top" | "bottom";
  className?: string;
}

export default function RevealOnScroll({
  children,
  animation = "fade",
  delay = 0,
  duration = 0.6,
  direction = "bottom",
  className = "",
}: RevealProps) {
  
  const getVariants = (): Variants => {
    const slideOffsets = {
      left: { x: -30, y: 0 },
      right: { x: 30, y: 0 },
      top: { x: 0, y: -30 },
      bottom: { x: 0, y: 30 },
    };

    switch (animation) {
      case "slide":
        return {
          hidden: { opacity: 0, ...slideOffsets[direction] },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
          },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.94 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration, delay, ease: [0.34, 1.56, 0.64, 1] },
          },
        };
      case "rotate":
        return {
          hidden: { opacity: 0, rotateX: 12, y: 20 },
          visible: {
            opacity: 1,
            rotateX: 0,
            y: 0,
            transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
          },
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration, delay, ease: "easeOut" },
          },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={getVariants()}
      className={className}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
}
