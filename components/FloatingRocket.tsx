"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import RocketAnimation from "./RocketAnimation";

export default function FloatingRocket() {
  const rocketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rocket = rocketRef.current;
    if (!rocket) return;

    // Animación flotante suave
    gsap.to(rocket, {
      y: -30,
      x: 20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Rotación sutil
    gsap.to(rocket, {
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div
      ref={rocketRef}
      className="pointer-events-none absolute right-[5%] top-[20%] z-10 opacity-20 hidden lg:block"
    >
      <RocketAnimation className="h-32 w-32" speed={0.8} />
    </div>
  );
}
