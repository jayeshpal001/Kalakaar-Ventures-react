import { useGetProjectsQuery } from "../features/api/apiSlice";
import Hero from "../components/sections/Hero";
import Portfolio from "../components/sections/Portfolio";
import Services from "../components/sections/Services";
import Contact from "../components/sections/Contact";
import Footer from "../components/layout/Footer";

export default function Home() {
  const { data: liveProjects = [], isLoading, isError, error } = useGetProjectsQuery();

  if (isError) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background text-red-500">
        <h1 className="text-2xl font-bold mb-2">System Failure</h1>
        <p>{error?.data?.message || "Could not connect to the Express server."}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <h1 className="text-2xl font-bold text-accent animate-pulse">
          Initializing Kalakaar Environment...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between w-full">
      <Hero />
      <Portfolio initialProjects={liveProjects} />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}