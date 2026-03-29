import { useGetProjectsQuery } from "../features/api/apiSlice";
import Hero from "../components/sections/Hero";
import Portfolio from "../components/sections/Portfolio";
import Services from "../components/sections/Services";
import Contact from "../components/sections/Contact";
import Footer from "../components/layout/Footer";

export default function Home() {
  const { data: liveProjects = [], isLoading, isError } = useGetProjectsQuery();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between w-full">
      {/* Hero loads instantly. No waiting. */}
      <Hero />
      
      {/* Pass the loading state to the Portfolio component */}
      <Portfolio initialProjects={liveProjects} isLoading={isLoading} isError={isError} />
      
      {/* These load instantly too */}
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}