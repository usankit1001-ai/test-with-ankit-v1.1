import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { Vector3 } from 'three';

interface SceneProps {
    isDark: boolean;
}

const Particles = ({ isDark }: { isDark: boolean }) => {
  const ref = useRef<any>();
  // 6000 / 3 = 2000 points.
  const [sphere] = useState(() => random.inSphere(new Float32Array(6000), { radius: 1.5 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={isDark ? "#2dd4bf" : "#0d9488"} // Teal-400 (Dark Mode) vs Teal-600 (Light Mode)
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const GeometricShapes = ({ isDark }: { isDark: boolean }) => {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if(meshRef.current) {
        meshRef.current.rotation.x = Math.cos(t / 4) / 2;
        meshRef.current.rotation.y = Math.sin(t / 4) / 2;
        meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
       <icosahedronGeometry args={[1, 0]} />
       <meshBasicMaterial 
        wireframe 
        color={isDark ? "#14b8a6" : "#0f766e"} 
        transparent 
        opacity={0.15} 
       />
    </mesh>
  );
}

const MouseRig = () => {
    const vec = new Vector3();
    useFrame((state) => {
        // Target position based on mouse pointer
        // pointer.x/y are normalized -1 to 1
        const targetX = state.pointer.x * 0.5; 
        const targetY = state.pointer.y * 0.5;
        
        // Lerp towards target for fluid movement
        vec.set(targetX, targetY, 3);
        state.camera.position.lerp(vec, 0.05);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

const HeroScene: React.FC<SceneProps> = ({ isDark }) => {
  return (
    <div className={`fixed inset-0 z-0 h-full w-full pointer-events-none transition-colors duration-300 ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
      <Canvas camera={{ position: [0, 0, 3] }} eventSource={document.body} eventPrefix="client">
        <MouseRig />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <GeometricShapes isDark={isDark} />
        </Float>
        <Particles isDark={isDark} />
      </Canvas>
    </div>
  );
};

export default HeroScene;