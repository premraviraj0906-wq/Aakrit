import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Line } from '@react-three/drei';
import * as THREE from 'three';

// Rig to follow mouse movements smoothly
export const SceneRig = ({ children }) => {
  const groupRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!groupRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 0.35;
      const y = (e.clientY / window.innerHeight - 0.5) * -0.25;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y, 0.05);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <group ref={groupRef}>{children}</group>;
};

// Concentric technical axis lines
const CADGridAxes = () => {
  return (
    <group>
      {/* Horizontal grid plate representation */}
      {Array.from({ length: 9 }).map((_, i) => {
        const offset = (i - 4) * 0.8;
        return (
          <React.Fragment key={i}>
            <Line
              points={[[-3.5, -1.8, offset], [3.5, -1.8, offset]]}
              color="#ffffff"
              lineWidth={1.5}
              transparent
              opacity={0.25}
            />
            <Line
              points={[[offset, -1.8, -3.5], [offset, -1.8, 3.5]]}
              color="#ffffff"
              lineWidth={1.5}
              transparent
              opacity={0.25}
            />
          </React.Fragment>
        );
      })}
    </group>
  );
};

// Nested gimbal structure (CAD style with brutalist yellow/orange color accents)
const CADGimbal = () => {
  const innerRef = useRef();
  const midRef = useRef();
  const outerRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.8;
      innerRef.current.rotation.x = t * 0.4;
    }
    if (midRef.current) {
      midRef.current.rotation.x = -t * 0.35;
      midRef.current.rotation.z = t * 0.55;
    }
    if (outerRef.current) {
      outerRef.current.rotation.z = -t * 0.2;
      outerRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group position={[0.5, 0, 0]}>
      {/* Core Sphere - Bright Yellow wireframe */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.65, 12, 12]} />
        <meshBasicMaterial color="#facc15" wireframe={true} />
      </mesh>

      {/* Middle Ring - Vibrant Orange */}
      <group ref={midRef}>
        <mesh>
          <torusGeometry args={[1.25, 0.05, 8, 32]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>
        {/* Subdivision ticks */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = Math.cos(angle) * 1.25;
          const y = Math.sin(angle) * 1.25;
          return (
            <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.15, 0.04, 0.04]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          );
        })}
      </group>

      {/* Outer Cage - White/Orange double rings */}
      <group ref={outerRef}>
        <mesh>
          <torusGeometry args={[1.85, 0.04, 8, 32]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.85, 0.04, 8, 32]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
      </group>
    </group>
  );
};

const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 15, 5]} intensity={1.5} color="#ffffff" />
      
      <SceneRig>
        <CADGridAxes />
        <CADGimbal />
      </SceneRig>
    </>
  );
};

export default Scene3D;
