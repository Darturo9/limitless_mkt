"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // -1 to 1, negative = opposite direction
  className?: string;
}

export default function Parallax({
  children,
  speed = 0.5,
  className = "",
}: ParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const yMovement = speed * 100;

    gsap.to(element, {
      y: yMovement,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
