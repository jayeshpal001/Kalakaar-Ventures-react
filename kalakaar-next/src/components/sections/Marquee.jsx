export default function Marquee() {
  // We duplicate the array to ensure the loop is seamless. 
  // When it hits the 50% mark, it instantly resets to 0% invisibly.
  const coreSkills = [
    "CINEMATIC EDITING", "✦", 
    "VFX & CGI", "✦", 
    "COLOR GRADING", "✦", 
    "BRAND STORYTELLING", "✦", 
    "MOTION GRAPHICS", "✦",
    "CINEMATIC EDITING", "✦", 
    "VFX & CGI", "✦", 
    "COLOR GRADING", "✦", 
    "BRAND STORYTELLING", "✦", 
    "MOTION GRAPHICS", "✦"
  ];

  return (
    <div className="w-full bg-neutral-900/40 backdrop-blur-md border-y border-white/10 py-6 overflow-hidden flex whitespace-nowrap relative z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      
      {/* Shadow Gradients to fade the edges (Cinematic Effect) */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20"></div>

      {/* The Moving Track */}
      <div className="flex w-max animate-marquee items-center cursor-default">
        {coreSkills.map((text, index) => (
          <span 
            key={index} 
            className={`text-3xl md:text-5xl font-black uppercase tracking-widest px-4 md:px-8 transition-colors duration-300 ${
              text === "✦" ? "text-accent drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "text-white/70 hover:text-white"
            }`}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}