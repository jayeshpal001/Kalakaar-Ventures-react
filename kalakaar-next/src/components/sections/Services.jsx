"use client";

import { useGetServicesQuery } from "@/features/api/apiSlice";
import { motion } from "framer-motion";
import { Video, Camera, PenTool, Smartphone, ArrowRight, Briefcase, MonitorPlay, Code } from "lucide-react";
// 🔥 UPGRADE: Import RTK Query for Dynamic Services
 

// 🧠 THE SMART ICON ENGINE: Automatically picks icon based on Admin Title
const getSmartIcon = (title) => {
  if (!title) return <Briefcase className="w-8 h-8 text-white" />;
  const t = title.toLowerCase();
  
  if (t.includes("video") || t.includes("motion") || t.includes("film")) return <MonitorPlay className="w-8 h-8 text-white" />;
  if (t.includes("photo") || t.includes("camera") || t.includes("shoot")) return <Camera className="w-8 h-8 text-white" />;
  if (t.includes("design") || t.includes("brand") || t.includes("ui") || t.includes("ux")) return <PenTool className="w-8 h-8 text-white" />;
  if (t.includes("app") || t.includes("mobile") || t.includes("web") || t.includes("code")) return <Code className="w-8 h-8 text-white" />;
  
  return <Briefcase className="w-8 h-8 text-white" />; // Luxury Fallback Icon
};

export default function Services() {
  // 🔥 FETCH DATA DIRECTLY FROM DATABASE
  const { data: services = [], isLoading, isError } = useGetServicesQuery();

  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto w-full relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-md text-white">Creative Solutions</h2>
        <p className="text-neutral-300 max-w-2xl text-lg drop-shadow-md">
          Not just documenting the journey, but delivering value. Helping you visually express your ideas through evolving mastery.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LOADING STATE */}
        {isLoading && (
          <div className="col-span-full flex flex-col items-center justify-center py-20">
             <div className="w-12 h-12 border-4 border-neutral-700 border-t-white rounded-full animate-spin mb-4"></div>
             <p className="text-neutral-400 font-mono text-sm tracking-widest uppercase animate-pulse">Loading Services...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {isError && (
          <div className="col-span-full text-center py-10 border border-red-500/20 bg-red-500/10 rounded-2xl">
            <p className="text-red-400 font-medium">Unable to fetch services from the Kalakaar database.</p>
          </div>
        )}

        {/* DYNAMIC RENDER FROM MONGODB */}
        {!isLoading && !isError && services.length > 0 && services.map((service, index) => (
          <motion.div
            key={service._id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative p-8 rounded-2xl bg-neutral-900/30 backdrop-blur-md border border-white/10 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300 flex flex-col h-full"
          >
            <div className="mb-6 inline-flex p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 group-hover:scale-110 group-hover:bg-white/10 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 self-start">
              {getSmartIcon(service.title)}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-sm">{service.title}</h3>
            
            {/* Added flex-grow so the button stays at the bottom even if descriptions vary in length */}
            <p className="text-neutral-300 mb-8 leading-relaxed flex-grow">
              {service.description}
            </p>

            <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-accent transition-colors group/btn mt-auto">
              Work with me 
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        ))}

        {/* EMPTY STATE */}
        {!isLoading && !isError && services.length === 0 && (
           <div className="col-span-full text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/5">
             <p className="text-neutral-500">No active services deployed yet. Update from the Command Center.</p>
           </div>
        )}

      </div>
    </section>
  );
}