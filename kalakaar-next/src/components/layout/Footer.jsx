import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full py-12 mt-5 border-t border-white/10 flex flex-col items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="relative w-12 h-12 mb-6 opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
        <Image 
          src="/logo.png" 
          alt="Kalakaar Ventures" 
          fill 
          className="object-contain invert" 
        />
      </div>
      <p className="text-xs text-neutral-600 tracking-[0.3em] font-bold uppercase">
        © {new Date().getFullYear()} KALAKAAR VENTURES.
      </p>
      <p className="text-[10px] text-neutral-700 tracking-widest mt-2">
        CRAFTED WITH PRECISION
      </p>
    </footer>
  );
}