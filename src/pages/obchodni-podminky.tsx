import SubHero from "@/components/SubHero/SubHero";
import FooterCTA from "@/components/FooterCTA/FooterCTA";

export default function ObchodniPodminkyPage() {
  return (
    <main>
      <SubHero
        kicker="Právní informace"
        title="OBCHODNÍ PODMÍNKY"
        subtitle="Podmínky poskytování služeb a realizace zakázek."
      />

      <section>
        <h2>1. Poskytovatel služeb</h2>
        <p>
          Poskytovatelem služeb je Jan Poláček, IČO: 05431603, se sídlem
          Maňákova 811/10, 198 00 Praha 9 – Černý Most.
        </p>

        <h2>2. Nezávazná poptávka</h2>
        <p>
          Odeslání poptávky prostřednictvím webu je nezávazné a slouží k
          úvodnímu posouzení požadavků zákazníka.
        </p>

        <h2>3. Vznik závazné zakázky</h2>
        <p>
          Zakázka je považována za závaznou po zaplacení sjednané zálohy nebo
          po podpisu předávacího protokolu či jiné písemné dohody mezi
          poskytovatelem a zákazníkem.
        </p>

        <h2>4. Ceny</h2>
        <p>
          Ceny uvedené na webu jsou orientační. Konečná cena se stanovuje
          individuálně podle rozsahu, náročnosti a provedení instalace.
        </p>

        <h2>5. Platební podmínky</h2>
        <p>
          Platba je možná hotově, bankovním převodem nebo kombinací se zálohou.
          Faktury jsou vystavovány pro zákazníky B2B.
        </p>

        <h2>6. Termíny realizace</h2>
        <p>
          Termín realizace je sjednáván individuálně. V případě změn se
          poskytovatel zavazuje zákazníka včas informovat.
        </p>

        <h2>7. Záruka</h2>
        <p>
          Poskytovatel poskytuje záruku 5 let na provedenou instalaci.
          Záruka se vztahuje výhradně na instalaci a nevztahuje se na záruku
          výrobce vozidla.
        </p>

        <h2>8. Záruka výrobce vozidla</h2>
        <p>
          Instalace může v závislosti na rozsahu a způsobu provedení ovlivnit
          záruku výrobce vozidla. Zákazník je o případných rizicích vždy
          informován před zahájením zakázky.
        </p>

        <h2>9. Odpovědnost</h2>
        <p>
          Poskytovatel odpovídá za provedení práce v dohodnutém rozsahu.
          Neodpovídá za škody vzniklé v důsledku neúplných nebo nesprávných
          informací poskytnutých zákazníkem.
        </p>

        <h2>10. Závěrečná ustanovení</h2>
        <p>
          Tyto obchodní podmínky jsou účinné ode dne zveřejnění na webu a mohou
          být průběžně aktualizovány.
        </p>
      </section>
    </main>
  );
}