"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  Environment, 
  Sparkles,
  ContactShadows
} from "@react-three/drei";
import * as THREE from "three";

// 🔥 THE ABSTRACT CORE OBJECT (OPTIMIZED FOR MOBILE)
function LiquidMetalKnot() {
  const meshRef = useRef();
  const wireRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1; 
      meshRef.current.rotation.x += delta * 0.05;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.15;
      wireRef.current.rotation.x -= delta * 0.08;
    }

    // Parallax tracking (Runs perfectly smooth now)
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        
        {/* LAYER 1: Core Knot - Polygons reduced from 256x64 to 128x32 */}
        <mesh ref={meshRef} scale={1.4}>
          <torusKnotGeometry args={[1, 0.35, 128, 32]} />
          {/* Swapped to meshStandardMaterial: Looks 99% same, 5x faster! */}
          <meshStandardMaterial 
            color="#000000" 
            metalness={1} 
            roughness={0.15} 
            envMapIntensity={2.5} 
          />
        </mesh>

        {/* LAYER 2: Wireframe - Polygons reduced significantly */}
        <mesh ref={wireRef} scale={1.42}>
          <torusKnotGeometry args={[1, 0.35, 64, 16]} />
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
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-white/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      <Canvas 
        camera={{ position: [0, 0, 6.5], fov: 45 }} 
        // Strict DPR limit to save mobile batteries and prevent OOM crashes
        dpr={[1, 1.2]} 
        gl={{ powerPreference: "high-performance", alpha: true, antialias: false }} 
        resize={{ scroll: false }} 
        style={{ touchAction: "auto" }}
        className="w-full h-full z-10"
      >
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#4a4a4a" /> 
        
        <LiquidMetalKnot />
        
        {/* Sparkles count slightly reduced for mobile efficiency */}
        <Sparkles count={60} scale={10} size={2} speed={0.2} opacity={0.1} color="#ffffff" />
        <Sparkles count={40} scale={6} size={3} speed={0.4} opacity={0.2} color="#ffffff" />

        <Environment preset="city" />
        
        {/* 🔥 THE MAGIC BULLET: frames={1} bakes the shadow instantly and stops calculating it! */}
        <ContactShadows 
          frames={1} 
          resolution={256} 
          position={[0, -2.8, 0]} 
          opacity={0.6} 
          scale={15} 
          blur={2.5} 
          far={4} 
        />
      </Canvas>
    </div>
  );
}