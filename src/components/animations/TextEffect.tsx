"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface TextEffectProps {
  text: string;
  effect?: "typewriter" | "fade" | "grow" | "zoom" | "dropdown" | "slide-left" | "slide-right";
  delay?: number;
  duration?: number;
  speed?: number; // stagger delay between letters/words
  className?: string;
  once?: boolean;
}

export default function TextEffect({
  text,
  effect = "fade",
  delay = 0,
  duration = 0.5,
  speed,
  className = "",
  once = true,
}: TextEffectProps) {
  
  // 1. Typewriter (Character by character stagger)
  if (effect === "typewriter") {
    const letters = Array.from(text);
    const containerVars = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: speed ?? 0.03,
          delayChildren: delay,
        },
      },
    };
    const itemVars: Variants = {
      hidden: { opacity: 0, y: 5 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 15 },
      },
    };

    return (
      <motion.span
        variants={containerVars}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-60px" }}
        className={`inline-block select-text ${className}`}
      >
        {letters.map((char, i) => (
          <motion.span key={i} variants={itemVars} className="inline-block whitespace-pre">
            {char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // 2. Word-by-word stagger animations
  const words = text.split(" ");
  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const getWordVariants = (): Variants => {
    switch (effect) {
      case "grow":
        return {
          hidden: { opacity: 0, scale: 0.75, y: 5 },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration, ease: [0.34, 1.56, 0.64, 1] }, // spring grow
          },
        };
      case "zoom":
        return {
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration, ease: "easeOut" },
          },
        };
      case "dropdown":
        return {
          hidden: { opacity: 0, y: -18 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, ease: [0.22, 1, 0.36, 1] },
          },
        };
      case "slide-left":
        return {
          hidden: { opacity: 0, x: -20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration, ease: "easeOut" },
          },
        };
      case "slide-right":
        return {
          hidden: { opacity: 0, x: 20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration, ease: "easeOut" },
          },
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0, y: 8 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, ease: "easeOut" },
          },
        };
    }
  };

  return (
    <motion.span
      variants={containerVars}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      className={`inline-block select-text ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={getWordVariants()}
          className="inline-block mr-[0.28em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
