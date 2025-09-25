import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

const FloatingBox = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <Box ref={meshRef} position={position} scale={[0.5, 0.5, 0.5]}>
      <meshStandardMaterial color={color} transparent opacity={0.8} />
    </Box>
  );
};

const FloatingSphere = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.8) * 0.4;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} scale={[0.3, 0.3, 0.3]}>
      <meshStandardMaterial color={color} transparent opacity={0.7} />
    </Sphere>
  );
};

const FloatingTorus = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.008;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.2;
    }
  });

  return (
    <Torus ref={meshRef} position={position} scale={[0.4, 0.4, 0.4]} args={[1, 0.3, 16, 32]}>
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </Torus>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      <FloatingBox position={[-2, 0, 0]} color="#8B7355" />
      <FloatingSphere position={[2, 1, -1]} color="#A0937D" />
      <FloatingTorus position={[0, -1, 1]} color="#6B5B73" />
      <FloatingBox position={[3, -2, 0]} color="#D4C4A8" />
      <FloatingSphere position={[-3, 2, -2]} color="#B5A48B" />
    </>
  );
};

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default FloatingElements;