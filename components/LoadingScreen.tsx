"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const progress = progressRef.current;
    const counter = counterRef.current;

    if (!container || !text || !progress || !counter) return;

    const tl = gsap.timeline();

    // Animación del contador
    tl.to(
      { value: 0 },
      {
        value: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function () {
          counter.textContent = Math.round(this.targets()[0].value) + "%";
        },
      }
    );

    // Barra de progreso
    tl.to(
      progress,
      {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
      },
      0
    );

    // Animación de texto letra por letra
    const letters = text.querySelectorAll(".letter");
    tl.fromTo(
      letters,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: "power2.out" },
      0.2
    );

    // Salida
    tl.to(text, {
      y: -50,
      opacity: 0,
      duration: 0.5,
      delay: 0.3,
    });

    tl.to(
      container,
      {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => setIsLoading(false),
      },
      "-=0.3"
    );
  }, []);

  if (!isLoading) return null;

  const brandName = "LIMITLESS";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-blue px-4"
    >
      {/* Logo animado */}
      <div ref={textRef} className="mb-6 sm:mb-8 flex">
        {brandName.split("").map((letter, index) => (
          <span
            key={index}
            className="letter text-3xl sm:text-5xl font-bold text-lime-green md:text-7xl"
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Barra de progreso */}
      <div className="relative h-1 w-36 sm:w-48 overflow-hidden rounded-full bg-cream/10">
        <div
          ref={progressRef}
          className="absolute left-0 top-0 h-full w-0 rounded-full bg-gradient-to-r from-lime-green to-neon-yellow"
        />
      </div>

      {/* Contador */}
      <span
        ref={counterRef}
        className="mt-3 sm:mt-4 font-mono text-xs sm:text-sm text-cream/50"
      >
        0%
      </span>
    </div>
  );
}
