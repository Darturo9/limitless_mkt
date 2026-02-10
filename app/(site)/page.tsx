import {
  FadeIn,
  TextReveal,
  StaggerContainer,
  CountUp,
} from "@/components/animations";
import LogoMarquee from "@/components/LogoMarquee";
// import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import AnimatedGradient from "@/components/AnimatedGradient";
import Footer from "@/components/Footer";
import FloatingRocket from "@/components/FloatingRocket";
import { PenTool, Share2, Target, Video, Calendar, BarChart3 } from "lucide-react";
import { FaGoogle, FaMeta, FaLinkedin, FaHubspot } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden" role="main">
      {/* Animated Background Gradient */}
      <AnimatedGradient />

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
              href="#servicios"
              className="rounded-full border-2 border-cream/30 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-cream transition-all hover:bg-cream hover:text-black text-center text-sm sm:text-base"
            >
              Ver Servicios
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

      {/* About Us Section */}
      <section id="nosotros" aria-labelledby="nosotros-titulo" className="relative px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <FadeIn className="mb-10 sm:mb-12 text-center">
            <h2 id="nosotros-titulo" className="text-3xl sm:text-4xl font-bold text-cream md:text-5xl">
              Sobre <span className="text-neon-yellow">Nosotros</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} direction="up">
            <div className="rounded-2xl border border-cream/10 bg-dark-blue/80 backdrop-blur-sm p-6 sm:p-10">
              <p className="text-base sm:text-lg text-cream/80 leading-relaxed text-center">
                En <span className="text-lime-green font-semibold">Limitless Marketing</span>, somos una agencia de marketing digital disruptiva y sin límites. Nos especializamos en transformar ideas en realidades extraordinarias, llevando las marcas al infinito y más allá. Nuestra misión es impulsar tu negocio hacia nuevos horizontes con estrategias personalizadas y resultados tangibles.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" aria-labelledby="servicios-titulo" className="relative px-4 sm:px-6 py-16 sm:py-20">
        <FadeIn className="mb-10 sm:mb-16 text-center">
          <h2 id="servicios-titulo" className="text-3xl sm:text-4xl font-bold text-cream md:text-5xl">
            Nuestros <span className="text-neon-yellow">Servicios</span>
          </h2>
        </FadeIn>

        <StaggerContainer
          className="mx-auto grid max-w-6xl gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.15}
          direction="up"
        >
          <article className="group rounded-2xl border border-cream/10 bg-dark-blue/80 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-lime-green/50 hover:-translate-y-2 hover:shadow-lg hover:shadow-lime-green/10">
            <div className="mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
              <PenTool className="h-12 w-12 sm:h-14 sm:w-14 text-neon-yellow" strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-lime-green">
              Creación de Contenido
            </h3>
            <p className="text-sm sm:text-base text-cream/60">
              Contenido profesional para redes sociales con engagement y autoridad.
            </p>
          </article>

          <article className="group rounded-2xl border border-cream/10 bg-dark-blue/80 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-neon-yellow/50 hover:-translate-y-2 hover:shadow-lg hover:shadow-neon-yellow/10">
            <div className="mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
              <Share2 className="h-12 w-12 sm:h-14 sm:w-14 text-neon-yellow" strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-lime-green">
              Manejo de Redes Sociales
            </h3>
            <p className="text-sm sm:text-base text-cream/60">
              Social Media Management completo con gestión diaria y reportes mensuales.
            </p>
          </article>

          <article className="group rounded-2xl border border-cream/10 bg-dark-blue/80 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-neon-yellow/50 hover:-translate-y-2 hover:shadow-lg hover:shadow-neon-yellow/10">
            <div className="mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
              <Target className="h-12 w-12 sm:h-14 sm:w-14 text-neon-yellow" strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-lime-green">
              Pauta Publicitaria
            </h3>
            <p className="text-sm sm:text-base text-cream/60">
              Meta Ads, TikTok Ads y Google Ads con optimización continua y A/B testing.
            </p>
          </article>

          <article className="group rounded-2xl border border-cream/10 bg-dark-blue/80 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-lime-green/50 hover:-translate-y-2 hover:shadow-lg hover:shadow-lime-green/10">
            <div className="mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
              <Video className="h-12 w-12 sm:h-14 sm:w-14 text-neon-yellow" strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-lime-green">
              Contenido Audiovisual
            </h3>
            <p className="text-sm sm:text-base text-cream/60">
              Grabación profesional, podcasts y tomas con dron para tu marca.
            </p>
          </article>

          <article className="group rounded-2xl border border-cream/10 bg-dark-blue/80 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-neon-yellow/50 hover:-translate-y-2 hover:shadow-lg hover:shadow-neon-yellow/10">
            <div className="mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
              <Calendar className="h-12 w-12 sm:h-14 sm:w-14 text-neon-yellow" strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-lime-green">
              Calendarización Estratégica
            </h3>
            <p className="text-sm sm:text-base text-cream/60">
              Planificación mensual de contenido por objetivos y fechas comerciales.
            </p>
          </article>

          <article className="group rounded-2xl border border-cream/10 bg-dark-blue/80 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-neon-yellow/50 hover:-translate-y-2 hover:shadow-lg hover:shadow-neon-yellow/10">
            <div className="mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
              <BarChart3 className="h-12 w-12 sm:h-14 sm:w-14 text-neon-yellow" strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-lime-green">
              Reportes & Métricas
            </h3>
            <p className="text-sm sm:text-base text-cream/60">
              Análisis de resultados con KPI's claros y recomendaciones de mejora.
            </p>
          </article>
        </StaggerContainer>
      </section>

      {/* Certifications Section */}
      <section id="certificaciones" aria-labelledby="certificaciones-titulo" className="relative px-4 sm:px-6 py-16 sm:py-20">
        <FadeIn className="mb-10 sm:mb-12 text-center">
          <h2 id="certificaciones-titulo" className="text-3xl sm:text-4xl font-bold text-cream md:text-5xl">
            Respaldados por las <span className="text-neon-yellow">Certificaciones</span> de
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <ul className="mx-auto max-w-2xl grid grid-cols-2 gap-4 sm:gap-6" role="list" aria-label="Certificaciones obtenidas">
            <li className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-cream/10 bg-dark-blue/80 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-lime-green/50">
              <FaGoogle className="h-10 w-10 sm:h-12 sm:w-12 text-cream" aria-hidden="true" />
              <span className="text-sm sm:text-base font-medium text-cream/80">Google Ads</span>
            </li>
            <li className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-cream/10 bg-dark-blue/80 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-lime-green/50">
              <FaMeta className="h-10 w-10 sm:h-12 sm:w-12 text-cream" aria-hidden="true" />
              <span className="text-sm sm:text-base font-medium text-cream/80">Meta Blueprint</span>
            </li>
            <li className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-cream/10 bg-dark-blue/80 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-lime-green/50">
              <FaLinkedin className="h-10 w-10 sm:h-12 sm:w-12 text-cream" aria-hidden="true" />
              <span className="text-sm sm:text-base font-medium text-cream/80">LinkedIn Ads</span>
            </li>
            <li className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-cream/10 bg-dark-blue/80 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-lime-green/50">
              <FaHubspot className="h-10 w-10 sm:h-12 sm:w-12 text-cream" aria-hidden="true" />
              <span className="text-sm sm:text-base font-medium text-cream/80">HubSpot Academy</span>
            </li>
          </ul>
        </FadeIn>
      </section>

      {/* Testimonials Section */}
      {/* <TestimonialsSection /> */}

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </main>
  );
}
