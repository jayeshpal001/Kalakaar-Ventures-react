import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] text-white"
      initial={{ y: 0 }}
      // The exit animation: Slides up smoothly using custom bezier curves
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="overflow-hidden">
        <motion.h1 
          className="text-4xl md:text-6xl font-black tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          Kalakaar
        </motion.h1>
      </div>
      
      <motion.div 
        className="mt-8 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span className="text-sm font-mono text-neutral-500 tracking-widest mb-2">
          INITIATING SYSTEM V3.0
        </span>
        <div className="text-xl font-bold font-mono text-accent">
          {count}%
        </div>
      </motion.div>
    </motion.div>
  );
}