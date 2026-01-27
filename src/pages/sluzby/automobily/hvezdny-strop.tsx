import SubServiceHero from "@/components/_Services/SubServiceHero/SubServiceHero";
import SubServiceInfoSteps from "@/components/_Services/SubServiceInfoSteps/SubServiceInfoSteps";
import SubServiceCardGrid from "@/components/_Services/SubServiceCardGrid/SubServiceCardGrid";
import SubServiceTwoColBullet from "@/components/_Services/SubServiceTwoColBullet/SubServiceTwoColBullet";
import FooterCTA from "@/components/FooterCTA/FooterCTA";

export default function HvezdnyStropPage() {
  return (
    <>
      <SubServiceHero
        title="Noční Obloha v Automobilu"
        subtitle="Optická vlákna ve stropnici vašeho vozu"
        lead={
          <>
            Zhruba 300&nbsp;m optického vlákna natažených ze zadní strany
            stropnice a zakončených do interiéru vozu. Vytváří efekt
            <strong> noční oblohy plné různě jasných hvězd</strong>.
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
          src: "/images/gallery/nn_roof_6.webp",
          alt: "Hvězdný strop instalovaný ve stropnici automobilu",
        }}
      />

      <SubServiceInfoSteps
        title="Jak instalace probíhá"
        subtitle="Postup od konzultace po předání vozu"
        paragraphs={[
          "Stropnici pečlivě demontujeme, připravíme rozložení hvězd a z vnitřní strany protáhneme jednotlivá optická vlákna. Svazek vláken je napojený na světelný zdroj ukrytý v interiéru.",
          "Hustotu hvězd, jejich rozložení i jas přizpůsobíme tak, aby výsledek působil přirozeně a ladil se stylem auta.",
        ]}
        steps={[
          {
            title: "Konzultace a návrh",
            text: "Pošlete nám fotky interiéru a stručnou představu. Domluvíme rozsah, barvy i typ efektů.",
          },
          {
            title: "Demontáž a instalace vláken",
            text: "Stropnici vyjmeme, připravíme otvory a ručně protáhneme stovky vláken do přesně zvolených míst.",
          },
          {
            title: "Oživení, test a předání",
            text: "Zapojíme jednotku, vše otestujeme, vysvětlíme ovládání a doladíme jas i režimy svícení.",
          },
        ]}
      />

      <SubServiceCardGrid
        title="Varianty noční oblohy"
        subtitle="Rozšiřte základní instalaci o pokročilé efekty"
        intro="Základní hvězdnou oblohu můžete rozšířit o pokročilé efekty a programovatelnou jednotku."
        cards={[
          {
            title: "Jednobarevná varianta",
            text: "Zvolená barva světla je nastavená napevno, nelze měnit barvu ani jas. Jednoduché zapnout / vypnout a hotovo.",
          },
          {
            title: "Programovatelné nebe",
            text: "Naše vlastní jednotka umožňuje nezávislé animace hvězd až ve 20 barvách současně, více než 150 programů a nastavení přes telefon včetně blikání na hudbu.",
          },
          {
            title: "Padající hvězdy",
            text: "Husté seskupení vláken v linii, která se animují v rychlé sekvenci. Každá hvězda má svůj vlastní zdroj – lze měnit barvu, jas i styl.",
          },
        ]}
      />
      <SubServiceTwoColBullet
        title="Vytlumení střechy"
        text="Když je stropnice dole kvůli instalaci vláken, je ideální čas doplnit i zvukovou a tepelnou izolaci střechy."
        bullets={[
          "Snížení hluku od deště, větru a provozu",
          "Stálejší teplota v interiéru",
          "Veškeré úpravy jsou skryté, vzhled interiéru se nemění",
        ]}
      />
      <FooterCTA />
    </>
  );
}
