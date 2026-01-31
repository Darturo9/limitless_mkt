"use client";

import { FadeIn, StaggerContainer } from "@/components/animations";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "E-commerce Revolution",
    category: "Diseño Web",
    description: "Rediseño completo de tienda online con aumento del 150% en conversiones.",
    color: "lime-green" as const,
  },
  {
    title: "Brand Identity Suite",
    category: "Branding",
    description: "Identidad visual completa para startup de tecnología financiera.",
    color: "purple" as const,
  },
  {
    title: "Social Media Campaign",
    category: "Marketing Digital",
    description: "Campaña viral que alcanzó 2M+ de impresiones en 30 días.",
    color: "neon-yellow" as const,
  },
  {
    title: "SEO Transformation",
    category: "SEO",
    description: "De página 10 a top 3 en Google para keywords competitivas.",
    color: "lime-green" as const,
  },
  {
    title: "App Launch Strategy",
    category: "Marketing Digital",
    description: "Lanzamiento exitoso con 50K descargas en la primera semana.",
    color: "purple" as const,
  },
  {
    title: "Corporate Website",
    category: "Diseño Web",
    description: "Sitio web corporativo con animaciones premium y UX optimizada.",
    color: "neon-yellow" as const,
  },
];

export default function ProjectsSection() {
  return (
    <section id="proyectos" className="px-6 py-24">
      <FadeIn className="mb-4 text-center">
        <span className="text-sm font-medium uppercase tracking-widest text-purple">
          Portfolio
        </span>
      </FadeIn>

      <FadeIn className="mb-16 text-center">
        <h2 className="text-4xl font-bold text-cream md:text-5xl">
          Proyectos <span className="text-lime-green">Destacados</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/60">
          Cada proyecto es una historia de transformación digital.
          Descubre cómo ayudamos a nuestros clientes a alcanzar sus metas.
        </p>
      </FadeIn>

      <StaggerContainer
        className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.1}
        direction="up"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            index={index}
            title={project.title}
            category={project.category}
            description={project.description}
            color={project.color}
          />
        ))}
      </StaggerContainer>

      <FadeIn delay={0.5} className="mt-12 text-center">
        <button className="group relative overflow-hidden rounded-full border-2 border-cream/30 px-8 py-4 font-medium text-cream transition-all hover:border-lime-green hover:text-lime-green">
          <span className="relative z-10">Ver Todos los Proyectos</span>
        </button>
      </FadeIn>
    </section>
  );
}
