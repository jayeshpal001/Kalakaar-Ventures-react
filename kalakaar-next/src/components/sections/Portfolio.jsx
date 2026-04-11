"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useGetProjectsQuery, useGetCategoriesQuery } from "../../features/api/apiSlice"; 

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

const PlayIcon = () => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
    <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 group-hover:scale-110 transition-transform duration-500">
      <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-75"></div>
      <div className="relative w-12 h-12 md:w-14 md:h-14 bg-black/40 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <svg className="w-5 h-5 md:w-6 md:h-6 text-white ml-1 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
      </div>
    </div>
  </div>
);

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [page, setPage] = useState(1);
  const [accumulatedProjects, setAccumulatedProjects] = useState([]);

  const { data: dbCategories = [] } = useGetCategoriesQuery();
  const dynamicCategories = ["All", ...dbCategories.map(cat => cat.name)];

  const { data, isLoading, isFetching, isError } = useGetProjectsQuery({
    page,
    limit: 8,
    category: activeCategory
  });

  useEffect(() => {
    setPage(1);
    setAccumulatedProjects([]);
  }, [activeCategory]);

  useEffect(() => {
    if (data?.projects) {
      if (page === 1) {
        setAccumulatedProjects(data.projects); 
      } else {
        setAccumulatedProjects((prev) => {
          const newProjects = data.projects.filter(
            (p) => !prev.some((existing) => existing._id === p._id)
          );
          return [...prev, ...newProjects]; 
        });
      }
    }
  }, [data, page]);

  const hasMore = data?.pagination?.hasMore || false;

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [selectedProject]);

  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1500); 
    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative w-32 h-32 md:w-48 md:h-48 animate-pulse"
        >
          <Image src="/logo.png" alt="Loading Kalakaar" fill className="object-contain invert opacity-80" />
        </motion.div>
      </div>
    );
  }

  return (
    <section id="portfolio" className="py-24 px-4 md:px-6 max-w-[1600px] mx-auto w-full relative">

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-white drop-shadow-md">Selected Work</h2>
          <p className="text-neutral-400 text-base md:text-lg">Proof of execution. A visual gallery of storytelling, growth, and evolving mastery.</p>
        </div>

        {/* Horizontal Category Scroll for Mobile */}
        <div className="flex overflow-x-auto pb-2 md:pb-0 md:flex-wrap gap-2 md:gap-3 w-full md:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {dynamicCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 flex-shrink-0 ${activeCategory === category
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  : "bg-neutral-900/60 backdrop-blur-md border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 hover:bg-neutral-800"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* --- MASONRY GRID WRAPPER --- */}
      <div className="relative">
        <div className={`columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 transition-all duration-700 ${hasMore ? 'pb-32' : ''}`}>

          {isLoading && page === 1 && (
            <div className="w-full py-24 flex flex-col items-center justify-center col-span-full break-inside-avoid">
              <div className="w-10 h-10 border-4 border-neutral-800 border-t-white rounded-full animate-spin mb-4"></div>
              <p className="text-neutral-400 font-mono tracking-widest uppercase text-xs">Syncing Database...</p>
            </div>
          )}

          {isError && (
             <div className="w-full py-12 flex items-center justify-center col-span-full break-inside-avoid">
               <p className="text-red-400 font-medium bg-red-500/10 px-6 py-3 rounded-xl border border-red-500/20">System Error: Failed to connect to Kalakaar database.</p>
             </div>
          )}

          {(!isLoading || page > 1) && !isError && (
            <AnimatePresence mode="popLayout">
              {accumulatedProjects.map((project, index) => {
                const ytId = getYouTubeId(project.image);
                const isVideo = isRawVideo(project.image);
                const isMediaVideo = ytId || isVideo;
                const imgSrc = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : project.image;

                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
                    whileHover={{ y: -8, scale: 1.02 }}
                    key={project._id || index}
                    className="relative cursor-pointer group rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-white/20 transition-all duration-500 break-inside-avoid mb-4 md:mb-6"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative w-full bg-[#050505] flex justify-center items-center overflow-hidden">
                      <Image
                        src={imgSrc}
                        alt={project.title}
                        width={600}
                        height={450}
                        unoptimized={imgSrc.includes("i4utravels.com") || imgSrc.includes("tripadvisor")} 
                        // 🔥 THE MAGIC FIX: Fixed 260px & object-contain on Mobile | Auto-height & object-cover on Desktop
                        className="w-full h-[260px] md:[height:auto] object-contain md:object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        priority={index < 4}
                      />

                      {isMediaVideo && <PlayIcon />}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"></div>

                      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none opacity-0 group-hover:opacity-100">
                        <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-1.5">{project.category}</span>
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight drop-shadow-lg">{project.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {/* --- EXPLORE MORE BUTTON --- */}
        {hasMore && !isError && (
          <div className="absolute bottom-0 left-0 w-full pt-48 pb-4 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent flex justify-center items-end pointer-events-none">
            <button
              onClick={() => setPage(prev => prev + 1)}
              disabled={isFetching}
              className="pointer-events-auto px-8 py-3.5 bg-white text-black rounded-full font-bold tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isFetching && page > 1 ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div> Loading...
                </div>
              ) : "Explore More"}
              {!isFetching && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              )}
            </button>
          </div>
        )}
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center md:p-8 bg-[#050505]/95 backdrop-blur-2xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="relative w-full h-[100dvh] md:h-auto md:max-h-[90vh] md:max-w-6xl overflow-y-auto bg-black md:bg-neutral-950 md:border border-white/10 md:rounded-[2rem] shadow-2xl flex flex-col lg:flex-row custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedProject(null)} className="fixed md:absolute top-4 right-4 z-50 p-3 bg-black/60 hover:bg-white/10 rounded-full backdrop-blur-md transition-all duration-300 border border-white/10 text-white hover:scale-110">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <div className="w-full lg:w-[65%] bg-black relative aspect-[4/3] md:aspect-auto md:min-h-[600px] flex items-center justify-center overflow-hidden">
                {getYouTubeId(selectedProject.image) ? (
                  <iframe src={`https://www.youtube.com/embed/${getYouTubeId(selectedProject.image)}?autoplay=1&controls=1&rel=0`} className="absolute inset-0 w-full h-full object-cover" allow="autoplay; encrypted-media" allowFullScreen frameBorder="0" />
                ) : isRawVideo(selectedProject.image) ? (
                  <video src={selectedProject.image} controls autoPlay playsInline className="absolute inset-0 w-full h-full object-contain bg-black" />
                ) : (
                  <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-contain md:object-cover bg-black" />
                )}
              </div>

              <div className="w-full lg:w-[35%] p-6 md:p-10 flex flex-col bg-gradient-to-b from-neutral-900 to-black min-h-[50vh] md:min-h-0">
                <div className="flex-grow">
                  <span className="inline-block px-3 py-1 mb-4 md:mb-6 text-[10px] md:text-xs font-bold tracking-[0.2em] text-black bg-white rounded-full">{selectedProject.category}</span>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{selectedProject.title}</h2>
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">{selectedProject.description || "Detailed narrative of the creative process, challenges faced, and the ultimate solution delivered."}</p>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <button className="w-full py-4 px-6 bg-white text-black font-bold text-sm md:text-lg rounded-xl hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">Explore Live Project</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}