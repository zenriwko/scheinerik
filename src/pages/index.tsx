import Hero from '@/components/Hero/Hero';
import Services from '@/components/Services/Services';
import GalleryFeatured from '@/components/GalleryFeatured/GalleryFeatured'
import Features from '../components/Features/Features';
import PricingLite from '@/components/PricingLite/PricingLite';
import Process from '../components/Process/Process';
import Timeline from '../components/Timeline/Timeline';
import FooterCTA from '@/components/FooterCTA/FooterCTA';
import WhyChooseUs from '@/components/WhyChooseUs/WhyChooseUs';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <GalleryFeatured />
      <Timeline />
      <PricingLite />
      <FooterCTA />
    </>
  );
}
