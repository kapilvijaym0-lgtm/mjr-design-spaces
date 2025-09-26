import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import ShowroomSection from '@/components/sections/ShowroomSection';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <ShowroomSection />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;