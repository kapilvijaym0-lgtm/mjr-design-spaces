import { motion } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';
import bedroomImage from '@/assets/project-bedroom.jpg';
import kitchenImage from '@/assets/project-kitchen.jpg';
import officeImage from '@/assets/project-office.jpg';

const projects = [
  {
    id: 1,
    title: 'Luxury Bedroom Suite',
    category: 'Residential',
    description: 'A sophisticated bedroom design featuring neutral tones and premium materials, creating a serene retreat.',
    image: bedroomImage,
    tags: ['Minimalist', 'Luxury', 'Neutral Palette'],
  },
  {
    id: 2,
    title: 'Modern Kitchen Design',
    category: 'Residential',
    description: 'Clean lines and functional elegance define this contemporary kitchen space with premium finishes.',
    image: kitchenImage,
    tags: ['Contemporary', 'Functional', 'Clean Lines'],
  },
  {
    id: 3,
    title: 'Executive Office Space',
    category: 'Commercial',
    description: 'Professional workspace design that balances productivity with aesthetic appeal and comfort.',
    image: officeImage,
    tags: ['Professional', 'Modern', 'Productivity'],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of interior design projects that showcase
            our commitment to excellence and innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="project-card group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300">
                      <Eye size={20} />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300">
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-accent-gold bg-accent-gold/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-charcoal mb-3">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="btn-hero">
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;