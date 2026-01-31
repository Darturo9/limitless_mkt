"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function AnimatedGradient() {
  const gradient1Ref = useRef<HTMLDivElement>(null);
  const gradient2Ref = useRef<HTMLDivElement>(null);
  const gradient3Ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const gradient1 = gradient1Ref.current;
    const gradient2 = gradient2Ref.current;
    const gradient3 = gradient3Ref.current;

    if (!gradient1 || !gradient2 || !gradient3) return;

    // Pausar animaciones cuando la página no está visible
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animaciones más lentas y suaves para mejor performance
    const tl1 = gsap.to(gradient1, {
      x: 100,
      y: -50,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: !isVisible,
    });

    const tl2 = gsap.to(gradient2, {
      x: -80,
      y: 60,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: !isVisible,
    });

    const tl3 = gsap.to(gradient3, {
      x: 50,
      y: 80,
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: !isVisible,
    });

    const tl4 = gsap.to([gradient1, gradient2, gradient3], {
      scale: 1.1,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 3,
      paused: !isVisible,
    });

    // Controlar animaciones basado en visibilidad
    if (isVisible) {
      tl1.play();
      tl2.play();
      tl3.play();
      tl4.play();
    } else {
      tl1.pause();
      tl2.pause();
      tl3.pause();
      tl4.pause();
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      tl1.kill();
      tl2.kill();
      tl3.kill();
      tl4.kill();
    };
  }, [isVisible]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Gradient 1 - Lime Green */}
      <div
        ref={gradient1Ref}
        className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-lime-green/15 blur-[60px]"
        style={{ willChange: "transform" }}
      />

      {/* Gradient 2 - Neon Yellow */}
      <div
        ref={gradient2Ref}
        className="absolute top-1/3 -right-1/4 h-[500px] w-[500px] rounded-full bg-neon-yellow/12 blur-[50px]"
        style={{ willChange: "transform" }}
      />

      {/* Gradient 3 - Lime Green */}
      <div
        ref={gradient3Ref}
        className="absolute -bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-lime-green/10 blur-[40px]"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
