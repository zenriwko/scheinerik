import SubHero from "@/components/SubHero/SubHero";
import ServicesGrid from "@/components/ServicesGrid/ServicesGrid";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";

export default function ServicesPage() {
  return (
    <main>
      <SubHero 
        kicker="Hvězdná Obloha na Míru"
        title="Naše služby"
        subtitle="Specializujeme se na instalaci hvězdných stropů z optických vláken do
          interiérů i vozidel. Každý projekt vytváříme individuálně - precizní
          montáž, moderní technologie a nadčasový design."
      />
      <ServicesGrid />
      <WhyChooseUs />
    </main>
  );
}