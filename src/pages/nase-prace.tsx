import SubHero from "@/components/SubHero/SubHero";
import ProjectsGrid from "@/components/ProjectsGrid/ProjectsGrid";

export default function NasePracePage() {
  return (
    <main>
      <SubHero
        kicker="Ukázky našich realizací (delete)"
        title="Naše práce"
        subtitle="Prohlédněte si vybrané projekty – od luxusních rezidenčních stropů až po precizní instalace v interiérech automobilů."
      />
      <ProjectsGrid />
    </main>
  );
}