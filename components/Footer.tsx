"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations";
import MagneticButton from "./MagneticButton";

const footerLinks = {
  servicios: [
    { label: "Marketing Digital", href: "#servicios" },
    { label: "Diseño Web", href: "#servicios" },
    { label: "SEO & Analytics", href: "#servicios" },
    { label: "Redes Sociales", href: "#servicios" },
    { label: "Email Marketing", href: "#servicios" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "#nosotros" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "Blog", href: "#blog" },
    { label: "Carreras", href: "#carreras" },
  ],
  legal: [
    { label: "Política de Privacidad", href: "/privacidad" },
    { label: "Términos de Servicio", href: "/terminos" },
    { label: "Cookies", href: "/cookies" },
  ],
};

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/limitless_mkt/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/104523106/admin/dashboard/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61559219050883",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative border-t border-cream/10 bg-black/20">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <FadeIn>
              <a href="#" className="flex items-center">
                <img
                  src="/images/logos/limitless-logo-blanco.png"
                  alt="Limitless MKT"
                  className="h-8 w-auto sm:h-10"
                />
              </a>
              <p className="mt-3 sm:mt-4 max-w-sm text-sm sm:text-base text-cream/60">
                Transformamos tu presencia digital con estrategias innovadoras y resultados medibles. Sin límites, sin excusas.
              </p>

              {/* Contact Info */}
              <div className="mt-4 sm:mt-6 space-y-2">
                <p className="text-xs sm:text-sm font-medium text-cream">Contáctanos</p>
                <div className="space-y-1">
                  <a href="tel:+50255179410" className="block text-xs sm:text-sm text-cream/60 hover:text-lime-green transition-colors">
                    +502 5517 9410
                  </a>
                  <a href="tel:+50251332551" className="block text-xs sm:text-sm text-cream/60 hover:text-lime-green transition-colors">
                    +502 5133 2551
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-6 sm:mt-8">
                <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium text-cream">
                  Suscríbete a nuestro newsletter
                </p>
                {isSubscribed ? (
                  <p className="text-xs sm:text-sm text-lime-green">
                    ¡Gracias por suscribirte! 🎉
                  </p>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="flex-1 rounded-lg border border-cream/10 bg-dark-blue/50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-cream placeholder:text-cream/30 outline-none transition-all focus:border-lime-green/50"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-lime-green px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-neon-yellow"
                    >
                      →
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Services */}
          <div>
            <FadeIn delay={0.1}>
              <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-cream">
                Servicios
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.servicios.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-cream/50 transition-colors hover:text-lime-green"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Company */}
          <div>
            <FadeIn delay={0.2}>
              <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-cream">
                Empresa
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.empresa.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-cream/50 transition-colors hover:text-lime-green"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Legal */}
          <div>
            <FadeIn delay={0.3}>
              <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-cream">
                Legal
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-cream/50 transition-colors hover:text-lime-green"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-6 md:flex-row">
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-cream/40 text-center md:text-left">
            © 2025 Limitless MKT. Todos los derechos reservados.
          </p>

          {/* Social Links */}
          <div className="flex gap-3 sm:gap-4">
            {socialLinks.map((social) => (
              <MagneticButton key={social.label} strength={0.3}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-cream/10 text-cream/50 transition-all hover:border-lime-green/50 hover:text-lime-green"
                >
                  {social.icon}
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <MagneticButton strength={0.5}>
        <a
          href="#inicio"
          className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-40 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-lime-green text-black shadow-lg transition-all hover:bg-neon-yellow hover:scale-110 text-lg sm:text-xl"
          aria-label="Volver arriba"
        >
          ↑
        </a>
      </MagneticButton>
    </footer>
  );
}
