import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

interface Project3DData {
  id: string;
  name: string;
  description: string;
  features: string[];
  materials: string[];
  dimensions: string;
}

const projectsData: { [key: string]: Project3DData } = {
  living: {
    id: 'living',
    name: 'Modern Living Space',
    description: 'An open-concept living area featuring minimalist design with warm neutral tones and premium materials.',
    features: ['Open concept layout', 'Smart lighting system', 'Built-in storage', 'Premium acoustics'],
    materials: ['Italian leather', 'Solid oak', 'Natural stone', 'Brushed steel'],
    dimensions: '24\' × 18\' × 12\' ceiling'
  },
  bedroom: {
    id: 'bedroom',
    name: 'Luxury Bedroom Suite',
    description: 'A serene bedroom retreat with custom built-ins and sophisticated color palette.',
    features: ['Walk-in closet', 'En-suite bathroom', 'Smart climate control', 'Blackout automation'],
    materials: ['Egyptian cotton', 'Walnut wood', 'Marble accents', 'Brass fixtures'],
    dimensions: '16\' × 14\' × 10\' ceiling'
  },
  kitchen: {
    id: 'kitchen',
    name: 'Designer Kitchen',
    description: 'A chef-inspired kitchen with premium appliances and functional elegance.',
    features: ['Professional appliances', 'Quartz countertops', 'Custom cabinetry', 'Wine storage'],
    materials: ['Quartz stone', 'Stainless steel', 'European oak', 'Ceramic tile'],
    dimensions: '20\' × 12\' × 9\' ceiling'
  },
  office: {
    id: 'office',
    name: 'Executive Office',
    description: 'A productive workspace combining comfort with professional aesthetics.',
    features: ['Ergonomic design', 'Built-in tech', 'Natural lighting', 'Sound dampening'],
    materials: ['Mahogany wood', 'Leather upholstery', 'Tempered glass', 'Chrome details'],
    dimensions: '14\' × 12\' × 10\' ceiling'
  },
  bathroom: {
    id: 'bathroom',
    name: 'Spa Bathroom Suite',
    description: 'A luxurious bathroom featuring spa-like amenities and premium finishes.',
    features: ['Rain shower', 'Heated floors', 'Smart mirrors', 'Steam system'],
    materials: ['Carrara marble', 'Teak wood', 'Brushed gold', 'Tempered glass'],
    dimensions: '12\' × 10\' × 9\' ceiling'
  }
};

interface Project3DModelProps {
  projectId: string;
}

const Project3DModel = ({ projectId }: Project3DModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  // Simple 3D representation based on project type
  const renderProjectModel = () => {
    switch (projectId) {
      case 'living':
        return (
          <>
            {/* Sofa */}
            <mesh position={[-1, -0.5, 0]}>
              <boxGeometry args={[2, 0.6, 1]} />
              <meshStandardMaterial color="#8B7355" />
            </mesh>
            {/* Coffee Table */}
            <mesh position={[0, -0.8, 0.8]}>
              <boxGeometry args={[1.2, 0.2, 0.6]} />
              <meshStandardMaterial color="#D4C4A8" />
            </mesh>
            {/* TV Stand */}
            <mesh position={[2, -0.6, -1.5]}>
              <boxGeometry args={[1.5, 0.4, 0.3]} />
              <meshStandardMaterial color="#6B5B73" />
            </mesh>
          </>
        );
      case 'bedroom':
        return (
          <>
            {/* Bed */}
            <mesh position={[0, -0.3, 0]}>
              <boxGeometry args={[2.5, 0.4, 2]} />
              <meshStandardMaterial color="#A0937D" />
            </mesh>
            {/* Nightstands */}
            <mesh position={[-1.5, -0.6, 0]}>
              <boxGeometry args={[0.6, 0.6, 0.4]} />
              <meshStandardMaterial color="#8B7355" />
            </mesh>
            <mesh position={[1.5, -0.6, 0]}>
              <boxGeometry args={[0.6, 0.6, 0.4]} />
              <meshStandardMaterial color="#8B7355" />
            </mesh>
          </>
        );
      case 'kitchen':
        return (
          <>
            {/* Island */}
            <mesh position={[0, -0.5, 0]}>
              <boxGeometry args={[2, 0.8, 1.2]} />
              <meshStandardMaterial color="#D4C4A8" />
            </mesh>
            {/* Cabinets */}
            <mesh position={[-2, -0.2, -1]}>
              <boxGeometry args={[1, 1.5, 0.6]} />
              <meshStandardMaterial color="#6B5B73" />
            </mesh>
            <mesh position={[2, -0.2, -1]}>
              <boxGeometry args={[1, 1.5, 0.6]} />
              <meshStandardMaterial color="#6B5B73" />
            </mesh>
          </>
        );
      default:
        return (
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#8B7355" />
          </mesh>
        );
    }
  };

  return (
    <group ref={groupRef}>
      {renderProjectModel()}
    </group>
  );
};

interface ProjectViewer3DProps {
  projectId: string | null;
  onClose: () => void;
}

const ProjectViewer3D = ({ projectId, onClose }: ProjectViewer3DProps) => {
  const project = projectId ? projectsData[projectId] : null;

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-background rounded-2xl w-full max-w-6xl h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full">
            {/* 3D Viewer */}
            <div className="flex-1 relative">
              <Canvas camera={{ position: [4, 2, 4], fov: 60 }}>
                <Environment preset="apartment" />
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                
                <Project3DModel projectId={project.id} />
                
                <OrbitControls
                  enablePan={false}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={3}
                  maxDistance={8}
                />
              </Canvas>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Project Details */}
            <div className="w-80 bg-card p-6 overflow-y-auto">
              <h2 className="text-2xl font-bold text-charcoal mb-4">{project.name}</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                    Description
                  </h3>
                  <p className="text-foreground leading-relaxed">{project.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                    Key Features
                  </h3>
                  <ul className="space-y-1">
                    {project.features.map((feature, index) => (
                      <li key={index} className="text-foreground text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-accent-gold rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                    Materials
                  </h3>
                  <ul className="space-y-1">
                    {project.materials.map((material, index) => (
                      <li key={index} className="text-foreground text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-muted-brown rounded-full mr-2" />
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                    Dimensions
                  </h3>
                  <p className="text-foreground font-mono">{project.dimensions}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectViewer3D;