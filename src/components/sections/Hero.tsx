import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';
import FloatingElements from '../3D/FloatingElements';
import Interactive3DScene from '../3D/Interactive3DScene';
import ProjectViewer3D from '../3D/ProjectViewer3D';
import heroImage from '@/assets/hero-interior.jpg';

const Hero = () => {
  const [show3DScene, setShow3DScene] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handle3DElementClick = (element: string) => {
    setSelectedProject(element);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Modern interior design"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
      </div>

      {/* 3D Elements - Switch between FloatingElements and Interactive Scene */}
      <div className="absolute inset-0 z-10 opacity-30">
        {show3DScene ? (
          <Interactive3DScene 
            onElementClick={handle3DElementClick}
            enableControls={false}
          />
        ) : (
          <FloatingElements />
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
          >
            <span className="hero-text">Transforming</span>
            <br />
            <span className="text-charcoal">Spaces</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Interior design that harmonizes elegance with functionality,
            creating spaces that inspire and elevate everyday living.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button
              className="btn-hero"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </button>
            <button
              className="btn-ghost"
              onClick={() => setShow3DScene(!show3DScene)}
            >
              <Play className="mr-2" size={16} />
              {show3DScene ? 'Static View' : '3D Interactive'}
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground cursor-pointer"
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Project Viewer Modal */}
      <ProjectViewer3D 
        projectId={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Hero;