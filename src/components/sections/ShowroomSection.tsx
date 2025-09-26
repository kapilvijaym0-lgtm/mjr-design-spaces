import { useState } from 'react';
import { motion } from 'framer-motion';
import Showroom3D from '../3D/Showroom3D';
import { toast } from 'sonner';

const hotspotDetails = {
  sofa: {
    title: 'Premium Italian Leather Sofa',
    details: 'Handcrafted in Italy with full-grain leather and ergonomic design for ultimate comfort.',
    price: '$3,200',
    specifications: ['Full-grain Italian leather', 'Hardwood frame', 'Memory foam cushions', '5-year warranty']
  },
  table: {
    title: 'Designer Oak Coffee Table',
    details: 'Solid oak construction with hidden storage compartments and minimalist design.',
    price: '$1,200',
    specifications: ['Solid European oak', 'Hidden storage', 'Natural oil finish', '10-year warranty']
  },
  lighting: {
    title: 'Smart LED Floor Lamp',
    details: 'Adjustable color temperature and brightness with app control and voice commands.',
    price: '$450',
    specifications: ['Smart LED technology', 'App controlled', 'Voice command ready', '2-year warranty']
  },
  artwork: {
    title: 'Original Abstract Artwork',
    details: 'Unique piece by renowned local artist with custom museum-quality framing.',
    price: '$850',
    specifications: ['Original oil painting', 'Museum quality frame', 'Certificate of authenticity', 'Included installation']
  }
};

const ShowroomSection = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  const handleHotspotClick = (hotspot: string) => {
    setSelectedHotspot(hotspot);
    const details = hotspotDetails[hotspot as keyof typeof hotspotDetails];
    toast.success(`Selected: ${details.title}`, {
      description: details.details
    });
  };

  const closeDetails = () => {
    setSelectedHotspot(null);
  };

  return (
    <section id="showroom" className="py-20 bg-gradient-to-br from-background to-accent/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Interactive Showroom
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our 3D showroom and discover the details behind each design element.
            Click on the hotspots to learn more about materials, specifications, and craftsmanship.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative h-[600px] rounded-2xl overflow-hidden shadow-elegant bg-card"
        >
          <Showroom3D onHotspotClick={handleHotspotClick} />
        </motion.div>

        {/* Hotspot Details Modal */}
        {selectedHotspot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-background rounded-2xl p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-charcoal mb-2">
                    {hotspotDetails[selectedHotspot as keyof typeof hotspotDetails].title}
                  </h3>
                  <p className="text-accent-gold font-semibold text-xl">
                    {hotspotDetails[selectedHotspot as keyof typeof hotspotDetails].price}
                  </p>
                </div>
                <button
                  onClick={closeDetails}
                  className="text-muted-foreground hover:text-charcoal transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {hotspotDetails[selectedHotspot as keyof typeof hotspotDetails].details}
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-charcoal mb-3">Specifications</h4>
                <ul className="space-y-2">
                  {hotspotDetails[selectedHotspot as keyof typeof hotspotDetails].specifications.map((spec, index) => (
                    <li key={index} className="text-muted-foreground text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-accent-gold rounded-full mr-3" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-4">
                <button className="btn-hero flex-1">
                  Add to Wishlist
                </button>
                <button className="btn-ghost flex-1">
                  Contact Designer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ShowroomSection;