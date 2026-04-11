"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  Environment, 
  PresentationControls, 
  Sparkles,
  ContactShadows
} from "@react-three/drei";

// 🔥 THE ABSTRACT CORE OBJECT
function LiquidMetalKnot() {
  const meshRef = useRef();

  // Adds a continuous slow rotation to the object
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.1; // Slightly slower, more elegant rotation
    meshRef.current.rotation.x += delta * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      {/* Increased scale slightly so it looks better as a full-screen background */}
      <mesh ref={meshRef} scale={1.4}>
        {/* The Shape: A complex, elegant twisted knot */}
        <torusKnotGeometry args={[1, 0.35, 256, 64]} />
        
        {/* The Material: Upgraded Obsidian / Reflective Metal */}
        <meshPhysicalMaterial 
          color="#000000" // Pure black base for contrast
          metalness={1} 
          roughness={0.1} // Sharper reflections
          clearcoat={1} 
          clearcoatRoughness={0.1}
          envMapIntensity={2} // Makes the environment light reflect stronger
        />
      </mesh>
    </Float>
  );
}

// 🛡️ THE CANVAS WRAPPER
export default function Hero3D() {
  return (
    // 🔥 UPGRADE: 'absolute inset-0 w-full h-full' makes it a perfect background layer
    <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
      
      {/* Subtle fallback glow behind the 3D canvas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-white/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} // Camera pulled back slightly
        dpr={[1, 2]} // 🔥 UPGRADE: Pixel perfect rendering on Retina/4K displays
        className="w-full h-full z-10"
      >
        {/* Enhanced Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#4a4a4a" /> 
        
        {/* Interactive Wrapper */}
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0.3, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <LiquidMetalKnot />
          
          {/* Increased sparkle spread and count for background scale */}
          <Sparkles count={150} scale={8} size={1.5} speed={0.3} opacity={0.15} color="#ffffff" />
        </PresentationControls>

        {/* Realistic studio reflections */}
        <Environment preset="city" />
        
        {/* Pushed shadow down slightly to match new scale */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={15} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
}