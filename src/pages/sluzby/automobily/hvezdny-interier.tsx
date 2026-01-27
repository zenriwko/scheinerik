import SubServiceHero from "@/components/_Services/SubServiceHero/SubServiceHero";
import SubServiceInfoSteps from "@/components/_Services/SubServiceInfoSteps/SubServiceInfoSteps";
import SubServiceCardGrid from "@/components/_Services/SubServiceCardGrid/SubServiceCardGrid";
import SubServiceTwoColBullet from "@/components/_Services/SubServiceTwoColBullet/SubServiceTwoColBullet";
import FooterCTA from "@/components/FooterCTA/FooterCTA";

export default function OptickaVlaknaInterierAutaPage() {
  return (
    <>
      <SubServiceHero
        title="Noční nebe v dekoru auta"
        subtitle="Hvězdné nebe a ambientní efekty do stropnice, výplní a detailů"
        lead={
          <>
            Ručně instalujeme optická vlákna do interiéru vozů a vytváříme
            <strong> realistické hvězdné nebe</strong> nebo jemné světelné
            akcenty. Návrh vždy přizpůsobíme typu auta, zóně instalace a tomu,
            jak má výsledek působit ve dne i v noci.
          </>
        }
        primaryCta={{
          href: "/nase-prace",
          label: "Naše Práce",
        }}
        secondaryCta={{
          href: "/kontakt",
          label: "Nezávazná poptávka",
          variant: "secondary",
        }}
        image={{
          src: "/images/opticka-vlakna-interier-auta.webp",
          alt: "Optická vlákna a hvězdné nebe v interiéru auta",
        }}
      />

      <SubServiceInfoSteps
        title="Jak instalace probíhá"
        subtitle="Postup od návrhu po předání vozu"
        paragraphs={[
          "Začneme konzultací a návrhem: kde bude efekt (stropnice, výplně, obložení) a jaká má být hustota hvězd / světelných bodů. Následně připravíme díly pro instalaci a ručně protáhneme jednotlivá optická vlákna do přesně zvolených míst.",
          "Napojení na světelnou jednotku řešíme tak, aby bylo skryté, bezpečné a servisovatelné. Po dokončení vše otestujeme, nastavíme jas a režimy a vysvětlíme ovládání.",
        ]}
        steps={[
          {
            title: "Konzultace a návrh efektu",
            text: "Pošlete fotky interiéru a představu. Doporučíme zónu instalace, hustotu hvězd, barvy a vhodné efekty podle typu vozu.",
          },
          {
            title: "Příprava dílů a instalace vláken",
            text: "Demontujeme / připravíme vybrané části (např. stropnici). Vytvoříme přesné body a ručně protáhneme stovky vláken pro přirozený, nerušivý vzhled.",
          },
          {
            title: "Zapojení, test a předání",
            text: "Skrytě umístíme světelnou jednotku, vše zapojíme, otestujeme a nastavíme režimy. Předáme vůz včetně instrukcí k ovládání.",
          },
        ]}
      />

      <SubServiceCardGrid
        title="Varianty a efekty"
        subtitle="Od čisté elegance po dynamické animace"
        intro="Základní instalaci lze rozšířit o programovatelnou jednotku, více režimů a výrazné dynamické efekty podle stylu interiéru."
        cards={[
          {
            title: "Jednobarevná varianta",
            text: "Stálá barva a jas pro čistý, elegantní výsledek. Jednoduché ovládání – zapnout / vypnout bez dalších režimů.",
          },
          {
            title: "Programovatelné hvězdné nebe",
            text: "Animace, změna jasu a barevné režimy. Ovládání přes dálkový ovladač nebo telefon (dle zvolené jednotky) a možnost uložit vlastní nastavení.",
          },
          {
            title: "Padající hvězdy / shooting stars",
            text: "Speciální linie vláken vytváří efekt prolétajících hvězd. Lze upravit rychlost, intenzitu i frekvenci, aby efekt působil přirozeně.",
          },
        ]}
      />

      <SubServiceTwoColBullet
        title="Kam se optická vlákna v autě hodí"
        text="Efekt může být dominantní prvek i jemné ambientní osvětlení. Doporučíme umístění tak, aby výsledek ladil s interiérem a nerušil při jízdě."
        bullets={[
          "Stropnice (nejčastější řešení pro hvězdné nebe)",
          "A/B/C sloupky a stropní detaily",
          "Výplně dveří a vybrané obložení",
          "Středová konzole a designové akcenty",
          "Skryté umístění světelné jednotky + bezpečné vedení kabeláže",
        ]}
      />

      <FooterCTA />
    </>
  );
}