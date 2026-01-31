"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 50,
  className = "",
  once = true,
}: FadeInProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Configurar posición inicial según dirección
    const initialProps: gsap.TweenVars = {
      opacity: 0,
    };

    switch (direction) {
      case "up":
        initialProps.y = distance;
        break;
      case "down":
        initialProps.y = -distance;
        break;
      case "left":
        initialProps.x = distance;
        break;
      case "right":
        initialProps.x = -distance;
        break;
    }

    gsap.set(element, initialProps);

    const animation = gsap.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction, delay, duration, distance, once]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
