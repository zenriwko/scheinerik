import SubHero from "@/components/SubHero/SubHero";
import Pricing from "@/components/Pricing/Pricing";
import PricingCalc from "@/components/PricingCalc/PricingCalc";

export default function PricingPage() {
  return (
    <main>
      <SubHero
        kicker="Odhad ceny instalace"
        title="Ceník"
        subtitle="Získejte přehled o orientačních cenách našich projektů a spočítejte si odhad nákladů pomocí jednoduché kalkulačky."
      />
      <Pricing />
      <PricingCalc />
    </main>
  );
}