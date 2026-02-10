import { supabase, type GalleryItem } from "@/lib/supabase";
import { FadeIn } from "@/components/animations";
import Footer from "@/components/Footer";
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

  const categories = items
    ? [...new Set(items.map((i) => i.category).filter(Boolean))]
    : [];

  return (
    <>
      <main className="min-h-screen px-4 sm:px-6 pt-32 pb-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-4 text-center">
            <span className="text-sm font-medium uppercase tracking-widest text-lime-green">
              Portafolio
            </span>
          </FadeIn>

          <FadeIn className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-cream md:text-5xl">
              Nuestro{" "}
              <span className="text-lime-green">trabajo</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-cream/60">
              Proyectos que han transformado la presencia digital de nuestros clientes.
            </p>
          </FadeIn>

          {!items || items.length === 0 ? (
            <FadeIn className="py-24 text-center text-cream/40">
              Próximamente — estamos preparando el portafolio.
            </FadeIn>
          ) : (
            <>
              {/* Categories filter — rendered client-side via JS-free approach */}
              {categories.length > 0 && (
                <FadeIn className="mb-10 flex flex-wrap justify-center gap-2">
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full border border-cream/10 px-4 py-1.5 text-sm text-cream/50"
                    >
                      {cat}
                    </span>
                  ))}
                </FadeIn>
              )}

              <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                {items.map((item) => (
                  <FadeIn key={item.id} className="mb-4 break-inside-avoid">
                    <div className="group overflow-hidden rounded-2xl border border-cream/10 bg-dark-blue/30 transition-all hover:border-lime-green/30">
                      <div className="overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-cream">{item.title}</h3>
                        {item.description && (
                          <p className="mt-1 text-sm text-cream/50">{item.description}</p>
                        )}
                        {item.category && (
                          <span className="mt-2 inline-block rounded-full bg-lime-green/10 px-2.5 py-0.5 text-xs text-lime-green">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
