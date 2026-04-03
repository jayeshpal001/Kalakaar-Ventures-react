import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full pt-5 pb-15 mt-5 border-t border-white/10 flex flex-col items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="relative w-25 h-25 md:w-33 md:h-33  opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
        <Image
          src="/logo.png" // Aapka main stacked logo
          alt="Kalakaar Ventures"
          fill
          className="object-contain invert brightness-200 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          priority
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