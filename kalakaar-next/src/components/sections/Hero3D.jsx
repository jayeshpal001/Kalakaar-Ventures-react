"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  Environment, 
  Sparkles,
  ContactShadows
} from "@react-three/drei";
import * as THREE from "three"; // 🔥 ADDED THREE.JS FOR MATH UTILS

// 🔥 THE ABSTRACT CORE OBJECT
function LiquidMetalKnot() {
  const meshRef = useRef();
  const wireRef = useRef();
  const groupRef = useRef(); // 🔥 NEW: Group ref for pointer tracking

  useFrame((state, delta) => {
    // 1. Continuous Auto-Rotation (Core & Wireframe)
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1; 
      meshRef.current.rotation.x += delta * 0.05;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.15;
      wireRef.current.rotation.x -= delta * 0.08;
    }

    // 2. 🔥 THE NEW WOW FACTOR: Apple-style Parallax Pointer Tracking
    if (groupRef.current) {
      // Get pointer position (-1 to 1) and calculate a subtle target angle
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;

      // Smoothly tilt (lerp) the entire group towards the pointer/thumb
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    // Wrap everything in the tracking group
    <group ref={groupRef}>
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
            envMapIntensity={2.5} 
          />
        </mesh>

        {/* LAYER 2: The Holographic Energy Shell */}
        <mesh ref={wireRef} scale={1.42}>
          <torusKnotGeometry args={[1, 0.35, 120, 20]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.06} />
        </mesh>
        
      </Float>
    </group>
  );
}

// 🛡️ THE CANVAS WRAPPER
export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      
      {/* Subtle fallback glow behind the 3D canvas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-white/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      <Canvas 
        camera={{ position: [0, 0, 6.5], fov: 45 }} 
        dpr={[1, 1.5]} 
        gl={{ powerPreference: "high-performance", alpha: true, antialias: false }} 
        resize={{ scroll: false }} 
        // 🔥 THE ULTIMATE FIX: This CSS prop tells the canvas NOT to block native mobile scrolling!
        style={{ touchAction: "auto" }}
        className="w-full h-full z-10"
      >
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#4a4a4a" /> 
        
        {/* Note: OrbitControls is intentionally REMOVED for perfect mobile scrolling */}
        <LiquidMetalKnot />
        
        <Sparkles count={80} scale={10} size={1.5} speed={0.2} opacity={0.1} color="#ffffff" />
        <Sparkles count={50} scale={6} size={2.5} speed={0.4} opacity={0.2} color="#ffffff" />

        <Environment preset="city" />
        <ContactShadows position={[0, -2.8, 0]} opacity={0.6} scale={15} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
}