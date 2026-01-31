"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    // Duplicar contenido para efecto infinito
    const scrollerContent = Array.from(scroller.children);
    scrollerContent.forEach((item) => {
      const clone = item.cloneNode(true);
      scroller.appendChild(clone);
    });

    const totalWidth = scroller.scrollWidth / 2;
    const duration = totalWidth / speed;

    const tl = gsap.timeline({ repeat: -1 });

    if (direction === "left") {
      tl.fromTo(
        scroller,
        { x: 0 },
        { x: -totalWidth, duration, ease: "none" }
      );
    } else {
      gsap.set(scroller, { x: -totalWidth });
      tl.to(scroller, { x: 0, duration, ease: "none" });
    }

    if (pauseOnHover) {
      container.addEventListener("mouseenter", () => tl.pause());
      container.addEventListener("mouseleave", () => tl.resume());
    }

    return () => {
      tl.kill();
    };
  }, [speed, direction, pauseOnHover]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={scrollerRef} className="flex w-max">
        {children}
      </div>
    </div>
  );
}
