import Hero from '@/components/Hero/Hero';
import Services from '@/components/Services/Services';
import Features from '../components/Features/Features';
import Pricing from '../components/Pricing/Pricing';
import Process from '../components/Process/Process';
import Timeline from '../components/Timeline/Timeline';
import Contact from '../components/Contact/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Features />
      <Process />
      <Timeline />
      <Pricing />
      <Contact />
    </>
  );
}
