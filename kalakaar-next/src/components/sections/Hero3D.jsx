"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Points, 
  PointMaterial, 
  Preload,
  ContactShadows,
  OrbitControls
} from "@react-three/drei";
import * as THREE from "three";

// 🔥 THE NEURAL CLOUD COMPONENT
// A mesmerizing, stable point cloud that creates a digital universe vibe
function NeuralCloud(props) {
  const ref = useRef();
  
  // Create a sphere of 4000 points dynamically
  const [positions, colors] = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Create a spherical distribution
      const r = 2.5 + Math.random() * 1.5; // Radius
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions.set([x, y, z], i * 3);

      // Mix of Agency Colors (White, Light Gray, subtle accent)
      const mix = Math.random();
      const color = new THREE.Color(mix > 0.8 ? '#ffffff' : mix > 0.4 ? '#888888' : '#333333');
      colors.set([color.r, color.g, color.b], i * 3);
    }
    return [positions, colors];
  }, []);

  // Smooth, infinite rotation that doesn't break
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false} {...props}>
        {/* Glowing Points Material */}
        <PointMaterial
          transparent
          vertexColors
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// 🛡️ THE CANVAS WRAPPER
export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      
      {/* Background Deep Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-white/5 blur-[150px] rounded-full -z-10 pointer-events-none"></div>

      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        // Optimized for stability and performance on all devices
        dpr={[1, 1.5]} 
        gl={{ powerPreference: "high-performance", alpha: true, antialias: false }} 
        resize={{ scroll: false }} 
        className="w-full h-full z-10"
      >
        {/* The Starfield / Neural Cloud */}
        <NeuralCloud />
        
        {/* Replaced PresentationControls with OrbitControls for extreme stability */}
        {/* It auto-rotates but allows the user to drag without glitching out */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 1.5} 
          minPolarAngle={Math.PI / 3} 
        />
        
        {/* Subtle ground reflection to ground the scene */}
        <ContactShadows position={[0, -3.5, 0]} opacity={0.3} scale={20} blur={3} far={5} />
        
        {/* Preload ensures the shaders compile immediately */}
        <Preload all />
      </Canvas>
    </div>
  );
}