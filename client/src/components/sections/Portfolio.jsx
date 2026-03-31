import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt"; 
import { categories } from "../../data";

// Detects raw video files (.mp4, .webm, etc.)
const isRawVideo = (url) => {
  if (!url) return false;
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
};

// Detects YouTube links and extracts ID
const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

export default function Portfolio({ initialProjects = [], isLoading, isError }) {
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
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-md">Selected Work</h2>
          <p className="text-neutral-400 max-w-lg">Proof of execution. A visual gallery of storytelling, growth, and evolving mastery.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105" 
                  : "bg-neutral-900/40 backdrop-blur-md border border-white/10 text-neutral-400 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        
        {isLoading && (
          <div className="col-span-1 md:col-span-2 py-24 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-neutral-800/50 border-t-accent rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(255,255,255,0.1)]"></div>
            <p className="text-accent font-semibold animate-pulse">Establishing secure link to Kalakaar Database...</p>
          </div>
        )}

        {isError && (
          <div className="col-span-1 md:col-span-2 py-24 flex flex-col items-center justify-center text-red-500">
             <p className="bg-red-950/30 backdrop-blur-md border border-red-500/30 px-6 py-4 rounded-xl">Database connection failed. Please refresh the page.</p>
          </div>
        )}

        {!isLoading && !isError && (
          <AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="col-span-1 md:col-span-2 py-12 text-center"
              >
                <p className="text-neutral-400 text-lg bg-neutral-900/40 backdrop-blur-md border border-white/10 py-8 rounded-xl">More projects dropping in this category soon.</p>
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
                  className="relative"
                >
                  <Tilt 
                    tiltMaxAngleX={5} 
                    tiltMaxAngleY={5} 
                    glareEnable={true} 
                    glareMaxOpacity={0.15} 
                    glareColor="#ffffff"
                    glarePosition="all"
                    transitionSpeed={2000}
                    scale={1.02}
                    className="w-full h-full rounded-2xl overflow-hidden bg-neutral-900/40 backdrop-blur-md border border-white/10 shadow-2xl"
                  >
                    <div className="aspect-square md:aspect-video relative group">
                      
                      {ytId ? (
                        <iframe
                          // controls=1 add kiya hai, mute hata diya hai
                          src={`https://www.youtube.com/embed/${ytId}?controls=1&rel=0&modestbranding=1`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          frameBorder="0"
                        />
                      ) : isVideo ? (
                        <video
                          src={project.image}
                          controls // Yeh normal videos mein play/pause/audio layega
                          playsInline 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}

                      {/* Yahan 'pointer-events-none' zaroori hai taaki yeh overlay controls par click karne se na roke */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
                        <span className="text-accent text-sm font-semibold mb-2">{project.category}</span>
                        <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">{project.title}</h3>
                        <p className="text-neutral-300 text-sm line-clamp-2 drop-shadow-lg">{project.description}</p>
                      </div>

                    </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  );
}