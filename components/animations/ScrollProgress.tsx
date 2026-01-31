"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

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
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progressBar = progressRef.current;
    if (!progressBar) return;

    // Detectar scroll position compatible con todos los navegadores
    const getScrollPosition = () => {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    };

    const getScrollHeight = () => {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
    };

    const updateProgress = () => {
      const scrollHeight = getScrollHeight() - window.innerHeight;
      const scrolled = getScrollPosition();
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;

      // Usar GSAP para animación fluida compatible con todos los navegadores
      gsap.to(progressBar, {
        width: `${Math.min(100, Math.max(0, progress))}%`,
        duration: 0.1,
        ease: "none",
        force3D: true, // Hardware acceleration para mejor performance
      });
    };

    // Soporte para todos los navegadores
    const scrollEvent = "onscroll" in window ? "scroll" : "touchmove";
    window.addEventListener(scrollEvent, updateProgress, { passive: true });

    // requestAnimationFrame con fallback para navegadores antiguos
    let rafId: number;
    const raf = window.requestAnimationFrame ||
                ((callback) => window.setTimeout(callback, 1000 / 60));
    const cancelRaf = window.cancelAnimationFrame ||
                      ((id) => window.clearTimeout(id));

    const rafUpdate = () => {
      updateProgress();
      rafId = raf(rafUpdate);
    };
    rafId = raf(rafUpdate);

    updateProgress();

    return () => {
      window.removeEventListener(scrollEvent, updateProgress);
      cancelRaf(rafId);
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 z-50"
      style={{
        [position]: 0,
        height: `${height}px`,
        backgroundColor: "rgba(255,255,255,0.1)",
        WebkitBackfaceVisibility: "hidden", // Safari fix
        backfaceVisibility: "hidden",
      }}
    >
      <div
        ref={progressRef}
        className="h-full will-change-transform"
        style={{
          width: "0%",
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
          WebkitTransform: "translateZ(0)", // Safari hardware acceleration
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
