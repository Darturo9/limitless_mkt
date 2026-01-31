"use client";

import Marquee from "./Marquee";

// Logos placeholder - estos se pueden reemplazar con logos reales
const clients = [
  { name: "TechCorp", color: "lime-green" },
  { name: "Innovate", color: "neon-yellow" },
  { name: "Digital Plus", color: "lime-green" },
  { name: "StartupX", color: "neon-yellow" },
  { name: "MediaFlow", color: "lime-green" },
  { name: "BrandPro", color: "neon-yellow" },
  { name: "GrowthLab", color: "lime-green" },
  { name: "NextLevel", color: "neon-yellow" },
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
