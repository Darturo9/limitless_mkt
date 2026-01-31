"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  color: "lime-green" | "purple" | "neon-yellow";
  index: number;
}

export default function ProjectCard({
  title,
  category,
  description,
  color,
  index,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.5,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.5,
    });
  };

  const colorClasses = {
    "lime-green": "border-lime-green/30 hover:border-lime-green/60 hover:shadow-lime-green/20",
    purple: "border-purple/30 hover:border-purple/60 hover:shadow-purple/20",
    "neon-yellow": "border-neon-yellow/30 hover:border-neon-yellow/60 hover:shadow-neon-yellow/20",
  };

  const bgColors = {
    "lime-green": "bg-lime-green/10",
    purple: "bg-purple/10",
    "neon-yellow": "bg-neon-yellow/10",
  };

  const textColors = {
    "lime-green": "text-lime-green",
    purple: "text-purple",
    "neon-yellow": "text-neon-yellow",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group cursor-pointer rounded-2xl border bg-dark-blue/50 p-6 transition-all duration-300 hover:shadow-xl ${colorClasses[color]}`}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      data-cursor-hover
    >
      {/* Image placeholder */}
      <div className="relative mb-6 overflow-hidden rounded-xl aspect-video">
        <div
          ref={imageRef}
          className={`absolute inset-0 ${bgColors[color]} flex items-center justify-center transition-transform`}
        >
          <span className={`text-6xl font-bold ${textColors[color]} opacity-30`}>
            0{index + 1}
          </span>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="rounded-full border-2 border-cream px-6 py-2 text-sm font-medium text-cream">
            Ver Proyecto
          </span>
        </div>
      </div>

      {/* Content */}
      <span className={`text-xs font-medium uppercase tracking-wider ${textColors[color]}`}>
        {category}
      </span>
      <h3 className="mt-2 text-xl font-bold text-cream transition-colors group-hover:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-cream/50 line-clamp-2">{description}</p>
    </div>
  );
}
