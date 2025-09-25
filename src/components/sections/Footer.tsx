import { motion } from 'framer-motion';
import { Instagram, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@mjrdesign.com', label: 'Email' },
  ];

  return (
    <footer className="bg-charcoal text-warm-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <h3 className="text-3xl font-bold text-warm-white mb-4">MJR</h3>
            <p className="text-soft-gray mb-6 leading-relaxed">
              Creating sophisticated interior spaces that harmonize elegance with functionality.
              Transforming houses into homes, offices into inspiring workspaces.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-3 bg-soft-gray/20 rounded-lg hover:bg-accent-gold/20 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-warm-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Projects', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-soft-gray hover:text-accent-gold transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-warm-white mb-4">Services</h4>
            <ul className="space-y-3">
              {['Residential Design', 'Commercial Spaces', 'Space Planning', 'Consultation'].map((service) => (
                <li key={service}>
                  <span className="text-soft-gray">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-soft-gray/20 flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-soft-gray text-sm mb-4 md:mb-0">
            © {currentYear} MJR Interior Design. All rights reserved.
          </p>
          <p className="text-soft-gray text-sm flex items-center">
            Made with <Heart size={16} className="mx-1 text-accent-gold" /> for beautiful spaces
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;