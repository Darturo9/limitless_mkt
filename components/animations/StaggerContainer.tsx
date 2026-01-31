"use client";

import { useRef, useEffect, ReactNode, Children } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export default function StaggerContainer({
  children,
  staggerDelay = 0.1,
  duration = 0.6,
  className = "",
  direction = "up",
  distance = 30,
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.children;

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

    gsap.set(items, initialProps);

    const animation = gsap.to(items, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      stagger: staggerDelay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [staggerDelay, duration, direction, distance]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
