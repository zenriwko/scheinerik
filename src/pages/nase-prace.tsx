import SubHero from "@/components/SubHero/SubHero";
import ProjectsGrid from "@/components/ProjectsGrid/ProjectsGrid";
import FooterCTA from "@/components/FooterCTA/FooterCTA";

export default function NasePracePage() {
  return (
    <main>
      <SubHero
        kicker="Ukázky našich realizací"
        title="NAŠE PRÁCE"
        subtitle="Prohlédněte si vybrané projekty, od luxusních rezidenčních stropů až po precizní instalace v interiérech automobilů."
      />
      <ProjectsGrid />
      <FooterCTA />
    </main>
  );
}