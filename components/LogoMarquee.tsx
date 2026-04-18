"use client";

import Marquee from "./Marquee";

type ClientDotColor = "lime-green" | "neon-yellow";

const clients: { name: string; color: ClientDotColor }[] = [
  { name: "Soluciones Web", color: "lime-green" },
  { name: "GO|LEGAL", color: "neon-yellow" },
  { name: "Bella Pizza Café", color: "lime-green" },
  { name: "Los Shakeaditos", color: "neon-yellow" },
  { name: "Recesa", color: "lime-green" },
  { name: "Tequila Don Nacho", color: "neon-yellow" },
  { name: "Totito", color: "lime-green" },
  { name: "PLQ", color: "neon-yellow" },
  { name: "Champ Cure", color: "lime-green" },
];

const dotColorClass: Record<ClientDotColor, string> = {
  "lime-green": "text-lime-green",
  "neon-yellow": "text-neon-yellow",
};

export default function LogoMarquee() {
  return (
    <section className="relative border-y border-cream/20 bg-dark-blue/60 py-7 sm:py-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-lime-green/5 via-transparent to-neon-yellow/5" />

      <p className="relative mb-6 sm:mb-8 px-4 text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-cream/70">
        Empresas que confían en nosotros
      </p>

      <Marquee speed={40} pauseOnHover className="relative">
        {clients.map((client, index) => (
          <div
            key={index}
            className="mx-3 sm:mx-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-base font-semibold text-cream/75 whitespace-nowrap transition-all duration-300 hover:border-lime-green/40 hover:bg-white/10 hover:text-cream sm:gap-3 sm:px-5 sm:py-2.5 sm:text-2xl"
            data-cursor-hover
          >
            <span className={dotColorClass[client.color]}>●</span>
            {client.name}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
