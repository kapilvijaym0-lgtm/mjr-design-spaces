import { motion } from 'framer-motion';
import { Award, Users, Calendar, Lightbulb } from 'lucide-react';

const stats = [
  { icon: Calendar, value: '8+', label: 'Years Experience' },
  { icon: Users, value: '150+', label: 'Happy Clients' },
  { icon: Award, value: '25+', label: 'Awards Won' },
  { icon: Lightbulb, value: '200+', label: 'Projects Completed' },
];

const services = [
  {
    title: 'Residential Design',
    description: 'Creating beautiful, functional living spaces that reflect your personality and lifestyle.',
  },
  {
    title: 'Commercial Spaces',
    description: 'Designing productive work environments that inspire creativity and collaboration.',
  },
  {
    title: 'Space Planning',
    description: 'Optimizing layouts for maximum functionality and flow in any space.',
  },
  {
    title: 'Design Consultation',
    description: 'Expert guidance and advice to bring your vision to life within your budget.',
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-background to-accent/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
              About MJR
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              With over 8 years of experience in interior design, MJR specializes in creating
              sophisticated spaces that seamlessly blend form and function. Our design philosophy
              centers on understanding each client's unique needs and translating them into
              timeless, elegant interiors.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              From concept to completion, we handle every aspect of the design process with
              meticulous attention to detail, ensuring each project exceeds expectations and
              creates lasting value.
            </p>

            {/* Philosophy */}
            <div className="feature-card">
              <h3 className="text-xl font-bold text-charcoal mb-3">Design Philosophy</h3>
              <p className="text-muted-foreground">
                "Great design is not just about aesthetics—it's about creating spaces that enhance
                the way people live, work, and connect. Every element should serve a purpose while
                contributing to the overall harmony of the space."
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="feature-card text-center"
              >
                <stat.icon className="w-8 h-8 text-accent-gold mx-auto mb-4" />
                <div className="text-3xl font-bold text-charcoal mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-charcoal text-center mb-12">
            Services Offered
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="feature-card"
              >
                <h4 className="text-xl font-bold text-charcoal mb-3">{service.title}</h4>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;