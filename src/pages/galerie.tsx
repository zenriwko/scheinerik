import SubHero from "@/components/SubHero/SubHero";
import GalleryGrid from "@/components/GalleryGrid/GalleryGrid";

export default function GaleriePage() {
  return (
    <main>
      <SubHero
        kicker="Naše Realizace"
        title="Galerie"
        subtitle="Prohlédněte si vybrané momenty z našich instalací – hvězdná obloha v interiérech vozidel a rezidencí."
      />
      <GalleryGrid />
    </main>
  );
}