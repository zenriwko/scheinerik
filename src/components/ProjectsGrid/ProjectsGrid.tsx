// ProjectsGrid.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/style.css";

import styles from "./ProjectsGrid.module.css";

type Category = "autoInterior" | "objects" | "furniture";
type FilterType = "all" | Category;

interface Project {
  id: number;
  name: string;
  category: Category;
  images: string[];
}

type Size = { w: number; h: number };


const sampleProjects: Project[] = [
  {
    id: 1,
    name: "BMW X6 - programovatelné noční nebe",
    category: "autoInterior",
    images: [
      "/images/projects/bmw-x7-exterior.webp",
      "/images/projects/bmw-x7-interior.webp",
      "/images/projects/bmw-x7-interior-2.webp",
    ],
  },
  {
    id: 2,
    name: "Mercedes S Maybach - programovatelné noční nebe",
    category: "autoInterior",
    images: [
      "/images/projects/mercedes-s-maybach.webp",
      "/images/projects/mercedes-s-maybach-1.webp",
      "/images/projects/mercedes-s-maybach-2.webp",
      "/images/projects/mercedes-s-maybach-3.webp",
    ],
  },
  {
    id: 3,
    name: "Rolls Royce Cullinan - jednobarevné nebe",
    category: "autoInterior",
    images: [
      "/images/projects/rolls-royce-cullinan.webp",
      "/images/projects/rolls-royce-cullinan-1.webp",
      "/images/projects/rolls-royce-cullinan-2.webp",
    ],
  },
  {
    id: 4,
    name: "Mercedes G63 AMG - jednobarevné nebe",
    category: "autoInterior",
    images: [
      "/images/projects/mercedes-g63-amg.webp",
      "/images/projects/mercedes-g63-amg-1.webp",
      "/images/projects/mercedes-g63-amg-2.webp",
      "/images/projects/mercedes-g63-amg-3.webp",
    ],
  },
  {
    id: 5,
    name: "Mercedes G500 4X4 - jednobarevné nebe",
    category: "autoInterior",
    images: [
      "/images/projects/mercedes-g500-4x4.webp",
      "/images/projects/mercedes-g500-4x4-1.webp",
      "/images/projects/mercedes-g500-4x4-2.webp",
    ],
  },
  {
    id: 6,
    name: "Audi Q5 - programovatelné nebe, jednobarevný dekor",
    category: "autoInterior",
    images: [
      "/images/projects/audi-q5.webp",
      "/images/projects/audi-q5-1.webp",
      "/images/projects/audi-q5-2.webp",
      "/images/projects/audi-q5-3.webp",
      "/images/projects/audi-q5-4.webp",
      "/images/projects/audi-q5-5.webp",
    ],
  },
  {
    id: 7,
    name: "Dodge Durango - programovatelné nebe se šíbrem",
    category: "autoInterior",
    images: [
      "/images/projects/dodge-durango.webp",
      "/images/projects/dodge-durango-1.webp",
      "/images/projects/dodge-durango-2.webp",
      "/images/projects/dodge-durango-3.webp",
      "/images/projects/dodge-durango-4.webp",
    ],
  },
  {
    id: 8,
    name: "BMW E39 - jednobarevné nebe do dekoru",
    category: "autoInterior",
    images: [
      "/images/projects/bmw-e39.webp",
      "/images/projects/bmw-e39-1.webp",
      "/images/projects/bmw-e39-2.webp",
      "/images/projects/bmw-e39-3.webp",
    ],
  },
  {
    id: 9,
    name: "Škoda Kodiaq RS - programovatelné nebe a padající hvězda",
    category: "autoInterior",
    images: [
      "/images/projects/skoda-kodiaq-rs.webp",
      "/images/projects/skoda-kodiaq-rs-1.webp",
      "/images/projects/skoda-kodiaq-rs-2.webp",
      "/images/projects/skoda-kodiaq-rs-3.webp",
    ],
  },
  {
    id: 10,
    name: "Mercedes C43 AMG - programovatelné nebe okolo okna",
    category: "autoInterior",
    images: [
      "/images/projects/mercedes-c43-amg.webp",
      "/images/projects/mercedes-c43-amg-1.webp",
      "/images/projects/mercedes-c43-amg-2.webp",
      "/images/projects/mercedes-c43-amg-3.webp",
    ],
  },
  {
    id: 11,
    name: "BMW M4 - programovatelné nebe",
    category: "autoInterior",
    images: [
      "/images/projects/bmw-m4.webp",
      "/images/projects/bmw-m4-1.webp",
      "/images/projects/bmw-m4-2.webp",
      "/images/projects/bmw-m4-3.webp",
      "/images/projects/bmw-m4-4.webp",
      "/images/projects/bmw-m4-5.webp",
    ],
  },
];

function loadSize(src: string): Promise<Size> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () =>
      resolve({
        w: img.naturalWidth || img.width || 1600,
        h: img.naturalHeight || img.height || 900,
      });
    img.onerror = () => resolve({ w: 1600, h: 900 }); // safe fallback
    img.src = src;
  });
}

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sizes, setSizes] = useState<Record<string, Size>>({});

  const filteredProjects = useMemo(() => {
    return filter === "all"
      ? sampleProjects
      : sampleProjects.filter((p) => p.category === filter);
  }, [filter]);

  // Preload natural dimensions so PhotoSwipe opens smoothly (no width snap)
  useEffect(() => {
    const srcs = filteredProjects.flatMap((p) => p.images).filter(Boolean);
    const missing = srcs.filter((s) => !sizes[s]);
    if (missing.length === 0) return;

    let cancelled = false;

    (async () => {
      const entries = await Promise.all(
        missing.map(async (src) => [src, await loadSize(src)] as const)
      );

      if (cancelled) return;

      setSizes((prev) => {
        const next = { ...prev };
        for (const [src, size] of entries) next[src] = size;
        return next;
      });
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProjects]);

  return (
    <section className={styles.projects}>
      <div className={`container ${styles.wrap}`}>
        <div className={styles.header}>
          <div className={styles.filters}>
            {[
              { key: "all", label: "Vše" },
              { key: "autoInterior", label: "Interiér automobilu" },
              /*{ key: "objects", label: "Předměty" },{ key: "furniture", label: "Nábytek" }*/
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as FilterType)}
                className={`${styles.filterBtn} ${
                  filter === key ? styles.active : ""
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <Gallery
          options={{
            bgOpacity: 0.9,
            padding: { top: 24, bottom: 24, left: 24, right: 24 },
            initialZoomLevel: "fit",
            secondaryZoomLevel: 1,
            maxZoomLevel: 2,
            showHideAnimationType: "fade",
            zoomAnimationDuration: 0,
            imageClickAction: false,
            tapAction: "toggle-controls",
            doubleTapAction: "zoom",
          }}
        >
          <div className={styles.projectsList}>
            {filteredProjects.map((project) => (
              <article key={project.id} className={styles.projectBlock}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <div className={styles.divider} />
            
                <Gallery
                  options={{
                    bgOpacity: 0.9,
                    padding: { top: 24, bottom: 24, left: 24, right: 24 },
                    initialZoomLevel: "fit",
                    secondaryZoomLevel: 1,
                    maxZoomLevel: 2,
                    showHideAnimationType: "fade",
                    zoomAnimationDuration: 0,
                    imageClickAction: false,
                    tapAction: "toggle-controls",
                    doubleTapAction: "zoom",
                  }}
                >
                  <div className={styles.imagesGrid}>
                    {project.images
                      .filter(Boolean)
                      .slice(0, 4)
                      .map((src, idx) => {
                        const s = sizes[src] ?? { w: 1600, h: 900 };
                      
                        return (
                          <Item
                            key={`${project.id}-${idx}`}
                            original={src}
                            thumbnail={src}
                            width={s.w}
                            height={s.h}
                          >
                            {({ ref, open }) => (
                              <button
                                type="button"
                                className={styles.imageCard}
                                onClick={open}
                                aria-label={`Otevřít: ${project.name} – foto ${idx + 1}`}
                              >
                                <img
                                  ref={ref as any}
                                  src={src}
                                  alt={`${project.name} – foto ${idx + 1}`}
                                  loading="lazy"
                                  className={styles.thumbImg}
                                />
                                <span className={styles.overlay} />
                              </button>
                            )}
                          </Item>
                        );
                      })}
                  </div>
                </Gallery>
              </article>
            ))}
          </div>
        </Gallery>
      </div>
    </section>
  );
}
