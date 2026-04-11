"use client";

// UPGRADE: RTK Query imported to make it fully dynamic
import { useGetServicesQuery } from "../../features/api/apiSlice";

export default function Marquee() {
  // Fetching dynamic titles from your MongoDB database
  const { data: services = [], isLoading } = useGetServicesQuery();

  // Agar backend se data aane mein mili-seconds lag rahe hain, toh yeh chalega
  const fallbackSkills = ["CINEMATIC EDITING", "VFX & CGI", "COLOR GRADING", "BRAND STORYTELLING"];
  
  // Extracting only titles from DB, or using fallback
  const rawSkills = services.length > 0 
    ? services.map(s => s.title.toUpperCase()) 
    : fallbackSkills;

  // We duplicate the array multiple times so the screen is always filled
  const coreSkills = [...rawSkills, ...rawSkills, ...rawSkills, ...rawSkills, ...rawSkills];

  return (
    // THE FIX: A strict outer wrapper that prevents the rotated child from causing a scrollbar
    <div className="w-full overflow-hidden">
      
      {/* The actual Marquee element - Notice it still has the rotation and scale */}
      <div className="relative w-full bg-[#050505] border-y border-white/10 py-4 md:py-5 flex z-10 -rotate-2 scale-[1.05] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* Shadow Gradients to fade the edges (Cinematic Effect) */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none"></div>

        {/* The Moving Track (Added hover-pause utility) */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center cursor-crosshair">
          
          {coreSkills.map((text, index) => {
            // THE AESTHETIC UPGRADE: Every odd item gets a hollow outline style
            const isHollow = index % 2 !== 0;

            return (
              <div key={index} className="flex items-center group">
                <span 
                  //  TEXT SIZE REDUCED: text-5xl md:text-7xl changed to text-3xl md:text-5xl
                  className={`text-3xl md:text-5xl font-black uppercase tracking-tighter px-5 md:px-8 transition-all duration-500 ${
                    isHollow 
                      ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] md:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.4)] group-hover:[-webkit-text-stroke:1px_#ffffff] md:group-hover:[-webkit-text-stroke:1.5px_#ffffff] group-hover:text-white/10" 
                      : "text-white/80 group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                  }`}
                >
                  {text}
                </span>
                
                {/* Spinning Premium Separator (Scaled down to match new text size) */}
                <span className="text-white text-xl md:text-2xl opacity-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-[spin_4s_linear_infinite]">
                  ✦
                </span>
              </div>
            );
          })}
          
        </div>
      </div>
      
    </div>
  );
}