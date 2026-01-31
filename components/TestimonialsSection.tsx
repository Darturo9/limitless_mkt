"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { FadeIn } from "@/components/animations";

const testimonials = [
  {
    name: "María García",
    role: "CEO, TechStartup",
    content:
      "Limitless transformó completamente nuestra presencia digital. En 3 meses duplicamos nuestros leads y el ROI superó todas las expectativas.",
    rating: 5,
    color: "lime-green",
  },
  {
    name: "Carlos Rodríguez",
    role: "Director de Marketing, RetailPro",
    content:
      "El equipo de Limitless entiende perfectamente las necesidades del negocio. Su estrategia de SEO nos llevó al top 3 de Google en tiempo récord.",
    rating: 5,
    color: "purple",
  },
  {
    name: "Ana Martínez",
    role: "Fundadora, EcoStore",
    content:
      "Profesionales, creativos y orientados a resultados. Nuestra tienda online aumentó las ventas un 200% después de trabajar con ellos.",
    rating: 5,
    color: "neon-yellow",
  },
  {
    name: "Roberto Sánchez",
    role: "CMO, FinanceApp",
    content:
      "La mejor inversión que hemos hecho en marketing. El diseño web que crearon es impresionante y convierte visitantes en clientes.",
    rating: 5,
    color: "lime-green",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    gsap.to(cardRef.current, {
      opacity: 0,
      x: -50,
      duration: 0.3,
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    gsap.to(cardRef.current, {
      opacity: 0,
      x: 50,
      duration: 0.3,
      onComplete: () => {
        setCurrentIndex(
          (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const current = testimonials[currentIndex];

  const colorClasses: Record<string, { border: string; text: string; bg: string }> = {
    "lime-green": {
      border: "border-lime-green/30",
      text: "text-lime-green",
      bg: "bg-lime-green",
    },
    purple: {
      border: "border-purple/30",
      text: "text-purple",
      bg: "bg-purple",
    },
    "neon-yellow": {
      border: "border-neon-yellow/30",
      text: "text-neon-yellow",
      bg: "bg-neon-yellow",
    },
  };

  const colors = colorClasses[current.color];

  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24">
      <FadeIn className="mb-3 sm:mb-4 text-center">
        <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-purple">
          Testimonios
        </span>
      </FadeIn>

      <FadeIn className="mb-10 sm:mb-16 text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-cream md:text-5xl">
          Lo que dicen nuestros{" "}
          <span className="text-lime-green">clientes</span>
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-4xl px-2">
        <FadeIn>
          <div
            ref={cardRef}
            className={`relative rounded-2xl sm:rounded-3xl border ${colors.border} bg-dark-blue/50 p-6 sm:p-8 md:p-12`}
          >
            {/* Quote icon */}
            <div
              className={`absolute -top-4 sm:-top-6 left-4 sm:left-8 text-4xl sm:text-6xl ${colors.text} opacity-50`}
            >
              "
            </div>

            {/* Content */}
            <p className="mb-6 sm:mb-8 text-base sm:text-xl leading-relaxed text-cream/80 md:text-2xl">
              {current.content}
            </p>

            {/* Rating */}
            <div className="mb-4 sm:mb-6 flex gap-1">
              {[...Array(current.rating)].map((_, i) => (
                <span key={i} className={`text-lg sm:text-xl ${colors.text}`}>
                  ★
                </span>
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Avatar placeholder */}
              <div
                className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full ${colors.bg}/20`}
              >
                <span className={`text-lg sm:text-xl font-bold ${colors.text}`}>
                  {current.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-bold text-cream text-sm sm:text-base">{current.name}</p>
                <p className="text-xs sm:text-sm text-cream/50">{current.role}</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Navigation */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={prevTestimonial}
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-all hover:border-lime-green hover:text-lime-green text-lg sm:text-xl"
            aria-label="Anterior"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex gap-1.5 sm:gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating && index !== currentIndex) {
                    setIsAnimating(true);
                    gsap.to(cardRef.current, {
                      opacity: 0,
                      scale: 0.95,
                      duration: 0.2,
                      onComplete: () => {
                        setCurrentIndex(index);
                        gsap.fromTo(
                          cardRef.current,
                          { opacity: 0, scale: 0.95 },
                          {
                            opacity: 1,
                            scale: 1,
                            duration: 0.2,
                            onComplete: () => setIsAnimating(false),
                          }
                        );
                      },
                    });
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-6 sm:w-8 bg-lime-green"
                    : "w-2 bg-cream/20 hover:bg-cream/40"
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-all hover:border-lime-green hover:text-lime-green text-lg sm:text-xl"
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
