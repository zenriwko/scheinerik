// src/components/%SEO/JsonLd.tsx
type JsonLdProps = {
  data: Record<string, any>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify keeps it valid JSON-LD (no trailing commas etc.)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}