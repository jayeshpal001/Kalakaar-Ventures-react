"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, Fingerprint, AlertTriangle } from "lucide-react";

// Adjust path based on your folder structure (e.g., "../../features/api/apiSlice" or "@/features/api/apiSlice")
import { useLoginAdminMutation } from "../../features/api/apiSlice";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [loginAdmin, { isLoading, isError, error }] = useLoginAdminMutation();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to verify the Master Passcode
      const result = await loginAdmin({ password }).unwrap();

      // Securely lock the token in the browser
      sessionStorage.setItem("kalakaar_token", result.token);
      // Transporting to Command Center
      router.push("/admin");
    } catch (err) {
      console.error("Access Denied", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-6 relative overflow-hidden">

      {/* Aesthetic Background Elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-black/50 backdrop-blur-3xl p-10 rounded-[2rem] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
      >

        {/* Gateway Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out"></div>
            <Fingerprint className="w-8 h-8 text-neutral-300" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Restricted Area</h1>
          <p className="text-neutral-500 text-xs font-mono tracking-widest uppercase">Kalakaar Database Gateway</p>
        </div>

        {/* Security Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center justify-center pointer-events-none">
              <Lock className={`w-4 h-4 transition-colors duration-300 ${password ? "text-white" : "text-neutral-600"}`} />
            </div>
            <input
              type="password"
              placeholder="Enter Master Passcode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white tracking-[0.3em] font-mono focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all shadow-inner"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full bg-white text-black font-bold tracking-widest uppercase text-sm py-4 rounded-xl hover:bg-neutral-200 transition-all duration-300 disabled:opacity-50 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : "Initialize Override"}
            </span>
          </button>

          {/* Error Message Protocol */}
          {isError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-mono"
            >
              <AlertTriangle className="w-4 h-4" />
              {error?.data?.message || "Authentication Failed. Integrity Compromised."}
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}