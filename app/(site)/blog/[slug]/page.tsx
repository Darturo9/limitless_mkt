import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase
    .from("blog_posts")
    .select("title, excerpt, cover_image")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) return { title: "Post no encontrado" };

  return {
    title: data.title,
    description: data.excerpt ?? undefined,
    openGraph: data.cover_image ? { images: [data.cover_image] } : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  return (
    <>
      <main className="min-h-screen px-4 sm:px-6 pt-32 pb-24">
        <div className="mx-auto max-w-3xl">
          {/* Back */}
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm text-cream/40 hover:text-lime-green transition-colors"
          >
            ← Volver al blog
          </Link>

          {/* Header */}
          <p className="mb-4 text-sm text-cream/40">
            {new Date(post.created_at).toLocaleDateString("es-GT", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          <h1 className="mb-6 text-3xl font-bold text-cream sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mb-10 text-lg text-cream/60 border-l-2 border-lime-green/50 pl-4">
              {post.excerpt}
            </p>
          )}

          {/* Cover image */}
          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="mb-12 h-72 w-full rounded-2xl object-cover sm:h-96"
            />
          )}

          {/* Content */}
          <div className="prose-limitless">
            {post.content.split("\n").map((paragraph: string, i: number) =>
              paragraph.trim() ? (
                <p key={i} className="mb-5 text-base leading-relaxed text-cream/80 sm:text-lg">
                  {paragraph}
                </p>
              ) : (
                <div key={i} className="mb-5" />
              )
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
