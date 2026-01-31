import {
  FadeIn,
  TextReveal,
  StaggerContainer,
  CountUp,
  ScrollProgress,
} from "@/components/animations";
import LogoMarquee from "@/components/LogoMarquee";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import AnimatedGradient from "@/components/AnimatedGradient";
import Footer from "@/components/Footer";
import RocketAnimation from "@/components/RocketAnimation";
import FloatingRocket from "@/components/FloatingRocket";
import { Palette, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Animated Background Gradient */}
      <AnimatedGradient />

      {/* Scroll Progress Bar */}
      <ScrollProgress color="var(--lime-green)" height={4} />

      {/* Hero Section */}
      <section id="inicio" className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-20 pb-20">
        {/* Floating Rocket */}
        <FloatingRocket />

        <FadeIn direction="none" duration={1}>
          <span className="mb-4 inline-block rounded-full bg-lime-green/20 px-3 py-1.5 text-xs sm:text-sm text-lime-green text-center">
            Marketing Digital Sin Límites
          </span>
        </FadeIn>

        <TextReveal
          text="LIMITLESS"
          as="h1"
          className="text-5xl sm:text-6xl font-bold tracking-tight text-lime-green md:text-8xl"
          staggerDelay={0.05}
        />

        <FadeIn delay={0.5} className="mt-4 sm:mt-6 max-w-xl text-center px-2">
          <p className="text-base sm:text-lg text-cream/70">
            Transformamos tu presencia digital con estrategias innovadoras y
            resultados medibles. Sin límites, sin excusas.
          </p>
        </FadeIn>

        <FadeIn delay={0.8} direction="up">
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full px-4 sm:w-auto sm:px-0">
            <a
              href="#contacto"
              className="rounded-full bg-lime-green px-6 sm:px-8 py-3 sm:py-4 font-semibold text-black transition-all hover:scale-105 hover:bg-neon-yellow text-center text-sm sm:text-base"
            >
              Empezar Ahora
            </a>
            <a
              href="#proyectos"
              className="rounded-full border-2 border-cream/30 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-cream transition-all hover:bg-cream hover:text-black text-center text-sm sm:text-base"
            >
              Ver Proyectos
            </a>
          </div>
        </FadeIn>

        {/* Scroll indicator */}
        <FadeIn delay={1.2} className="absolute bottom-6 sm:bottom-10">
          <div className="flex flex-col items-center gap-2 text-cream/40">
            <span className="text-xs sm:text-sm">Scroll</span>
            <div className="h-8 w-5 rounded-full border-2 border-cream/40 p-1">
              <div className="h-2 w-1.5 animate-bounce rounded-full bg-lime-green" />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Logo Marquee */}
      <LogoMarquee />

      {/* Services Section */}
      <section id="servicios" className="relative px-4 sm:px-6 py-16 sm:py-20">
        <FadeIn className="mb-10 sm:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-cream md:text-5xl">
            Nuestros <span className="text-neon-yellow">Servicios</span>
          </h2>
        </FadeIn>

        <StaggerContainer
          className="mx-auto grid max-w-6xl gap-4 sm:gap-6 md:grid-cols-3"
          staggerDelay={0.15}
          direction="up"
        >
          <div className="group rounded-2xl border border-cream/10 bg-dark-blue/80 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-lime-green/50 hover:-translate-y-2 hover:shadow-lg hover:shadow-lime-green/10">
            <div className="mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110">
              <RocketAnimation className="h-12 w-12 sm:h-16 sm:w-16" />
            </div>
            <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-lime-green">
              Marketing Digital
            </h3>
            <p className="text-sm sm:text-base text-cream/60">
              Estrategias personalizadas para hacer crecer tu negocio en el
              mundo digital.
            </p>
          </div>

          <div className="group rounded-2xl border border-cream/10 bg-dark-blue/80 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-neon-yellow/50 hover:-translate-y-2 hover:shadow-lg hover:shadow-neon-yellow/10">
            <div className="mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110">
              <Palette className="h-12 w-12 sm:h-16 sm:w-16 text-neon-yellow" strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-neon-yellow">
              Diseño Web
            </h3>
            <p className="text-sm sm:text-base text-cream/60">
              Sitios web modernos y funcionales que convierten visitantes en
              clientes.
            </p>
          </div>

          <div className="group rounded-2xl border border-cream/10 bg-dark-blue/80 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-neon-yellow/50 hover:-translate-y-2 hover:shadow-lg hover:shadow-neon-yellow/10">
            <div className="mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110">
              <TrendingUp className="h-12 w-12 sm:h-16 sm:w-16 text-neon-yellow" strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-neon-yellow">
              SEO & Analytics
            </h3>
            <p className="text-sm sm:text-base text-cream/60">
              Posicionamiento orgánico y análisis de datos para decisiones
              inteligentes.
            </p>
          </div>
        </StaggerContainer>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Stats Section */}
      <section className="relative bg-black/30 px-4 sm:px-6 py-12 sm:py-20">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12 md:gap-20">
          <FadeIn className="text-center">
            <CountUp
              end={150}
              suffix="+"
              className="text-4xl sm:text-5xl font-bold text-lime-green md:text-6xl"
            />
            <p className="mt-2 text-sm sm:text-base text-cream/60">Proyectos Completados</p>
          </FadeIn>

          <FadeIn delay={0.1} className="text-center">
            <CountUp
              end={98}
              suffix="%"
              className="text-4xl sm:text-5xl font-bold text-neon-yellow md:text-6xl"
            />
            <p className="mt-2 text-sm sm:text-base text-cream/60">Clientes Satisfechos</p>
          </FadeIn>

          <FadeIn delay={0.2} className="text-center">
            <CountUp
              end={5}
              suffix="M+"
              className="text-4xl sm:text-5xl font-bold text-neon-yellow md:text-6xl"
            />
            <p className="mt-2 text-sm sm:text-base text-cream/60">Alcance Mensual</p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}
