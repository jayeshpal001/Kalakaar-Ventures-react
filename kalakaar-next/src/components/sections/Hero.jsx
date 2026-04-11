"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// 🔥 IMPORT THE 3D COMPONENT WE JUST CREATED
// (Adjust the path if your Hero3D file is in a different folder)
import Hero3D from "./Hero3D";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      // Added a slight delay so the 3D canvas renders before text fades in
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section className="relative h-[100dvh] min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden px-6">
      {/* 💥 THE 3D INTERACTIVE BACKGROUND 💥 */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      {/* Gradient Overlay for Text Readability - Darker at top and bottom, clear in middle */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#050505] z-10 pointer-events-none"></div>

      {/* MAIN CONTENT WRAPPER
        pointer-events-none lets the user drag the 3D object "through" the text! 
      */}
      <motion.div
        className="max-w-4xl text-center z-20 w-full flex flex-col items-center pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/80 font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            Documenting Growth. Delivering Value.
          </span>
        </motion.div>

        {/* --- THE UPGRADED LOGO REVEAL --- */}
        <motion.div
          variants={itemVariants}
          className="relative w-64 h-32 md:w-[28rem] md:h-48 lg:w-[32rem] lg:h-56 mb-8"
        >
          <h1 className="sr-only">Kalakaar Ventures</h1>
          <Image
            src="/logo.png"
            alt="Kalakaar Ventures Master Logo"
            fill
            className="object-contain invert brightness-200 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            priority
          />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-12 drop-shadow-2xl font-light"
        >
          A storytelling-driven creative ecosystem. We document the journey and help you visually express your ideas through design, video, and digital creativity.
        </motion.p>

        {/* BUTTONS WRAPPER
          pointer-events-auto turns clicking back ON for the buttons 
        */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-5 pointer-events-auto">
          <a href="#portfolio" className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            View Portfolio
          </a>

          <a href="#services" className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 text-white group">
            Explore Services
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}