"use client";

import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import styles from "./GalleryFeatured.module.css";
import "photoswipe/style.css";

export default function GalleryFeatured() {
  const items = [
    { src: "/images/prototype1.jpg", text: "Hvězdný strop • sedan", w: 1920, h: 1080 },
    { src: "/images/prototype2.jpg", text: "Hvězdný strop • SUV", w: 1920, h: 1080 },
    { src: "/images/prototype3.jpg", text: "Optické světlo v TV stěně", w: 1920, h: 1080 },
    { src: "/images/prototype4.jpg", text: "Barový pult s ambientním světlem", w: 1920, h: 1080 },
    { src: "/images/prototype5.jpg", text: "Ložnice s hvězdnou oblohou", w: 1920, h: 1080 },
    { src: "/images/prototype1.jpg", text: "Domácí kino • hvězdný strop", w: 1920, h: 1080 }
  ];

  return (
    <section id="galleryFeatured" className="section">
      <div className={`container ${styles.inner}`}>
        <h2>Galerie</h2>
        <h3>Ukázky našich realizací</h3>
        <p>V naší galerii najdete skutečné ukázky instalací hvězdných stropů...</p>

        <Gallery>
          <div className={styles.galleryGrid}>
            {items.map((item, i) => (
              <Item
                key={i}
                original={item.src}
                thumbnail={item.src}
                width={item.w}
                height={item.h}
              >
                {({ ref, open }) => (
                  <div ref={ref} onClick={open} className={styles.galleryItem}>
                    <div className={styles.imageWrap}>
                      <Image
                        src={item.src}
                        alt={item.text}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={styles.image}
                      />
                      <div className={styles.imageText}>{item.text}</div>
                    </div>
                  </div>
                )}
              </Item>
            ))}
          </div>
        </Gallery>
      </div>
    </section>
  );
}