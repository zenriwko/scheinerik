import { useState, useEffect } from "react";
import styles from "./PricingCalc.module.css";

export default function PricingCalc() {
  const [carType, setCarType] = useState("sedan");
  const [base, setBase] = useState("none");
  const [addons, setAddons] = useState<string[]>([]);
  const [montaz, setMontaz] = useState("none");
  const [total, setTotal] = useState(0);

  const toggleAddon = (value: string) => {
    setAddons((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    let sum = 0;

    // Základ
    if (base === "programmable") sum += 18000;

    // Typ vozidla
    if (carType === "suv") sum += 3500;

    // Addons
    if (addons.includes("falling")) sum += 5000;
    if (addons.includes("real")) sum += 5000;
    if (addons.includes("dekor")) sum += 2500;
    if (addons.includes("dekorSmart")) sum += 4000;
    if (addons.includes("logo")) sum += 5000;
    if (addons.includes("sunroof")) sum += 4500;
    if (addons.includes("ambient")) sum += 12000;

    // Montáž
    if (montaz === "termo") sum += 3500;

    setTotal(sum);
  }, [base, carType, addons, montaz]);

  return (
    <div className={styles.inner}>
      <h2 className={styles.heading}>Cenová kalkulace</h2>
      <p className={styles.desc}>
        Vyberte požadované možnosti pro orientační výpočet ceny.
      </p>

      <div className={styles.form}>

        {/* Základní instalace */}
        <div className={styles.field}>
          <label>Základní instalace</label>
          <select value={base} onChange={(e) => setBase(e.target.value)}>
            <option value="none">Žádná</option>
            <option value="programmable">
              Programovatelné noční nebe (+18 000 Kč)
            </option>
          </select>
        </div>

        {/* Typ vozidla */}
        <div className={styles.field}>
          <label>Typ vozidla</label>
          <select value={carType} onChange={(e) => setCarType(e.target.value)}>
            <option value="sedan">Sedan / Coupe</option>
            <option value="suv">Combi / SUV (+3 500 Kč)</option>
          </select>
        </div>

        {/* Addons */}
        <div className={styles.field}>
          <label>Příplatkové možnosti</label>
          <div className={styles.checkGroup}>

            <label>
              <input
                type="checkbox"
                checked={addons.includes("falling")}
                onChange={() => toggleAddon("falling")}
              />
              Padající hvězda (+5 000 Kč)
            </label>

            <label>
              <input
                type="checkbox"
                checked={addons.includes("real")}
                onChange={() => toggleAddon("real")}
              />
              Reálná obloha (+5 000 Kč)
            </label>

            <label>
              <input
                type="checkbox"
                checked={addons.includes("dekor")}
                onChange={() => toggleAddon("dekor")}
              />
              Dekor / ks (+2 500 Kč)
            </label>

            <label>
              <input
                type="checkbox"
                checked={addons.includes("dekorSmart")}
                onChange={() => toggleAddon("dekorSmart")}
              />
              Dekor Smart (+4 000 Kč)
            </label>

            <label>
              <input
                type="checkbox"
                checked={addons.includes("logo")}
                onChange={() => toggleAddon("logo")}
              />
              Logo (+5 000 Kč)
            </label>

            <label>
              <input
                type="checkbox"
                checked={addons.includes("sunroof")}
                onChange={() => toggleAddon("sunroof")}
              />
              Šíbr (+4 500 Kč)
            </label>

            <label>
              <input
                type="checkbox"
                checked={addons.includes("ambient")}
                onChange={() => toggleAddon("ambient")}
              />
              Ambient Smart (+12 000 Kč)
            </label>

          </div>
        </div>

        {/* Montáž */}
        <div className={styles.field}>
          <label>Montáž</label>
          <select value={montaz} onChange={(e) => setMontaz(e.target.value)}>
            <option value="none">Bez termoizolace</option>
            <option value="termo">Termoizolace (+3 500 Kč)</option>
          </select>
        </div>

      </div>

      {total > 0 && (
        <div className={styles.result}>
          <p>Předběžná cena:</p>
          <h3>{total.toLocaleString("cs-CZ")} Kč</h3>
          <span>(bez DPH)</span>
        </div>
      )}
    </div>
  );
}