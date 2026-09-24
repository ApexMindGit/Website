"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function MediaVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster?: string;
  label: string;
}) {
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  if (reduceMotion && poster) {
    return (
      <Image
        className="media-slot-video"
        src={poster}
        alt={label}
        width={1920}
        height={1080}
        sizes="(max-width: 768px) 100vw, 60vw"
      />
    );
  }

  return (
    <video
      className="media-slot-video"
      src={src}
      poster={poster}
      autoPlay={!reduceMotion}
      key={reduceMotion ? "still" : "motion"}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
