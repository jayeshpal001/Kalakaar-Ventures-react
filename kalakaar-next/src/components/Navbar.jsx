"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/10 backdrop-blur-md border-b border-white/5"
        >
            <div className="flex items-center gap-3 cursor-pointer group">
                {/* KV Monogram for Mobile, Full Logo for Desktop */}
                {/* Updated Logo Container: Increased width/height and brightness */}
                {/* Premium Sleek Monogram Container */}
                <div className="relative w-10 h-10 md:w-20 md:h-12 overflow-hidden">
                    <Image
                        src="/kv-icon.png" // Aapka naya cropped logo
                        alt="KV Symbol"
                        fill
                        className="object-contain object-left invert opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                        priority
                    />
                </div>
            </div>

            {/* Optional: Add a subtle premium button or menu here */}
            <button className="text-xs font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors">
                Let's Talk
            </button>
        </motion.nav>
    );
}