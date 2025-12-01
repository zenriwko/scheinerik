import { useState, useEffect } from "react";
import styles from "./PricingCalc.module.css";

export default function PricingCalc() {
  const [carType, setCarType] = useState("sedan");
  const [skyType, setSkyType] = useState("single");
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

    // Základní varianty
    if (skyType === "single") sum += 10000;
    if (skyType === "programmable") sum += 15000;
    if (carType === "suv") sum += 3000;

    // Příplatkové možnosti
    if (addons.includes("real")) sum += 4000;
    if (addons.includes("dekor")) sum += 4000;
    if (addons.includes("logo")) sum += 4000;
    if (addons.includes("falling")) sum += 4500;

    // Montáž a servis
    if (montaz === "termo-sedan") sum += 3000;
    if (montaz === "termo-suv") sum += 4000;

    setTotal(sum);
  }, [carType, skyType, addons, montaz]); // Auto-update when anything changes

  return (
      <div className={styles.inner}>
        <h2 className={styles.heading}>Cenová kalkulace</h2>
        <p className={styles.desc}>
          Vyberte typ instalace a příplatkové možnosti pro orientační odhad ceny.
        </p>

        <div className={styles.form}>
          {/* Typ vozidla */}
          <div className={styles.field}>
            <label>Typ vozidla</label>
            <select value={carType} onChange={(e) => setCarType(e.target.value)}>
              <option value="sedan">Sedan / Coupe</option>
              <option value="suv">Combi / SUV (+3 000 Kč)</option>
            </select>
          </div>

          {/* Typ hvězdného nebe */}
          <div className={styles.field}>
            <label>Typ hvězdného nebe</label>
            <select value={skyType} onChange={(e) => setSkyType(e.target.value)}>
              <option value="none">Žádné</option>
              <option value="single">Jednobarevné (10 000 Kč)</option>
              <option value="programmable">Programovatelné (15 000 Kč)</option>
            </select>
          </div>

          {/* Příplatkové možnosti */}
          <div className={styles.field}>
            <label>Příplatkové možnosti</label>
            <div className={styles.checkGroup}>
              <label>
                <input
                  type="checkbox"
                  checked={addons.includes("real")}
                  onChange={() => toggleAddon("real")}
                />
                Reálná obloha (+4 000 Kč)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={addons.includes("dekor")}
                  onChange={() => toggleAddon("dekor")}
                />
                Noční nebe do dekoru (+4 000 Kč)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={addons.includes("logo")}
                  onChange={() => toggleAddon("logo")}
                />
                Logo z hvězd (+4 000 Kč)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={addons.includes("falling")}
                  onChange={() => toggleAddon("falling")}
                />
                Padající hvězda (animace) (+4 500 Kč)
              </label>
            </div>
          </div>

          {/* Montáž a servis */}
          <div className={styles.field}>
            <label>Montáž a servis</label>
            <select value={montaz} onChange={(e) => setMontaz(e.target.value)}>
              <option value="none">Bez termoizolace</option>
              <option value="termo-sedan">
                Termoizolace střechy (Sedan/Coupe) (+3 000 Kč)
              </option>
              <option value="termo-suv">
                Termoizolace střechy (Combi/SUV) (+4 000 Kč)
              </option>
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