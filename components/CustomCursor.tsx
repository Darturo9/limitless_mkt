"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Ocultar en dispositivos táctiles
    if (window.matchMedia("(pointer: coarse)").matches) {
      cursor.style.display = "none";
      cursorDot.style.display = "none";
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = Boolean(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      );

      const isHoverTarget = target.hasAttribute("data-cursor-hover");

      setIsPointer(isClickable);
      setIsHovering(isHoverTarget);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Animación de cambio de estado
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (isHovering) {
      gsap.to(cursor, {
        scale: 2.5,
        backgroundColor: "rgba(128, 193, 47, 0.2)",
        borderColor: "rgba(128, 193, 47, 0.8)",
        duration: 0.3,
      });
    } else if (isPointer) {
      gsap.to(cursor, {
        scale: 1.5,
        backgroundColor: "rgba(137, 13, 247, 0.1)",
        borderColor: "rgba(137, 13, 247, 0.8)",
        duration: 0.3,
      });
    } else {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 240, 0.5)",
        duration: 0.3,
      });
    }
  }, [isHovering, isPointer]);

  return (
    <>
      {/* Cursor outer ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cream/50 mix-blend-difference md:block"
        style={{ willChange: "transform" }}
      />
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-green md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
