import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from 'lenis'; 
import { AnimatePresence } from "framer-motion"; // NEW IMPORT

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import CustomCursor from "./components/layout/CustomCursor"; 

// NEW IMPORT
import Preloader from "./components/layout/Preloader";

export default function App() {
  // Global state to track if the initial loading sequence is complete
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <CustomCursor />

      {/* AnimatePresence allows the Preloader to animate out smoothly before unmounting */}
      <AnimatePresence mode="wait">
        {isAppLoading && (
          <Preloader key="preloader" onComplete={() => setIsAppLoading(false)} />
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}