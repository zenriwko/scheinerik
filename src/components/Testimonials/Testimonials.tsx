import './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container testimonials">
        <h2 className="reveal">Klienti říkají</h2>
        <div className="grid quotes">
          <div className="quote reveal">
            „Večer v ložnici má konečně atmosféru. Třpyt je jemný, nic neruší, instalace byla naprosto čistá.“
            <div className="who">— Petra, Praha 6</div>
          </div>
          <div className="quote reveal">
            „V M8 to vypadá šíleně dobře. Stmívání i scény fungují perfektně – přesně ten efekt, který jsem chtěl.“
            <div className="who">— Martin, BMW M</div>
          </div>
          <div className="quote reveal">
            „Domácí kino působí jako malá galerie. Doporučil i světelné lišty, všechno na jedné scéně.“
            <div className="who">— Jan, Brno</div>
          </div>
        </div>
      </div>
    </section>
  );
}