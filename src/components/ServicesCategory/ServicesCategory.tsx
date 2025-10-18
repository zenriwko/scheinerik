import styles from "./ServicesCategory.module.css";
import Image from "next/image";

interface ServiceCategoryProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  reverse?: boolean;
}

export default function ServiceCategory({
  title,
  description,
  features,
  image,
  reverse = false,
}: ServiceCategoryProps) {
  return (
    <section
      className={`${styles.serviceCategory} ${reverse ? styles.reverse : ""}`}
    >
      <div className="container">
        <div className={styles.textBlock}>
          <h2>{title}</h2>
          <p>{description}</p>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className={styles.imageBlock}>
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}