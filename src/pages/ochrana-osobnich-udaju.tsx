import SEO from "@/components/%SEO/SEO";
import SubHero from "@/components/SubHero/SubHero";

export default function OchranaOsobnichUdajuPage() {
  return (
    <>
      <SEO
        title="Ochrana osobních údajů"
        description=""
        path="/ochrana-osobnich-udaju"
        noindex
      />

      <main>
        <SubHero
          kicker="Právní informace"
          title="OCHRANA OSOBNÍCH ÚDAJŮ"
          subtitle="Jaké údaje zpracováváme, proč a jak s nimi nakládáme."
        />

        <section>
        <h2>1. Správce osobních údajů</h2>
        <p>
          
        </p>

        <h2>2. Jaké osobní údaje zpracováváme</h2>
        <p>
          Zpracováváme pouze údaje, které nám sami poskytnete, zejména při
          odeslání poptávky nebo v rámci další komunikace:
        </p>
        <ul>
          <li>jméno a příjmení,</li>
          <li>e-mailová adresa,</li>
          <li>telefonní číslo (volitelné),</li>
          <li>obsah zprávy,</li>
          <li>lokace (volitelná),</li>
          <li>fotografie vozidla nebo interiéru (pokud je poskytnete).</li>
        </ul>

        <h2>3. Účel zpracování</h2>
        <ul>
          <li>vyřízení poptávky a komunikace se zájemcem,</li>
          <li>příprava nabídky a návrhu řešení,</li>
          <li>realizace zakázky po vzniku závazné dohody,</li>
          <li>ochrana práv a evidence komunikace.</li>
        </ul>

        <h2>4. Právní základ zpracování</h2>
        <ul>
          <li>
            jednání o uzavření smlouvy a plnění smlouvy,
          </li>
          <li>
            oprávněný zájem správce (evidence komunikace, ochrana práv),
          </li>
          <li>
            souhlas – pouze tam, kde jej vyžaduje zákon (např. cookies).
          </li>
        </ul>

        <h2>5. Doba uchování údajů</h2>
        <p>
          Osobní údaje uchováváme po dobu nezbytně nutnou:
        </p>
        <ul>
          <li>poptávky bez realizace obvykle po dobu 12 měsíců,</li>
          <li>
            u realizovaných zakázek po dobu trvání smluvního vztahu a záruky,
            případně dle zákonných povinností.
          </li>
        </ul>

        <h2>6. Zpracování a předávání údajů</h2>
        <p>
          Údaje jsou zpracovávány prostřednictvím interních systémů a
          technického zázemí webu (API / backend). V nezbytném rozsahu mohou mít
          k údajům přístup ověření poskytovatelé technických služeb
          (hosting, e-mailová infrastruktura).
        </p>

        <h2>7. Cookies a analytika</h2>
        <p>
          Web využívá cookies. Základní cookies jsou nezbytné pro správné
          fungování webu. Analytické a marketingové nástroje (např. Google
          Analytics, Meta Pixel) jsou používány pouze v případě udělení
          souhlasu prostřednictvím cookie lišty.
        </p>

        <h2>8. Vaše práva</h2>
        <ul>
          <li>právo na přístup k osobním údajům,</li>
          <li>právo na opravu nebo výmaz,</li>
          <li>právo na omezení zpracování,</li>
          <li>právo vznést námitku proti zpracování,</li>
          <li>právo podat stížnost u Úřadu pro ochranu osobních údajů.</li>
        </ul>

        <h2>9. Kontakt</h2>
        <p>
          V případě dotazů ke zpracování osobních údajů nás můžete kontaktovat
          prostřednictvím kontaktního formuláře nebo e-mailem uvedeným na webu.
        </p>
      </section>
      </main>
    </>
  );
}