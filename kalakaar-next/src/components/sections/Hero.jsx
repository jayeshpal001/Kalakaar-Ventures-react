import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
      
      {/* Removed the solid radial gradient that was blocking the body texture. 
        Replaced with a subtle translucent vignette so the text remains readable.
      */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

      <motion.div 
        className="max-w-4xl text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <span className="text-sm md:text-base tracking-widest uppercase text-accent font-semibold drop-shadow-md">
            Documenting Growth. Delivering Value.
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants} 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]"
        >
          Kalakaar Ventures
        </motion.h1>

        <motion.p 
          variants={itemVariants} 
          className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 drop-shadow-lg"
        >
          A storytelling-driven creative ecosystem. We document the journey and help you visually express your ideas through design, video, and digital creativity.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#portfolio" className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            View Portfolio
          </a>
          
          {/* GLASSMORPHISM APPLIED TO SECONDARY BUTTON */}
          <a href="#services" className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 text-white">
            Explore Services <ArrowRight size={18} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}