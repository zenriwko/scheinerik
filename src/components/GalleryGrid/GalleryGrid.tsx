"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import styles from "./GalleryGrid.module.css";
import "photoswipe/style.css";

const TOTAL_IMAGES = 18;
const IMAGES_PER_PAGE = 12;

// Fade timings (ms) — keep these in sync with your CSS transition duration
const FADE_OUT_MS = 220;
const FADE_IN_DELAY_MS = 50;

const galleryImages = [
  { src: "/images/gallery/nn_interior.webp", w: 1920, h: 1080 },
  { src: "/images/gallery/nn_o_nas.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_interior_1.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_duck.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_duck2.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_car.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_roof.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_roof_1.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_roof_3.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_roof_4.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_roof_5.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_roof_6.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_roof_7.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_roof_8.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_roof_9.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/NN_roof_in_progress.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/NN_roof_in_progress_1.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_woman_bag.webp", w: 1080, h: 1920 },
  { src: "/images/gallery/nn_woman_bag_1.webp", w: 1440, h: 1920 },
];

export default function GalleryGrid() {
  const [page, setPage] = useState(1);
  const [isFading, setIsFading] = useState(false);

  // <section> ref for smooth scrolling (fixes TS "never" issue)
  const galleryRef = useRef<HTMLElement | null>(null);

  const totalPages = Math.ceil(TOTAL_IMAGES / IMAGES_PER_PAGE);
  const startIndex = (page - 1) * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;

  const handlePageChange = (nextPage: number) => {
    if (nextPage === page) return;

    // Fade out first
    setIsFading(true);

    window.setTimeout(() => {
      // Switch page while faded out
      setPage(nextPage);

      // Scroll to top of gallery
      galleryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Fade back in shortly after DOM updates
      window.setTimeout(() => setIsFading(false), FADE_IN_DELAY_MS);
    }, FADE_OUT_MS);
  };

  return (
    <section ref={galleryRef} className={styles.gallery}>
      <div className={`container ${styles.wrap}`}>
        <Gallery>
          <div className={`${styles.grid} ${isFading ? styles.fading : ""}`}>
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
                    <a
                      ref={ref} // ✅ callback ref, no casting
                      href={img.src}
                      className={`${styles.card} ${!isVisible ? styles.hidden : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!isVisible) return;
                        open(e); // ✅ your version expects the event
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={`Galerie ${i + 1}`}
                        width={img.w}
                        height={img.h}
                        loading="lazy"
                        className={styles.image}
                      />
                      {isVisible && <span className={styles.number}>{i + 1}</span>}
                    </a>
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
              onClick={() => handlePageChange(i + 1)}
              disabled={isFading}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
