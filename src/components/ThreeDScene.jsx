import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const generateGoldDust = (count) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  return positions;
};

const ArmillarySphere = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.x = elapsed * 0.2;
    if (ring2Ref.current) ring2Ref.current.rotation.y = elapsed * 0.3;
    if (ring3Ref.current) ring3Ref.current.rotation.z = elapsed * 0.15;
    if (coreRef.current) {
      coreRef.current.rotation.y = elapsed * 0.4;
      coreRef.current.rotation.x = elapsed * 0.2;
    }
  });

  return (
    <group position={[0.5, 0, 0]}>
      {/* Outer Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.0, 0.05, 16, 100]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={0.9} 
          roughness={0.15} 
          emissive="#5c4308" 
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Middle Ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.7, 0.04, 16, 100]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={0.9} 
          roughness={0.15} 
          emissive="#5c4308" 
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Inner Ring */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <torusGeometry args={[1.4, 0.03, 16, 100]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={0.9} 
          roughness={0.15} 
          emissive="#5c4308" 
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Core Ornate Polyhedron */}
      <group ref={coreRef}>
        {/* Core Solid Gold Octahedron */}
        <mesh>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial 
            color="#d4af37" 
            metalness={1.0} 
            roughness={0.1} 
            flatShading
            emissive="#5c4308"
            emissiveIntensity={0.1}
          />
        </mesh>
        {/* Core Wireframe for intricate layered look */}
        <mesh scale={1.02}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshBasicMaterial 
            color="#f3e5ab" 
            wireframe 
            transparent 
            opacity={0.6}
          />
        </mesh>
      </group>
    </group>
  );
};

const GoldDust = () => {
  const pointsRef = useRef();
  const positions = React.useMemo(() => generateGoldDust(600), []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#f3e5ab"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

const AnimatedShapes = () => {
  return (
    <>
      <color attach="background" args={['#0b1315']} />
      
      {/* Warm, luxurious warm-toned gallery lighting */}
      <ambientLight intensity={0.4} />
      
      {/* Bright gold highlights */}
      <directionalLight position={[10, 10, 5]} intensity={2.0} color="#f3e5ab" />
      
      {/* Warm side fill */}
      <pointLight position={[-8, -5, -5]} intensity={1.5} color="#aa7c11" />
      
      {/* Soft spotlight highlighting the central piece */}
      <spotLight 
        position={[0, 8, 2]} 
        intensity={2.5} 
        angle={0.4} 
        penumbra={0.8} 
        color="#fff" 
      />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <ArmillarySphere />
      </Float>
      <GoldDust />
    </>
  );
};

export default AnimatedShapes;
