"use client";

import { useGetProjectsQuery } from "../features/api/apiSlice";
import Hero from "../components/sections/Hero";
import Marquee from "../components/sections/Marquee"; // NEW IMPORT
import Portfolio from "../components/sections/Portfolio";
import Services from "../components/sections/Services";
import Contact from "../components/sections/Contact";
import Footer from "../components/layout/Footer";

export default function Home() {
  const { data: liveProjects = [], isLoading, isError } = useGetProjectsQuery();

  return (
    // Ensured bg-transparent is here so the texture shows through!
    <div className="flex min-h-screen flex-col items-center justify-between w-full bg-transparent">
      
      <Hero />
      
      {/* INJECTED THE INFINITE MARQUEE HERE */}
      <Marquee />
      
      <Portfolio initialProjects={liveProjects} isLoading={isLoading} isError={isError} />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}