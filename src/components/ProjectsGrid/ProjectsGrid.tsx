import { useState } from "react";
import styles from "./ProjectsGrid.module.css";

interface Project {
  id: number;
  title: string;
  category: "residential" | "automotive";
  image: string;
}

const sampleProjects: Project[] = [
  {
    id: 1,
    title: "Rezidenční ložnice – hvězdný strop",
    category: "residential",
    image: "https://picsum.photos/1920/1080?random=101",
  },
  {
    id: 2,
    title: "Luxusní automobil – interiér s vlákny",
    category: "automotive",
    image: "https://picsum.photos/1920/1080?random=102",
  },
  {
    id: 3,
    title: "Obývací pokoj s efektem noční oblohy",
    category: "residential",
    image: "https://picsum.photos/1920/1080?random=103",
  },
  {
    id: 4,
    title: "Interiér vozu Porsche – ambientní hvězdy",
    category: "automotive",
    image: "https://picsum.photos/1920/1080?random=104",
  },
];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<"all" | "residential" | "automotive">("all");

  const filteredProjects =
    filter === "all"
      ? sampleProjects
      : sampleProjects.filter((p) => p.category === filter);

  return (
    <section className={styles.projects}>
      <div className={`container ${styles.wrap}`}>
        <div className={styles.header}>
          <h2>Naše Realizace</h2>
          <div className={styles.filters}>
            <button
              onClick={() => setFilter("all")}
              className={`${styles.filterBtn} ${filter === "all" ? styles.active : ""}`}
            >
              Vše
            </button>
            <button
              onClick={() => setFilter("residential")}
              className={`${styles.filterBtn} ${filter === "residential" ? styles.active : ""}`}
            >
              Rezidenční
            </button>
            <button
              onClick={() => setFilter("automotive")}
              className={`${styles.filterBtn} ${filter === "automotive" ? styles.active : ""}`}
            >
              Automotive
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <img src={project.image} alt={project.title} />
              </div>
              <h3>{project.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}