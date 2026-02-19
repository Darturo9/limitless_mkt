import { supabase } from "@/lib/supabase";
import { FadeIn } from "@/components/animations";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galería",
  description: "Conoce nuestros trabajos y proyectos de marketing digital, branding, redes sociales y más.",
};

export const revalidate = 60;

export default async function GaleriaPage() {
  const { data: items } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("published", true)
    .order("order_index", { ascending: true });

  return (
    <>
      <main className="min-h-screen px-4 sm:px-6 pt-32 pb-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-10 h-80 w-80 rounded-full bg-lime-green/5 blur-3xl" />
        <div className="absolute bottom-40 left-20 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />

        <div className="mx-auto max-w-7xl relative z-10">
          <FadeIn className="mb-4 text-center">
            <span className="text-sm font-medium uppercase tracking-widest text-lime-green">
              Portafolio
            </span>
          </FadeIn>

          <FadeIn className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-cream md:text-6xl tracking-tight">
              Nuestro <span className="text-lime-green">trabajo</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-cream/60">
              Proyectos que han transformado la presencia digital de nuestros clientes.
            </p>
          </FadeIn>

          {!items || items.length === 0 ? (
            <FadeIn className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-cream/5 bg-white/5 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-lime-green/10 p-6">
                <span className="text-4xl">🎨</span>
              </div>
              <p className="text-xl font-medium text-cream">Próximamente</p>
              <p className="mt-2 text-cream/40">Estamos seleccionando nuestros mejores proyectos.</p>
            </FadeIn>
          ) : (
            <GalleryGrid items={items} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
