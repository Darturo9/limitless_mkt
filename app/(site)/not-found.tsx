"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const particles = Array.from({ length: 20 }, (_, i) => ({
    color:
      i % 3 === 0
        ? "var(--lime-green)"
        : i % 3 === 1
          ? "var(--purple)"
          : "var(--neon-yellow)",
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
  }));

  useEffect(() => {
    const container = containerRef.current;
    const numbers = numbersRef.current;
    if (!container || !numbers) return;

    // Animación de entrada
    gsap.fromTo(
      numbers,
      { opacity: 0, scale: 0.5, rotateY: -90 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 1, ease: "back.out(1.7)" }
    );

    // Animación de glitch en el 404
    const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    glitchTl
      .to(numbers, { x: -5, duration: 0.1 })
      .to(numbers, { x: 5, duration: 0.1 })
      .to(numbers, { x: -3, duration: 0.1 })
      .to(numbers, { x: 0, duration: 0.1 })
      .to(numbers, { skewX: 5, duration: 0.1 })
      .to(numbers, { skewX: 0, duration: 0.1 });

    // Partículas flotantes
    const particles = container.querySelectorAll(".particle");
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        y: "random(-100, 100)",
        x: "random(-50, 50)",
        rotation: "random(-180, 180)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });

    return () => {
      glitchTl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6"
    >
      {/* Floating particles */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="particle absolute h-2 w-2 rounded-full opacity-20"
          style={{
            backgroundColor: particle.color,
            left: particle.left,
            top: particle.top,
          }}
        />
      ))}

      {/* 404 Number */}
      <div
        ref={numbersRef}
        className="relative mb-8 select-none"
        style={{ perspective: "1000px" }}
      >
        <span className="text-[150px] font-bold leading-none text-transparent md:text-[250px]"
          style={{
            WebkitTextStroke: "2px var(--lime-green)",
          }}
        >
          404
        </span>

        {/* Glow effect */}
        <span
          className="absolute inset-0 text-[150px] font-bold leading-none text-lime-green opacity-20 blur-2xl md:text-[250px]"
        >
          404
        </span>
      </div>

      {/* Message */}
      <h1 className="mb-4 text-center text-3xl font-bold text-cream md:text-4xl">
        Página no encontrada
      </h1>
      <p className="mb-8 max-w-md text-center text-cream/60">
        Parece que esta página se perdió en el espacio digital.
        No te preocupes, te ayudamos a volver al inicio.
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-lime-green px-8 py-4 text-center font-semibold text-black transition-all hover:scale-105 hover:bg-neon-yellow"
        >
          Volver al Inicio
        </Link>
        <Link
          href="/#contacto"
          className="rounded-full border-2 border-purple px-8 py-4 text-center font-semibold text-purple transition-all hover:bg-purple hover:text-white"
        >
          Contactar
        </Link>
      </div>

      {/* Fun element */}
      <p className="mt-12 text-sm text-cream/30">
        Error 404 • Sin límites, pero esta página no existe 😅
      </p>
    </div>
  );
}
