import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase
    .from("blog_posts")
    .select("title, excerpt, cover_image, created_at, updated_at, author_id") // Added updated_at
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) return { title: "Post no encontrado" };

  return {
    title: data.title,
    description: data.excerpt ?? undefined,
    openGraph: {
      title: data.title,
      description: data.excerpt ?? undefined,
      type: "article",
      publishedTime: data.created_at,
      modifiedTime: data.updated_at,
      authors: ["Limitless Marketing"],
      images: data.cover_image ? [{ url: data.cover_image, width: 1200, height: 630, alt: data.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.excerpt ?? undefined,
      images: data.cover_image ? [data.cover_image] : undefined,
    },
    alternates: {
      canonical: `https://www.limitlessmarketing502.com/blog/${slug}`,
    },
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

  // JSON-LD for Article Structure
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image ? [post.cover_image] : [],
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Organization",
      name: "Limitless Marketing",
      url: "https://www.limitlessmarketing502.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Limitless Marketing",
      logo: {
        "@type": "ImageObject",
        url: "https://www.limitlessmarketing502.com/images/logos/limitless-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.limitlessmarketing502.com/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen relative overflow-hidden bg-background">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-[800px] rounded-full bg-lime-green/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 pt-32 pb-24">
          {/* Back */}
          <Link
            href="/blog"
            className="group mb-12 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-cream/60 transition-all hover:bg-white/10 hover:text-lime-green hover:border-lime-green/30"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            Volver al blog
          </Link>

          {/* Header */}
          <div className="mb-10 text-center">
            <time className="mb-4 block text-sm font-medium uppercase tracking-widest text-lime-green">
              {new Date(post.created_at).toLocaleDateString("es-GT", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </time>

            <h1 className="mb-8 text-3xl font-bold text-cream sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mx-auto max-w-2xl text-lg text-cream/70 leading-relaxed font-light">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Cover image */}
          {post.cover_image && (
            <div className="relative mb-16 aspect-video w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-lime-green/5">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/20 to-transparent" />
            </div>
          )}

          {/* Content */}
          <article className="prose prose-invert prose-lg mx-auto max-w-2xl">
            {post.content.split("\n").map((paragraph: string, i: number) =>
              paragraph.trim() ? (
                <p key={i} className="mb-6 leading-relaxed text-cream/80">
                  {paragraph}
                </p>
              ) : (
                <div key={i} className="mb-6" />
              )
            )}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
