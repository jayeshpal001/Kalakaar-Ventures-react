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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 via-background to-background -z-10"></div>

      <motion.div 
        className="max-w-4xl text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <span className="text-sm md:text-base tracking-widest uppercase text-muted font-medium">
            Documenting Growth. Delivering Value.
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants} 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-foreground"
        >
          Kalakaar Ventures
        </motion.h1>

        <motion.p 
          variants={itemVariants} 
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10"
        >
          A storytelling-driven creative ecosystem. We document the journey and help you visually express your ideas through design, video, and digital creativity.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#portfolio" className="flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300">
            View Portfolio
          </a>
          <a href="#services" className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold border border-neutral-800 hover:bg-neutral-900 transition-colors duration-300">
            Explore Services <ArrowRight size={18} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}   