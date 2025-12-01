"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/style.css";

interface LightboxItem {
  src: string;
  w: number;
  h: number;
  text?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  children: (items: LightboxItem[], ItemComponent: typeof Item) => React.ReactNode;
}

export default function Lightbox({ items, children }: LightboxProps) {
  return (
    <Gallery>
      {children(items, Item)}
    </Gallery>
  );
}