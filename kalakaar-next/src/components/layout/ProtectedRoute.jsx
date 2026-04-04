"use client"; // Sabse zaroori: yeh component sirf browser par chalega

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js ka apna router

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  // State to track if we are checking the token and if auth is valid
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the vault key exists in local storage (Client-side only)
    const token = sessionStorage.getItem("kalakaar_token");
    if (!token) {
      // If no token is found, redirect them back to the login page
      router.push("/login");
    } else {
      // Token exists, grant access
      setIsAuthenticated(true);
    }

    // Stop the loading state once the check is complete
    setIsChecking(false);
  }, [router]);

  // Handle the brief moment while Next.js checks the localStorage
  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-neutral-800 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="text-neutral-500 text-sm tracking-widest uppercase font-semibold animate-pulse">Verifying Credentials...</p>
      </div>
    );
  }

  // Prevent rendering children if auth failed (while redirecting)
  if (!isAuthenticated) {
    return null;
  }

  // If the token exists and is valid, render the Command Center
  return <>{children}</>;
}