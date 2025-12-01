import SubHero from "@/components/SubHero/SubHero";
import ServicesGrid from "@/components/ServicesGrid/ServicesGrid";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import FooterCTA from "@/components/FooterCTA/FooterCTA";

export default function ServicesPage() {
  return (
    <main>
      <SubHero 
        kicker="Hvězdná Obloha na Míru"
        title="Služby"
        subtitle="Specializujeme se na instalaci hvězdných stropů z optických vláken do
          interiérů i vozidel. Každý projekt vytváříme individuálně - precizní
          montáž, moderní technologie a nadčasový design."
      />
      <ServicesGrid />
      <WhyChooseUs />
      <FooterCTA />
    </main>
  );
}