import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Plane, Html, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface HotspotProps {
  position: [number, number, number];
  title: string;
  description: string;
  onClick: () => void;
}

const Hotspot = ({ position, title, description, onClick }: HotspotProps) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      const scale = hovered ? 1.5 : 1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? "#D4C4A8" : "#8B7355"} 
          emissive={hovered ? "#8B7355" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
      
      {hovered && (
        <Html position={[position[0], position[1] + 0.3, position[2]]}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/90 text-white p-4 rounded-lg max-w-xs pointer-events-none"
          >
            <h4 className="font-bold text-sm mb-1">{title}</h4>
            <p className="text-xs text-gray-300">{description}</p>
          </motion.div>
        </Html>
      )}
    </group>
  );
};

const Room = ({ onHotspotClick }: { onHotspotClick: (hotspot: string) => void }) => {
  return (
    <>
      {/* Floor */}
      <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#F5F5F0" />
      </Plane>
      
      {/* Back Wall */}
      <Plane args={[10, 6]} position={[0, 1, -5]}>
        <meshStandardMaterial color="#E8E6E1" />
      </Plane>
      
      {/* Left Wall */}
      <Plane args={[10, 6]} rotation={[0, Math.PI / 2, 0]} position={[-5, 1, 0]}>
        <meshStandardMaterial color="#F0EDE8" />
      </Plane>
      
      {/* Furniture - Sofa */}
      <Box args={[3, 0.8, 1.5]} position={[-2, -1.4, -2]}>
        <meshStandardMaterial color="#8B7355" />
      </Box>
      
      {/* Coffee Table */}
      <Box args={[1.5, 0.3, 0.8]} position={[-2, -1.85, 0]}>
        <meshStandardMaterial color="#D4C4A8" />
      </Box>
      
      {/* Floor Lamp */}
      <Box args={[0.1, 3, 0.1]} position={[2, 0.5, -3]}>
        <meshStandardMaterial color="#6B5B73" />
      </Box>
      
      {/* Artwork */}
      <Plane args={[1.5, 1]} position={[0, 2, -4.9]}>
        <meshStandardMaterial color="#A0937D" />
      </Plane>
      
      {/* Hotspots */}
      <Hotspot
        position={[-2, -0.6, -2]}
        title="Premium Sofa"
        description="Italian leather with custom cushioning and ergonomic design"
        onClick={() => onHotspotClick('sofa')}
      />
      
      <Hotspot
        position={[-2, -1.55, 0]}
        title="Designer Coffee Table"
        description="Solid oak with minimalist design and hidden storage"
        onClick={() => onHotspotClick('table')}
      />
      
      <Hotspot
        position={[2, 1.5, -3]}
        title="Ambient Lighting"
        description="Smart LED floor lamp with adjustable color temperature"
        onClick={() => onHotspotClick('lighting')}
      />
      
      <Hotspot
        position={[0, 2, -4.8]}
        title="Abstract Art"
        description="Original piece by local artist, custom framing"
        onClick={() => onHotspotClick('artwork')}
      />
      
      <ContactShadows opacity={0.3} scale={10} blur={2} far={2} />
    </>
  );
};

interface Showroom3DProps {
  onHotspotClick?: (hotspot: string) => void;
}

const Showroom3D = ({ onHotspotClick }: Showroom3DProps) => {
  const handleHotspotClick = (hotspot: string) => {
    console.log(`Clicked hotspot: ${hotspot}`);
    onHotspotClick?.(hotspot);
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-warm-white to-soft-gray">
      <Canvas camera={{ position: [5, 2, 5], fov: 60 }}>
        <Environment preset="apartment" />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        
        <Room onHotspotClick={handleHotspotClick} />
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={12}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg">
        <p className="text-sm font-medium mb-1">Interactive Showroom</p>
        <p className="text-xs text-gray-300">Click on glowing hotspots to explore design details</p>
        <p className="text-xs text-gray-300">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};

export default Showroom3D;