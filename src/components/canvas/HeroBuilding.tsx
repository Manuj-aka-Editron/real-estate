'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useTheme } from 'next-themes';

function BuildingBlock({ position, delay, scale = [1, 1, 1], resolvedTheme }: { position: [number, number, number], delay: number, scale?: [number, number, number], resolvedTheme?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      gsap.fromTo(meshRef.current.position, 
        { y: position[1] - 4 }, 
        { y: position[1], duration: 2.5, delay: delay + 0.3, ease: 'power4.out' }
      );
      gsap.fromTo(meshRef.current.scale, 
        { x: 0, y: 0, z: 0 }, 
        { x: scale[0], y: scale[1], z: scale[2], duration: 2, delay: delay + 0.5, ease: 'back.out(1.2)' }
      );
    }
  }, [position, delay, scale]);

  const currentTheme = resolvedTheme || 'light';

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={currentTheme === 'dark' ? '#222222' : '#F3F4F6'} 
        metalness={0.05} 
        roughness={0.25} 
        emissive={currentTheme === 'dark' ? '#111111' : '#FFFFFF'}
        emissiveIntensity={currentTheme === 'dark' ? 0.1 : 0.05}
      />
    </mesh>
  );
}

function GlassPane({ position, delay, size = [1, 1], resolvedTheme }: { position: [number, number, number], delay: number, size?: [number, number], resolvedTheme?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentTheme = resolvedTheme || 'light';

  useEffect(() => {
    if (meshRef.current) {
      gsap.fromTo(meshRef.current.scale, 
        { x: 0, y: 0, z: 1 }, 
        { x: 1, y: 1, z: 1, duration: 2, delay: delay + 0.5, ease: 'power3.out' }
      );
      gsap.fromTo(meshRef.current.material, 
        { opacity: 0 }, 
        { opacity: currentTheme === 'dark' ? 0.5 : 0.3, duration: 1.5, delay: delay + 0.8 }
      );
    }
  }, [delay, currentTheme]);

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[size[0], size[1]]} />
      <meshPhysicalMaterial 
        transparent 
        opacity={0} 
        color={currentTheme === 'dark' ? '#3B82F6' : '#93C5FD'} 
        transmission={0.8} 
        thickness={0.5} 
        roughness={0.1}
        metalness={0.2}
        emissive={currentTheme === 'dark' ? '#1E3A8A' : '#000000'}
        emissiveIntensity={currentTheme === 'dark' ? 0.5 : 0}
      />
    </mesh>
  );
}

function CinematicMist({ count = 15, resolvedTheme }: { count?: number, resolvedTheme?: string }) {
  const mistRef = useRef<THREE.Group>(null);
  const currentTheme = resolvedTheme || 'light';
  
  const startTime = useRef(Date.now());
  
  useFrame(() => {
    if (mistRef.current) {
      const et = (Date.now() - startTime.current) / 1000;
      mistRef.current.rotation.y += 0.001;
      mistRef.current.position.y = Math.sin(et * 0.5) * 0.2;
    }
  });

  const mistColor = currentTheme === 'dark' ? '#111111' : '#E5E7EB';

  return (
    <group ref={mistRef}>
      {[...Array(count)].map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 15]}>
          <boxGeometry args={[4, 0.5, 4]} />
          <meshBasicMaterial color={mistColor} transparent opacity={0.05} />
        </mesh>
      ))}
    </group>
  );
}

function BuildingAssembly({ isMobile, resolvedTheme }: { isMobile: boolean, resolvedTheme?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const currentTheme = resolvedTheme || 'light';

  const blocks = useMemo(() => {
    const arr = [];
    const heights = isMobile ? [4, 6, 4] : [6, 8, 5];
    const offsets = isMobile ? [-1.2, 0, 1.2] : [-1.5, 0, 1.5];
    
    for (let t = 0; t < 3; t++) {
      for (let h = 0; h < heights[t]; h++) {
        arr.push({
          pos: [offsets[t], h - heights[t]/2 + 1, 0] as [number, number, number],
          delay: h * 0.15 + t * 0.3,
          isGlass: h > 1 && h < heights[t] - 1
        });
      }
    }
    return arr;
  }, [isMobile]);

  useFrame((state) => {
    if (groupRef.current) {
      const mouseX = (state.mouse.x * Math.PI) / 10;
      const mouseY = (state.mouse.y * Math.PI) / 20;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {blocks.map((b, i) => (
        <group key={i}>
          <BuildingBlock position={b.pos} delay={b.delay} scale={[1.2, 0.95, 1.2]} resolvedTheme={currentTheme} />
          {b.isGlass && !isMobile && (
            <>
              <GlassPane position={[b.pos[0], b.pos[1], 0.61]} delay={b.delay} size={[0.8, 0.8]} resolvedTheme={currentTheme} />
              <GlassPane position={[b.pos[0], b.pos[1], -0.61]} delay={b.delay} size={[0.8, 0.8]} resolvedTheme={currentTheme} />
            </>
          )}
        </group>
      ))}
      <CinematicMist count={isMobile ? 6 : 15} resolvedTheme={currentTheme} />
    </group>
  );
}

export default function HeroBuilding() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || 'light';
  const [hasError, setHasError] = useState(false);

  return (
    <div className="absolute inset-0 z-0">
      {hasError ? (
        <div className="absolute inset-0 bg-[#F3F4F6] flex items-center justify-center">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" 
            alt="Luxury Architecture Fallback" 
            fill 
            className="object-cover opacity-50 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />
        </div>
      ) : (
        <>
          <div className={`absolute inset-0 z-[-1] ${currentTheme === 'dark' ? 'bg-[#050505]' : 'bg-white'}`} />
          
          <Canvas 
            shadows
            dpr={[1, isMobile ? 1 : 1.5]} 
            gl={{ antialias: true, alpha: true, stencil: false, depth: true }}
            className="w-full h-full"
            onError={() => setHasError(true)}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            <PerspectiveCamera makeDefault position={[0, 2.8, 12]} fov={isMobile ? 50 : 32} />
            
            <ambientLight intensity={currentTheme === 'dark' ? 0.3 : 2.0} />
            <pointLight position={[10, 10, 10]} intensity={currentTheme === 'dark' ? 1 : 3} color="#FFFFFF" />
            <directionalLight position={[-10, 20, 10]} intensity={currentTheme === 'dark' ? 0.5 : 2} />
            <spotLight position={[0, 15, 0]} intensity={currentTheme === 'dark' ? 0.1 : 0.5} angle={0.25} penumbra={1} />

            <group scale={isMobile ? 1 : 0.85} position={[0, -0.5, 0]}>
              <BuildingAssembly isMobile={isMobile} resolvedTheme={currentTheme} />
            </group>
            
            <Environment preset={currentTheme === 'dark' ? 'night' : 'city'} />
            <ContactShadows 
              position={[0, -4, 0]} 
              opacity={currentTheme === 'dark' ? 0.5 : 0.2} 
              scale={20} 
              blur={2.5} 
              far={10} 
            />
          </Canvas>
        </>
      )}
    </div>
  );
}
