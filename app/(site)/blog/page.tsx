import { supabase, type BlogPost } from "@/lib/supabase";
import Link from "next/link";
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
      <main className="min-h-screen px-4 sm:px-6 pt-32 pb-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-4 text-center">
            <span className="text-sm font-medium uppercase tracking-widest text-lime-green">
              Blog
            </span>
          </FadeIn>

          <FadeIn className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-cream md:text-5xl">
              Ideas al{" "}
              <span className="text-lime-green">infinito</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-cream/60">
              Recursos, estrategias y tendencias del mundo del marketing digital.
            </p>
          </FadeIn>

          {!posts || posts.length === 0 ? (
            <FadeIn className="py-24 text-center text-cream/40">
              Próximamente — estamos preparando contenido para ti.
            </FadeIn>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <FadeIn key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-dark-blue/30 transition-all hover:border-lime-green/30 hover:bg-dark-blue/50">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-48 w-full bg-dark-blue/60 flex items-center justify-center">
                          <span className="text-4xl text-lime-green/20">✦</span>
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <p className="mb-3 text-xs text-cream/40">
                          {new Date(post.created_at).toLocaleDateString("es-GT", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <h2 className="mb-3 text-lg font-bold text-cream group-hover:text-lime-green transition-colors">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="flex-1 text-sm text-cream/60 line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                        <span className="mt-4 text-sm font-medium text-lime-green">
                          Leer más →
                        </span>
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
