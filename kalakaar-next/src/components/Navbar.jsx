"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // SMART SCROLL DETECTION
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Portfolio", href: "#portfolio" },
        { name: "Services", href: "#services" },
        { name: "Studio", href: "#about" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                // Dynamic Classes based on Scroll
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                    isScrolled 
                    ? "py-4 bg-[#050505]/70 backdrop-blur-2xl border-b border-white/10 shadow-2xl" 
                    : "py-6 bg-transparent"
                }`}
            >
                <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center relative">
                    
                    {/* LEFT: LOGO WITH RADIANT GLOW */}
                    <Link href="/" className="flex items-center gap-3 cursor-pointer group z-50">
                        {/* Overflow-visible is crucial here so the light rays don't get cut off */}
                        <div className="relative w-10 h-10 md:w-16 md:h-10 overflow-visible">
                            
                            {/* THE LIGHT SOURCE (Behind the logo) */}
                            <div className="absolute top-1/2 left-4 md:left-6 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/40 blur-[15px] group-hover:bg-white/60 group-hover:blur-[25px] transition-all duration-500 rounded-full z-0"></div>

                            <Image
                                src="/kv-icon.png " // Aapka logo
                                alt="KV Symbol"
                                fill
                                // Enhanced glowing classes: brightness-200 and stronger drop-shadow
                                className="object-contain object-left invert brightness-200 opacity-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,1)] transition-all duration-500 relative z-10"
                                priority
                            />
                        </div>
                    </Link>

                    {/* CENTER: DESKTOP FLOATING PILL MENU */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                className="px-5 py-2 text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* RIGHT: CTA & MOBILE TOGGLE */}
                    <div className="flex items-center gap-4 z-50">
                        <a 
                            href="#contact" 
                            className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 group"
                        >
                            Initiate 
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </a>

                        {/* Mobile Menu Button */}
                        <button 
                            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-3xl flex flex-col items-center justify-center pt-20"
                    >
                        <div className="flex flex-col items-center gap-8 w-full px-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link 
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-3xl font-black text-white/70 hover:text-white tracking-tight transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-8 w-full max-w-xs"
                            >
                                <a 
                                    href="#contact" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex justify-center items-center gap-2 w-full py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm"
                                >
                                    Start a Project <ArrowRight size={16} />
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}