import React from "react";
import { SectionLabel } from "./SectionLabel";

export interface InteriorPageHeroProps {
  number: string;
  label: string;
  title: React.ReactNode;
  description: string;
  image: string;
}

export function InteriorPageHero({
  number,
  label,
  title,
  description,
  image,
}: InteriorPageHeroProps) {
  return (
    <section className="interior-hero section-pad">
      <div className="interior-copy" data-reveal>
        <SectionLabel number={number} label={label} detail="LUNE / NIGERIA" />
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="interior-image" data-reveal="media">
        <img src={image} alt={label} />
        <div className="hero-vignette" />
      </div>
    </section>
  );
}
