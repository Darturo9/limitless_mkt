"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    // Inicializar Lenis
    const lenis = new Lenis({
      duration: isCoarsePointer ? 0.8 : 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.95,
    });

    lenisRef.current = lenis;

    // Conectar Lenis con GSAP ScrollTrigger
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
