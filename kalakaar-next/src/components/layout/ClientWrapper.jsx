"use client"; // Next.js ko bata raha hai ki yeh browser par chalega

import { useEffect, useState } from "react";
import Lenis from 'lenis'; 
import { AnimatePresence } from "framer-motion";
import Preloader from "./Preloader"; 
import CustomCursor from "./CustomCursor"; 

export default function ClientWrapper({ children }) {
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      {/* <CustomCursor /> */}

      {/* Preloader Animation */}
      <AnimatePresence mode="wait">
        {isAppLoading && (
          <Preloader key="preloader" onComplete={() => setIsAppLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Website Content */}
      {children}
    </>
  );
}