"use client";

import { useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: "top" | "bottom";
}

export default function ScrollProgress({
  color = "var(--lime-green)",
  height = 3,
  position = "top",
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setProgress(progress);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 z-50"
      style={{
        [position]: 0,
        height: `${height}px`,
        backgroundColor: "rgba(255,255,255,0.1)",
      }}
    >
      <div
        className="h-full transition-all duration-100 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    </div>
  );
}
