"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
      
      {/* Background vignette for text/logo readability */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

      <motion.div 
        className="max-w-4xl text-center z-10 w-full flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-accent font-semibold drop-shadow-md">
            Documenting Growth. Delivering Value.
          </span>
        </motion.div>

        {/* --- THE UPGRADED LOGO REVEAL --- */}
        <motion.div 
          variants={itemVariants} 
          className="relative w-64 h-32 md:w-[28rem] md:h-48 lg:w-[32rem] lg:h-56 mb-8"
        >
          {/* SR-ONLY tag ensures SEO and Screen Readers still read the H1 */}
          <h1 className="sr-only">Kalakaar Ventures</h1>
          <Image 
            src="/logo.png" 
            alt="Kalakaar Ventures Master Logo"
            fill
            className="object-contain invert brightness-200 drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]"
            priority
          />
        </motion.div>

        <motion.p 
          variants={itemVariants} 
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 drop-shadow-lg font-light"
        >
          A storytelling-driven creative ecosystem. We document the journey and help you visually express your ideas through design, video, and digital creativity.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#portfolio" className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            View Portfolio
          </a>
          
          {/* GLASSMORPHISM APPLIED TO SECONDARY BUTTON */}
          <a href="#services" className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 text-white group">
            Explore Services 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}