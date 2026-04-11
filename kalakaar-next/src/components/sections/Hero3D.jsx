"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  Environment, 
  OrbitControls, // 🔥 UPGRADE: 100% Crash-Proof Interaction
  Sparkles,
  ContactShadows
} from "@react-three/drei";

// 🔥 THE ABSTRACT CORE OBJECT (UPGRADED)
function LiquidMetalKnot() {
  const meshRef = useRef();
  const wireRef = useRef();

  // Adds a continuous slow rotation to the objects
  useFrame((state, delta) => {
    // Solid Core Rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1; 
      meshRef.current.rotation.x += delta * 0.05;
    }
    // Holographic Wireframe Counter-Rotation (The WOW Factor)
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.15;
      wireRef.current.rotation.x -= delta * 0.08;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      
      {/* LAYER 1: The Core Obsidian Knot */}
      <mesh ref={meshRef} scale={1.4}>
        <torusKnotGeometry args={[1, 0.35, 256, 64]} />
        <meshPhysicalMaterial 
          color="#000000" 
          metalness={1} 
          roughness={0.1} 
          clearcoat={1} 
          clearcoatRoughness={0.1}
          envMapIntensity={2.5} // Boosted reflections
        />
      </mesh>

      {/* LAYER 2: The Holographic Energy Shell (WOW FACTOR) */}
      <mesh ref={wireRef} scale={1.42}> {/* Slightly larger than the core */}
        <torusKnotGeometry args={[1, 0.35, 120, 20]} />
        {/* Glowing thin wireframe that wraps the metal */}
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={0.06} 
        />
      </mesh>
      
    </Float>
  );
}

// 🛡️ THE CANVAS WRAPPER
export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
      
      {/* Subtle fallback glow behind the 3D canvas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-white/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      <Canvas 
        camera={{ position: [0, 0, 6.5], fov: 45 }} // Pulled back slightly for better framing
        dpr={[1, 1.5]} // Mobile memory crash protection
        gl={{ powerPreference: "high-performance", alpha: true, antialias: false }} 
        resize={{ scroll: false }} // Fixes URL bar scroll glitch
        className="w-full h-full z-10"
      >
        {/* Enhanced Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#4a4a4a" /> 
        
        {/* 🔥 FIX: Replaced buggy PresentationControls with stable OrbitControls */}
        <OrbitControls 
          enableZoom={false} // Prevents user from zooming in and breaking the layout
          enablePan={false} // Prevents dragging the object off-center
          enableDamping={true} // Super smooth friction when spinning
          dampingFactor={0.05}
          autoRotate={true} // Auto spins slowly when user isn't touching it
          autoRotateSpeed={0.5}
        />
        
        <LiquidMetalKnot />
        
        {/* Dual-layered sparkles for deep space/agency feel */}
        <Sparkles count={80} scale={10} size={1.5} speed={0.2} opacity={0.1} color="#ffffff" />
        <Sparkles count={50} scale={6} size={2.5} speed={0.4} opacity={0.2} color="#ffffff" />

        {/* Realistic studio reflections */}
        <Environment preset="city" />
        
        {/* Ground shadow */}
        <ContactShadows position={[0, -2.8, 0]} opacity={0.6} scale={15} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
}