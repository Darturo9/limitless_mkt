"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  as: Component = "p",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll(".char");

    gsap.set(chars, {
      opacity: 0,
      y: 20,
    });

    const animation = gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: staggerDelay,
      delay,
      ease: "power2.out",
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
  }, [delay, staggerDelay]);

  // Dividir texto en caracteres individuales
  const characters = text.split("").map((char, index) => (
    <span
      key={index}
      className="char inline-block"
      style={{ whiteSpace: char === " " ? "pre" : "normal" }}
    >
      {char}
    </span>
  ));

  return (
    <Component ref={containerRef as React.RefObject<HTMLHeadingElement>} className={className}>
      {characters}
    </Component>
  );
}
