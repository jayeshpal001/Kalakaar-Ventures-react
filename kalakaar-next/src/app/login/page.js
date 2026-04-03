"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLoginAdminMutation } from "../../features/api/apiSlice";
import { useRouter } from "next/navigation"; // NEXT.JS UPGRADE: Import useRouter

export default function Login() {
  const [password, setPassword] = useState("");
  const [loginAdmin, { isLoading, isError, error }] = useLoginAdminMutation();
  const router = useRouter(); // NEXT.JS UPGRADE: Initialize router

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt to log in
      const result = await loginAdmin({ password }).unwrap();
      
      // If successful, lock the token in the browser's local vault
      localStorage.setItem("kalakaar_token", result.token);
      
      // Instantly transport to the Command Center
      router.push("/admin"); // NEXT.JS UPGRADE: Use router.push()
    } catch (err) {
      console.error("Access Denied", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="w-full max-w-md bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Restricted Access</h1>
          <p className="text-muted text-sm">Kalakaar Ventures Command Center</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <input 
              type="password" 
              placeholder="Enter Master Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-4 text-center text-foreground focus:outline-none focus:border-accent tracking-widest"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-foreground text-background font-semibold py-4 rounded-xl hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Initialize Override"}
          </button>

          {isError && (
            <p className="text-center text-sm text-red-500 mt-2">
              {error?.data?.message || "Authentication Failed. Integrity Compromised."}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}