import { supabase, type BlogPost } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/animations";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos y recursos sobre marketing digital, redes sociales, pauta publicitaria y estrategias de crecimiento.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <>
      <main className="min-h-screen px-4 sm:px-6 pt-32 pb-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-lime-green/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-neon-yellow/5 blur-3xl" />

        <div className="mx-auto max-w-6xl relative z-10">
          <FadeIn className="mb-4 text-center">
            <span className="text-sm font-medium uppercase tracking-widest text-lime-green">
              Blog & Recursos
            </span>
          </FadeIn>

          <FadeIn className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-cream md:text-6xl tracking-tight">
              Ideas al <span className="text-lime-green">infinito</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-cream/60">
              Estrategias, tendencias y secretos del marketing digital para impulsar tu marca.
            </p>
          </FadeIn>

          {!posts || posts.length === 0 ? (
            <FadeIn className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-cream/5 bg-white/5 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-lime-green/10 p-6">
                <span className="text-4xl">🚀</span>
              </div>
              <p className="text-xl font-medium text-cream">Próximamente</p>
              <p className="mt-2 text-cream/40">Estamos cocinando contenido increíble para ti.</p>
            </FadeIn>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <FadeIn key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-lime-green/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-lime-green/10 hover:-translate-y-2">
                      <div className="relative h-56 w-full overflow-hidden">
                        {post.cover_image ? (
                          <Image
                            src={post.cover_image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-dark-blue to-black flex items-center justify-center">
                            <span className="text-5xl text-lime-green/20">✦</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/80 via-transparent to-transparent opacity-60" />
                      </div>

                      <div className="flex flex-1 flex-col p-6 sm:p-8">
                        <div className="mb-4 flex items-center justify-between">
                          <span className="rounded-full bg-lime-green/10 px-3 py-1 text-xs font-medium text-lime-green">
                            Artículo
                          </span>
                          <time className="text-xs text-cream/40 font-medium uppercase tracking-wider">
                            {new Date(post.created_at).toLocaleDateString("es-GT", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </time>
                        </div>

                        <h2 className="mb-3 text-xl font-bold text-cream leading-tight group-hover:text-lime-green transition-colors">
                          {post.title}
                        </h2>

                        {post.excerpt && (
                          <p className="flex-1 text-sm text-cream/60 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-lime-green">
                          Leer artículo <span className="transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
