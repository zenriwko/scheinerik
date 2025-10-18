import styles from "./GalleryGrid.module.css";


const galleryImages = Array.from({ length: 12 }, (_, i) => 
  `https://picsum.photos/1920/1080?random=${i + 1}`
);

export default function GalleryGrid() {
  return (
    <section className={styles.gallery}>
      <div className={`container ${styles.wrap}`}>
        <h2 className={styles.heading}>Galerie projektů</h2>
        <div className={styles.grid}>
          {galleryImages.map((src, index) => (
            <div key={index} className={styles.card}>
              <img src={src} alt={`Galerie ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}