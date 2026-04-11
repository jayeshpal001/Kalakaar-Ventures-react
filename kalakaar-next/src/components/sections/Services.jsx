"use client";

import { useGetServicesQuery } from "../../features/api/apiSlice";
import { motion } from "framer-motion";
import { Video, Camera, PenTool, Smartphone, ArrowRight, Briefcase, Monitor, Code, Sparkles, Target } from "lucide-react";

// THE SMART ICON ENGINE
const getSmartIcon = (title) => {
  if (!title) return <Briefcase className="w-8 h-8 text-white" />;
  const t = title.toLowerCase();
  
  if (t.includes("web") || t.includes("monitor")) return <Monitor className="w-8 h-8 text-white" />;
  if (t.includes("software") || t.includes("code") || t.includes("dev")) return <Code className="w-8 h-8 text-white" />;
  if (t.includes("app") || t.includes("mobile")) return <Smartphone className="w-8 h-8 text-white" />;
  
  if (t.includes("video") || t.includes("motion") || t.includes("film")) return <Video className="w-8 h-8 text-white" />;
  if (t.includes("photo") || t.includes("camera") || t.includes("shoot")) return <Camera className="w-8 h-8 text-white" />;
  if (t.includes("design") || t.includes("brand") || t.includes("ui") || t.includes("ux")) return <PenTool className="w-8 h-8 text-white" />;
  if (t.includes("social") || t.includes("marketing")) return <Smartphone className="w-8 h-8 text-white" />;
  
  return <Briefcase className="w-8 h-8 text-white" />;
};

//  THE SMART DATA PARSER
const parseServiceData = (rawDescription) => {
  if (!rawDescription) return { main: "", style: "", target: "" };
  
  const parts = rawDescription.split('|').map(s => s.trim());
  const main = parts[0] || "";
  
  const stylePart = parts.find(p => p.toLowerCase().startsWith('style:')) || "";
  const targetPart = parts.find(p => p.toLowerCase().startsWith('perfect for:')) || "";

  return {
    main,
    style: stylePart.replace(/style:/i, '').trim(),
    target: targetPart.replace(/perfect for:/i, '').trim()
  };
};

export default function Services() {
  const { data: services = [], isLoading, isError } = useGetServicesQuery();

  return (
    <section id="services" className="py-32 px-6 max-w-[1600px] mx-auto w-full relative">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-white/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-neutral-800/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* UPGRADED HEADER: Centered and Balanced */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-20 flex flex-col items-center text-center justify-center gap-4"
      >
        <div className="max-w-3xl flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-white drop-shadow-lg">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-white">Solutions.</span>
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-2xl">
            Not just documenting the journey, but delivering value. Helping you visually express your ideas through evolving mastery and scalable architectures.
          </p>
        </div>
      </motion.div>

      {/* THE 4-COLUMN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        
        {/* LOADING STATE */}
        {isLoading && (
          <div className="col-span-full flex flex-col items-center justify-center py-32">
             <div className="relative w-16 h-16">
               <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
             </div>
             <p className="mt-6 text-neutral-500 font-mono text-sm tracking-[0.2em] uppercase animate-pulse">Initializing Services...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {isError && (
          <div className="col-span-full text-center py-16 border border-red-500/10 bg-red-500/5 rounded-3xl backdrop-blur-md">
            <p className="text-red-400 font-medium">System Error: Unable to sync with the Kalakaar database.</p>
          </div>
        )}

        {/* DYNAMIC RENDER FROM MONGODB */}
        {!isLoading && !isError && services.length > 0 && services.map((service, index) => {
          
          const { main, style, target } = parseServiceData(service.description);

          return (
            <motion.div
              key={service._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 rounded-[2rem] bg-gradient-to-b from-neutral-900/40 to-black border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col h-full overflow-hidden"
            >
              {/* Subtle Hover Gradient Spotlight inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Icon Container */}
              <div className="relative z-10 mb-6 inline-flex p-4 rounded-2xl bg-black border border-white/10 group-hover:scale-110 group-hover:border-white/30 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 self-start">
                {getSmartIcon(service.title)}
              </div>
              
              <h3 className="relative z-10 text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{service.title}</h3>
              
              <p className="relative z-10 text-neutral-400 mb-6 leading-relaxed text-sm flex-grow">
                {main}
              </p>

              {/* DYNAMIC BADGES */}
              <div className="relative z-10 flex flex-col gap-3 mb-8">
                {style && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <Sparkles className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-0.5">Aesthetic / Style</span>
                      <span className="text-xs text-neutral-300 font-medium">{style}</span>
                    </div>
                  </div>
                )}
                
                {target && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <Target className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-0.5">Perfect For</span>
                      <span className="text-xs text-neutral-300 font-medium">{target}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <a href="#contact" className="relative z-10 inline-flex items-center justify-between w-full p-4 rounded-xl bg-white text-black text-sm font-bold hover:bg-neutral-200 transition-colors group/btn mt-auto">
                <span>Initiate Project</span>
                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            </motion.div>
          );
        })}

        {/* EMPTY STATE */}
        {!isLoading && !isError && services.length === 0 && (
           <div className="col-span-full flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-[3rem] bg-black/20">
             <Briefcase className="w-12 h-12 text-neutral-600 mb-4" />
             <p className="text-neutral-500 text-lg">No active services deployed yet.</p>
           </div>
        )}

      </div>
    </section>
  );
}