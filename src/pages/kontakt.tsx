import ContactHero from "@/components/ContactHero/ContactHero";
import ContactDetails from "@/components/ContactDetails/ContactDetails";
import SubHero from "@/components/SubHero/SubHero";

export default function ContactPage() {
  return (
    <main>
      <SubHero 
        kicker="Spojte se s námi"
        title="KONTAKTUJTE NÁS"
        subtitle="Ať už máte zájem o hvězdné nebe do auta, interiéru nebo jen potřebujete poradit — jsme tu pro vás. Rádi vám pomůžeme s návrhem, kalkulací i realizací."
      />
      <ContactHero />
    </main>
  );
}