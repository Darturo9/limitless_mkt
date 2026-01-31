"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function AnimatedGradient() {
  const gradient1Ref = useRef<HTMLDivElement>(null);
  const gradient2Ref = useRef<HTMLDivElement>(null);
  const gradient3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gradient1 = gradient1Ref.current;
    const gradient2 = gradient2Ref.current;
    const gradient3 = gradient3Ref.current;

    if (!gradient1 || !gradient2 || !gradient3) return;

    // Animación flotante para cada gradiente
    gsap.to(gradient1, {
      x: 100,
      y: -50,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(gradient2, {
      x: -80,
      y: 60,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(gradient3, {
      x: 50,
      y: 80,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Animación de escala sutil
    gsap.to([gradient1, gradient2, gradient3], {
      scale: 1.2,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 2,
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Gradient 1 - Purple */}
      <div
        ref={gradient1Ref}
        className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-purple/20 blur-[120px]"
      />

      {/* Gradient 2 - Lime Green */}
      <div
        ref={gradient2Ref}
        className="absolute top-1/3 -right-1/4 h-[500px] w-[500px] rounded-full bg-lime-green/15 blur-[100px]"
      />

      {/* Gradient 3 - Neon Yellow */}
      <div
        ref={gradient3Ref}
        className="absolute -bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-neon-yellow/10 blur-[80px]"
      />
    </div>
  );
}
