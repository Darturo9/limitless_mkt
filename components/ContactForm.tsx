"use client";

import { useState, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { FadeIn } from "@/components/animations";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Animación de éxito
    gsap.to(formRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        setIsSuccess(true);
        gsap.fromTo(
          successRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      },
    });
  };

  const inputClasses =
    "w-full rounded-xl border border-cream/10 bg-dark-blue/50 px-5 py-4 text-cream placeholder:text-cream/30 outline-none transition-all focus:border-lime-green/50 focus:ring-2 focus:ring-lime-green/20";

  if (isSuccess) {
    return (
      <section id="contacto" className="px-6 py-24">
        <div
          ref={successRef}
          className="mx-auto max-w-2xl rounded-3xl border border-lime-green/30 bg-dark-blue/50 p-12 text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-lime-green/20">
            <span className="text-4xl">✓</span>
          </div>
          <h3 className="mb-4 text-3xl font-bold text-lime-green">
            ¡Mensaje Enviado!
          </h3>
          <p className="text-cream/60">
            Gracias por contactarnos. Nos pondremos en contacto contigo en menos
            de 24 horas.
          </p>
          <button
            onClick={() => {
              setIsSuccess(false);
              setIsSubmitting(false);
              setFormData({ name: "", email: "", company: "", message: "" });
            }}
            className="mt-8 rounded-full border border-cream/20 px-6 py-3 text-cream/60 transition-all hover:border-lime-green hover:text-lime-green"
          >
            Enviar otro mensaje
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="px-6 py-24">
      <FadeIn className="mb-4 text-center">
        <span className="text-sm font-medium uppercase tracking-widest text-purple">
          Contacto
        </span>
      </FadeIn>

      <FadeIn className="mb-16 text-center">
        <h2 className="text-4xl font-bold text-cream md:text-5xl">
          ¿Listo para ser{" "}
          <span className="text-lime-green">Limitless</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/60">
          Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas.
        </p>
      </FadeIn>

      <FadeIn>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl rounded-3xl border border-cream/10 bg-dark-blue/30 p-8 md:p-12"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div className="group">
              <label className="mb-2 block text-sm font-medium text-cream/60">
                Nombre *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
                className={inputClasses}
              />
            </div>

            {/* Email */}
            <div className="group">
              <label className="mb-2 block text-sm font-medium text-cream/60">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Company */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-cream/60">
              Empresa
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nombre de tu empresa"
              className={inputClasses}
            />
          </div>

          {/* Message */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-cream/60">
              Mensaje *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Cuéntanos sobre tu proyecto..."
              className={`${inputClasses} resize-none`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative mt-8 w-full overflow-hidden rounded-xl bg-lime-green py-4 font-bold text-black transition-all hover:bg-neon-yellow disabled:opacity-50"
          >
            <span
              className={`flex items-center justify-center gap-2 transition-all ${
                isSubmitting ? "opacity-0" : "opacity-100"
              }`}
            >
              Enviar Mensaje
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>

            {isSubmitting && (
              <span className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="h-6 w-6 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </span>
            )}
          </button>

          <p className="mt-4 text-center text-xs text-cream/40">
            Al enviar este formulario aceptas nuestra política de privacidad.
          </p>
        </form>
      </FadeIn>
    </section>
  );
}
