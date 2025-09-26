import { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Box, Sphere, Torus, OrbitControls, Html, Text3D, useMatcapTexture } from '@react-three/drei';
import { Vector3 } from 'three';
import * as THREE from 'three';

interface InteractiveElementProps {
  position: [number, number, number];
  color: string;
  type: 'box' | 'sphere' | 'torus';
  onClick?: () => void;
  label?: string;
}

const InteractiveElement = ({ position, color, type, onClick, label }: InteractiveElementProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.01;
      
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.3;
      
      // Scale on hover
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const handleClick = useCallback(() => {
    setClicked(!clicked);
    onClick?.();
  }, [clicked, onClick]);

  const renderGeometry = () => {
    switch (type) {
      case 'sphere':
        return (
          <Sphere args={[0.5, 32, 32]}>
            <meshStandardMaterial 
              color={color} 
              transparent 
              opacity={hovered ? 0.9 : 0.7}
              emissive={hovered ? color : '#000000'}
              emissiveIntensity={hovered ? 0.2 : 0}
            />
          </Sphere>
        );
      case 'torus':
        return (
          <Torus args={[0.6, 0.2, 16, 32]}>
            <meshStandardMaterial 
              color={color} 
              transparent 
              opacity={hovered ? 0.9 : 0.7}
              emissive={hovered ? color : '#000000'}
              emissiveIntensity={hovered ? 0.2 : 0}
            />
          </Torus>
        );
      default:
        return (
          <Box args={[1, 1, 1]}>
            <meshStandardMaterial 
              color={color} 
              transparent 
              opacity={hovered ? 0.9 : 0.7}
              emissive={hovered ? color : '#000000'}
              emissiveIntensity={hovered ? 0.2 : 0}
            />
          </Box>
        );
    }
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {renderGeometry()}
      </mesh>
      {hovered && label && (
        <Html position={[position[0], position[1] + 1, position[2]]}>
          <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm pointer-events-none">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
};

const CameraController = () => {
  const { camera, mouse } = useThree();
  
  useFrame(() => {
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

const Scene = ({ onElementClick }: { onElementClick: (element: string) => void }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8B7355" />
      <pointLight position={[10, -10, 10]} intensity={0.3} color="#A0937D" />
      
      <InteractiveElement
        position={[-2, 0, 0]}
        color="#8B7355"
        type="box"
        label="Modern Living"
        onClick={() => onElementClick('living')}
      />
      <InteractiveElement
        position={[2, 1, -1]}
        color="#A0937D"
        type="sphere"
        label="Luxury Bedroom"
        onClick={() => onElementClick('bedroom')}
      />
      <InteractiveElement
        position={[0, -1, 1]}
        color="#6B5B73"
        type="torus"
        label="Kitchen Design"
        onClick={() => onElementClick('kitchen')}
      />
      <InteractiveElement
        position={[3, -2, 0]}
        color="#D4C4A8"
        type="box"
        label="Office Space"
        onClick={() => onElementClick('office')}
      />
      <InteractiveElement
        position={[-3, 2, -2]}
        color="#B5A48B"
        type="sphere"
        label="Bathroom Suite"
        onClick={() => onElementClick('bathroom')}
      />
      
      <CameraController />
    </>
  );
};

interface Interactive3DSceneProps {
  onElementClick?: (element: string) => void;
  enableControls?: boolean;
}

const Interactive3DScene = ({ onElementClick, enableControls = true }: Interactive3DSceneProps) => {
  const handleElementClick = (element: string) => {
    console.log(`Clicked on ${element} element`);
    onElementClick?.(element);
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Scene onElementClick={handleElementClick} />
        {enableControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={15}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        )}
      </Canvas>
    </div>
  );
};

export default Interactive3DScene;