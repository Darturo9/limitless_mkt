"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import MagneticButton from "./MagneticButton";
import Link from "next/link";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/galeria", label: "Galería" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = pathname === "/";

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

  const getHref = (linkHref: string) => {
    if (linkHref.startsWith("/")) return linkHref; // Links absolutos como /blog
    return isHome ? linkHref : `/${linkHref}`; // Links ancla: #inicio -> /#inicio si no estamos en home
  };

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
            <Link href="/" className="flex items-center">
              <img
                src="/images/logos/limitless-logo-blanco.png"
                alt="Limitless MKT"
                className="h-14 w-auto sm:h-16 md:h-18 lg:h-20"
              />
            </Link>
          </MagneticButton>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <MagneticButton key={link.href} strength={0.2}>
                <Link
                  href={getHref(link.href)}
                  className="group relative text-sm font-medium text-cream/80 transition-colors hover:text-cream"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-lime-green transition-all duration-300 group-hover:w-full" />
                </Link>
              </MagneticButton>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <MagneticButton strength={0.4}>
              <Link
                href={getHref("#contacto")}
                className="rounded-full bg-lime-green px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-neon-yellow hover:scale-105"
              >
                Hablemos
              </Link>
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
            <Link
              key={link.href}
              href={getHref(link.href)}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-menu-item text-3xl font-bold text-cream transition-colors hover:text-lime-green"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={getHref("#contacto")}
            onClick={() => setIsMobileMenuOpen(false)}
            className="mobile-menu-item mt-4 rounded-full bg-lime-green px-8 py-4 text-lg font-semibold text-black"
          >
            Hablemos
          </Link>
        </div>
      </div>
    </>
  );
}
