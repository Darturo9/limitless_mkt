"use client";

import Marquee from "./Marquee";

const clients = [
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

export default function LogoMarquee() {
  return (
    <section className="border-y border-cream/10 bg-black/20 py-6 sm:py-10">
      <p className="mb-6 sm:mb-8 text-center text-xs sm:text-sm uppercase tracking-widest text-cream/40 px-4">
        Empresas que confían en nosotros
      </p>
      <Marquee speed={40} pauseOnHover>
        {clients.map((client, index) => (
          <div
            key={index}
            className="mx-4 sm:mx-8 flex items-center gap-2 sm:gap-3 text-lg sm:text-2xl font-bold text-cream/30 transition-colors hover:text-cream/60"
            data-cursor-hover
          >
            <span className={`text-${client.color}`}>●</span>
            {client.name}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
