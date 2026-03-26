import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../../data";

// 1. Detects raw video files (.mp4, .webm)
const isRawVideo = (url) => {
  if (!url) return false;
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
};

// 2. Detects YouTube links and extracts the unique 11-character Video ID
const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

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

          {filteredProjects.map((project) => {
            const ytId = getYouTubeId(project.image);
            const isVideo = isRawVideo(project.image);

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project._id} 
                className="group relative aspect-square md:aspect-video rounded-xl overflow-hidden bg-neutral-900 cursor-pointer"
              >
                
                {/* THE TRI-STATE MEDIA RENDERER */}
                {ytId ? (
                  // STATE 1: YouTube Embed (Autoplays silently, loops, no controls)
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40 pointer-events-none"
                    allow="autoplay; encrypted-media"
                    frameBorder="0"
                  />
                ) : isVideo ? (
                  // STATE 2: Raw Video (.mp4)
                  <video
                    src={project.image}
                    autoPlay
                    loop
                    muted
                    playsInline 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40"
                  />
                ) : (
                  // STATE 3: Standard Image
                  <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40"
                  />
                )}

                {/* Overlay Text */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <span className="text-accent text-sm font-semibold mb-2">{project.category}</span>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{project.title}</h3>
                  <p className="text-muted text-sm line-clamp-2">{project.description}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}