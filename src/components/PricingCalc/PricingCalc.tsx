import { useState } from "react";
import styles from "./PricingCalc.module.css";

export default function PricingCalc() {
  const [area, setArea] = useState(10); // m² or car interior size
  const [fiberCount, setFiberCount] = useState(100); // number of fiber points
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    // Example formula: (area * 800) + (fiberCount * 10)
    const estimate = area * 800 + fiberCount * 10;
    setResult(estimate);
  };

  return (
    <section className={styles.calc}>
      <div className={`container ${styles.wrap}`}>
        <h2>Kalkulačka ceny</h2>
        <p className={styles.intro}>
          Zadejte přibližnou plochu a počet vláken pro orientační výpočet ceny.
        </p>

        <div className={styles.form}>
          <div className={styles.field}>
            <label>Plocha (m²)</label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              min={1}
            />
          </div>

          <div className={styles.field}>
            <label>Počet optických vláken</label>
            <input
              type="number"
              value={fiberCount}
              onChange={(e) => setFiberCount(Number(e.target.value))}
              min={10}
            />
          </div>

          <button onClick={handleCalculate} className="button">
            Spočítat cenu
          </button>
        </div>

        {result !== null && (
          <div className={styles.result}>
            <p>Odhadovaná cena: <span>{result.toLocaleString()} Kč</span></p>
            <small>Cena je pouze orientační. Pro přesnou nabídku nás kontaktujte.</small>
          </div>
        )}
      </div>
    </section>
  );
}