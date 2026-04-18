import {
  FadeIn,
  StaggerContainer,
} from "@/components/animations";
import LogoMarquee from "@/components/LogoMarquee";
// import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import AnimatedGradient from "@/components/AnimatedGradient";
import Footer from "@/components/Footer";
import Image from "next/image";
import { PenTool, Share2, Target, Video, Calendar } from "lucide-react";
import { FaGoogle, FaMeta, FaLinkedin, FaHubspot } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden" role="main">
      {/* Animated Background Gradient */}
      <AnimatedGradient />

      {/* Hero Section */}
      <section id="inicio" className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-24 sm:pt-20 pb-20">
        <Image
          src="/images/Hero/hero-limitless.webp"
          alt="Equipo de producción audiovisual capturando contenido en un evento."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-110"
        />
        <div className="absolute inset-0 z-10 bg-black/25" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/30 to-black/55" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(128,193,47,0.28),transparent_50%)]" />

        <div className="relative z-20 flex w-full items-center justify-center px-6">
          <FadeIn direction="none" duration={1}>
            <Image
              src="/images/logos/limitless-logo-blanco.png"
              alt="Limitless Marketing"
              width={420}
              height={136}
              priority
              className="h-auto w-[145px] drop-shadow-[0_14px_35px_rgba(0,0,0,0.85)] sm:w-[200px] md:w-[270px] lg:w-[380px]"
            />
          </FadeIn>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-background" />
      </section>

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

        </StaggerContainer>
      </section>

      {/* Logo Marquee */}
      <LogoMarquee />

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
