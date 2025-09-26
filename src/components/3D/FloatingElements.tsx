import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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

const MouseTracker = () => {
  const { mouse, camera } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mousePosition.x * 0.5 - camera.position.x) * 0.03;
    camera.position.y += (mousePosition.y * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8B7355" />
      <pointLight position={[5, 5, 5]} intensity={0.2} color="#A0937D" />
      
      <FloatingBox position={[-2, 0, 0]} color="#8B7355" />
      <FloatingSphere position={[2, 1, -1]} color="#A0937D" />
      <FloatingTorus position={[0, -1, 1]} color="#6B5B73" />
      <FloatingBox position={[3, -2, 0]} color="#D4C4A8" />
      <FloatingSphere position={[-3, 2, -2]} color="#B5A48B" />
      <FloatingTorus position={[-1, 3, 1]} color="#C4B299" />
      <FloatingBox position={[1, -3, -1]} color="#9B8C78" />
      
      <MouseTracker />
    </>
  );
};

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default FloatingElements;