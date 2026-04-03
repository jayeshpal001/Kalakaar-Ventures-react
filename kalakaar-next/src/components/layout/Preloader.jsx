"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // The mathematical counter: goes from 0 to 100 in exactly 1.5 seconds
    const duration = 1500; 
    const interval = 15; 
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentCount = 0;
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= 100) {
        setCount(100);
        clearInterval(timer);
        // Add a tiny 400ms pause at 100% for dramatic effect before lifting the curtain
        setTimeout(() => {
          onComplete();
        }, 400); 
      } else {
        setCount(Math.floor(currentCount));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      // The theater curtain: covers everything, sits on the highest z-index
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] text-white px-6"
      initial={{ y: 0 }}
      // The exit animation: Slides up smoothly using custom bezier curves
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* 1. THE LOGO REVEAL */}
      <div className="overflow-hidden mb-12">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="relative w-40 h-40 md:w-56 md:h-56"
        >
          <Image
            src="/logo.png" // Aapka main stacked logo
            alt="Kalakaar Ventures"
            fill
            className="object-contain invert brightness-200 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            priority
          />
        </motion.div>
      </div>
      
      {/* 2. THE PREMIUM STATS & PROGRESS BAR */}
      <motion.div 
        className="w-full max-w-xs flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex justify-between w-full items-end mb-3">
          <span className="text-xs font-mono text-neutral-500 tracking-[0.3em] uppercase">
            Crafting Vision
          </span>
          <span className="text-lg font-bold font-mono text-white leading-none">
            {count}%
          </span>
        </div>

        {/* Ultra-thin luxury progress line */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            initial={{ width: "0%" }}
            animate={{ width: `${count}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}