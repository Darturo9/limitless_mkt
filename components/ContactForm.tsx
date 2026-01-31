"use client";

import { useState, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { FadeIn } from "@/components/animations";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    console.log("📨 [ContactForm] Iniciando envío de formulario...");
    console.log("📋 [ContactForm] Datos del formulario:", formData);

    try {
      console.log("🌐 [ContactForm] Enviando petición a /api/contact...");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("📡 [ContactForm] Respuesta recibida:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      const data = await response.json();
      console.log("📦 [ContactForm] Data de respuesta:", data);

      if (!response.ok) {
        throw new Error(data.details || data.error || "Error al enviar el mensaje");
      }

      console.log("✅ [ContactForm] Email enviado exitosamente");

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
    } catch (err) {
      console.error("❌ [ContactForm] Error al enviar:", err);
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      console.error("   Mensaje de error:", errorMessage);
      setError(`Hubo un error: ${errorMessage}. Por favor intenta de nuevo.`);
      setIsSubmitting(false);
    }
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
              setFormData({ name: "", email: "", phone: "", service: "", message: "" });
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
        <span className="text-sm font-medium uppercase tracking-widest text-lime-green">
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

          {/* Phone */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-cream/60">
              Teléfono
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+502 1234 5678"
              className={inputClasses}
            />
          </div>

          {/* Service */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-cream/60">
              Servicio de Interés
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Selecciona un servicio</option>
              <option value="Marketing Digital">Marketing Digital</option>
              <option value="Diseño Web">Diseño Web</option>
              <option value="SEO & Analytics">SEO & Analytics</option>
              <option value="Redes Sociales">Redes Sociales</option>
              <option value="Email Marketing">Email Marketing</option>
              <option value="Consultoría">Consultoría</option>
              <option value="Otro">Otro</option>
            </select>
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

          {/* Error Message */}
          {error && (
            <div className="mt-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-center text-sm text-red-400">
              {error}
            </div>
          )}

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
