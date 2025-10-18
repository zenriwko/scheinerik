import SubHero from "@/components/SubHero/SubHero";
import AboutContent from "@/components/AboutContent/AboutContent";
import AboutPhilosophy from "@/components/AboutPhilosophy/AboutPhilosophy";

export default function AboutPage() {
  return (
    <main>
      <SubHero 
        kicker="Náš příběh"
        title="O NÁS"
        subtitle="Jsme odborníci na vytváření nezapomenutelných zážitků — přinášíme luxusní hvězdnou oblohu do interiérů vozidel i prostorů."
      />
      <AboutContent />
      <AboutPhilosophy />
    </main>
  );
}