import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../../data"; // Note the relative path for Vite

export default function Portfolio({ initialProjects = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? initialProjects 
    : initialProjects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Selected Work</h2>
          <p className="text-muted max-w-lg">Proof of execution. A visual gallery of storytelling, growth, and evolving mastery.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeCategory === category 
                  ? "bg-foreground text-background" 
                  : "bg-neutral-900 text-muted hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="col-span-1 md:col-span-2 py-12 text-center"
            >
              <p className="text-muted text-lg">More projects dropping in this category soon.</p>
            </motion.div>
          )}

          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={project._id} 
              className="group relative aspect-square md:aspect-video rounded-xl overflow-hidden bg-neutral-900 cursor-pointer"
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-accent text-sm font-semibold mb-2">{project.category}</span>
                <h3 className="text-2xl font-bold text-foreground mb-1">{project.title}</h3>
                <p className="text-muted text-sm line-clamp-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}