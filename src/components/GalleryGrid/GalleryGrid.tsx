"use client";

import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import styles from "./GalleryGrid.module.css";
import "photoswipe/style.css";

const TOTAL_IMAGES = 50;
const IMAGES_PER_PAGE = 20;

const galleryImages = Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
  src: `https://picsum.photos/1920/1080?random=${i + 1}`,
  w: 1920,
  h: 1080,
}));

export default function GalleryGrid() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(TOTAL_IMAGES / IMAGES_PER_PAGE);
  const startIndex = (page - 1) * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;

  return (
    <section className={styles.gallery}>
      <div className={`container ${styles.wrap}`}>

        {/* Photoswipe wrapper holding ALL items */}
        <Gallery>
          <div className={styles.grid}>
            {galleryImages.map((img, i) => {
              const isVisible = i >= startIndex && i < endIndex;

              return (
                <Item
                  key={i}
                  original={img.src}
                  thumbnail={img.src}
                  width={img.w}
                  height={img.h}
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      className={`${styles.card} ${!isVisible ? styles.hidden : ""}`}
                      onClick={isVisible ? open : undefined}
                    >
                      <img
                        src={img.src}
                        alt={`Galerie ${i + 1}`}
                        loading="lazy"
                      />
                      {isVisible && <span className={styles.number}>{i + 1}</span>}
                    </div>
                  )}
                </Item>
              );
            })}
          </div>
        </Gallery>

        {/* Pagination */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`${styles.pageBtn} ${page === i + 1 ? styles.active : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
