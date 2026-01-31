"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Animación inicial
    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // Detectar scroll para cambiar estilo del navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animación del menú móvil
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo(
        ".mobile-menu-item",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-dark-blue/90 backdrop-blur-lg shadow-lg shadow-black/20 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <MagneticButton strength={0.3}>
            <a href="#" className="text-2xl font-bold text-lime-green">
              LIMITLESS
            </a>
          </MagneticButton>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <MagneticButton key={link.href} strength={0.2}>
                <a
                  href={link.href}
                  className="group relative text-sm font-medium text-cream/80 transition-colors hover:text-cream"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-lime-green transition-all duration-300 group-hover:w-full" />
                </a>
              </MagneticButton>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <MagneticButton strength={0.4}>
              <a
                href="#contacto"
                className="rounded-full bg-lime-green px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-neon-yellow hover:scale-105"
              >
                Hablemos
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 bg-cream transition-all duration-300 ${
                isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-cream transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-cream transition-all duration-300 ${
                isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-dark-blue transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-menu-item text-3xl font-bold text-cream transition-colors hover:text-lime-green"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mobile-menu-item mt-4 rounded-full bg-lime-green px-8 py-4 text-lg font-semibold text-black"
          >
            Hablemos
          </a>
        </div>
      </div>
    </>
  );
}
