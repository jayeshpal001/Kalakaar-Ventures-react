import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt"; 
import { categories } from "../../data";

const isRawVideo = (url) => {
  if (!url) return false;
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
};

const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

// UPGRADED: Premium Play Icon with Pulse Effect
const PlayIcon = () => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
    <div className="relative flex items-center justify-center w-16 h-16 group-hover:scale-110 transition-transform duration-500">
      {/* Background Pulse */}
      <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-75"></div>
      {/* Main Glass Button */}
      <div className="relative w-14 h-14 bg-black/50 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <svg className="w-6 h-6 text-white ml-1 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
      </div>
    </div>
  </div>
);

export default function Portfolio({ initialProjects = [], isLoading, isError }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === "All" 
    ? initialProjects 
    : initialProjects.filter(project => project.category === activeCategory);

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [selectedProject]);

  return (
    <section id="portfolio" className="py-24 px-6 max-w-[1400px] mx-auto w-full relative">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-md">Selected Work</h2>
          <p className="text-neutral-400 max-w-lg text-lg">Proof of execution. A visual gallery of storytelling, growth, and evolving mastery.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeCategory === category 
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105" 
                  : "bg-neutral-900/60 backdrop-blur-md border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 hover:bg-neutral-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* --- REFINED MASONRY GRID --- */}
      {/* INCREASED COLUMNS: 3 on normal laptops (lg), 4 on large screens (xl) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 mt-8 space-y-6">
        
        {isLoading && (
           <div className="w-full py-24 flex flex-col items-center justify-center col-span-full">
             <div className="w-12 h-12 border-4 border-neutral-700 border-t-white rounded-full animate-spin mb-6"></div>
             <p className="text-white font-semibold animate-pulse tracking-widest uppercase text-sm">Syncing Database...</p>
           </div>
        )}

        {!isLoading && !isError && (
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const ytId = getYouTubeId(project.image);
              const isVideo = isRawVideo(project.image);
              const isMediaVideo = ytId || isVideo;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }} // Staggered entry animation
                  key={project._id} 
                  className="relative cursor-pointer break-inside-avoid" 
                  onClick={() => setSelectedProject(project)} 
                >
                  <Tilt 
                    tiltMaxAngleX={4} tiltMaxAngleY={4} glareEnable={true} glareMaxOpacity={0.15} glareColor="#ffffff" glarePosition="all" transitionSpeed={1500} scale={1.02}
                    className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 backdrop-blur-xl border border-white/5 shadow-2xl group"
                  >
                    <div className="relative w-full bg-black">
                      
                      {/* ADDED max-h-[450px] TO PREVENT GIANT VERTICAL IMAGES */}
                      {ytId ? (
                         <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={project.title} className="w-full h-auto max-h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                      ) : (
                        <img src={project.image} alt={project.title} className="w-full h-auto max-h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                      )}

                      {isMediaVideo && <PlayIcon />}

                      {/* Info Overlay */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                        <span className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-2">{project.category}</span>
                        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-xl leading-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{project.title}</h3>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* --- MODAL (POPUP) --- Kept same as previous update */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-white/10 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.9)] custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-10 p-3 bg-black/60 hover:bg-white/10 rounded-full backdrop-blur-md transition-all duration-300 border border-white/20 text-white hover:scale-110">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-2/3 bg-black relative min-h-[300px] md:min-h-[600px] flex items-center justify-center">
                  {getYouTubeId(selectedProject.image) ? (
                    <iframe src={`https://www.youtube.com/embed/${getYouTubeId(selectedProject.image)}?autoplay=1&controls=1&rel=0`} className="absolute inset-0 w-full h-full object-cover" allow="autoplay; encrypted-media" allowFullScreen frameBorder="0" />
                  ) : isRawVideo(selectedProject.image) ? (
                    <video src={selectedProject.image} controls autoPlay className="absolute inset-0 w-full h-full object-contain bg-black" />
                  ) : (
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-contain max-h-[80vh] bg-black" />
                  )}
                </div>

                <div className="w-full lg:w-1/3 p-8 md:p-10 flex flex-col justify-between bg-gradient-to-b from-neutral-900 to-black">
                  <div>
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-black bg-white rounded-full">{selectedProject.category}</span>
                    <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">{selectedProject.title}</h2>
                    <p className="text-neutral-400 text-lg leading-relaxed mb-8 font-light">{selectedProject.description || "Detailed narrative of the creative process, challenges faced, and the ultimate solution delivered."}</p>
                    
                    <div className="h-px w-full bg-white/10 mb-8"></div>
                  </div>
                  <div className="mt-auto">
                    <button className="w-full py-4 px-6 bg-white text-black font-bold text-lg rounded-xl hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">Explore Live Project</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}