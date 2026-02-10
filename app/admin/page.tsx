"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ posts: 0, gallery: 0, publishedPosts: 0, publishedGallery: 0 });

  useEffect(() => {
    async function fetchStats() {
      const [{ count: posts }, { count: publishedPosts }, { count: gallery }, { count: publishedGallery }] =
        await Promise.all([
          supabase.from("blog_posts").select("*", { count: "exact", head: true }),
          supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
          supabase.from("gallery_items").select("*", { count: "exact", head: true }),
          supabase.from("gallery_items").select("*", { count: "exact", head: true }).eq("published", true),
        ]);
      setStats({
        posts: posts ?? 0,
        publishedPosts: publishedPosts ?? 0,
        gallery: gallery ?? 0,
        publishedGallery: publishedGallery ?? 0,
      });
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Posts totales" value={stats.posts} sub={`${stats.publishedPosts} publicados`} />
        <StatCard label="Items galería" value={stats.gallery} sub={`${stats.publishedGallery} publicados`} />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <QuickLink href="/admin/blog/nuevo" label="Nuevo post de blog" description="Crea y publica un artículo" />
        <QuickLink href="/admin/galeria/nuevo" label="Subir a galería" description="Agrega un trabajo al portafolio" />
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: number; sub: string }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-2 text-4xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-lime-400">{sub}</p>
    </div>
  );
}

function QuickLink({ href, label, description }: { href: string; label: string; description: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-900 p-6 transition-colors hover:border-lime-400/40 hover:bg-gray-800"
    >
      <div>
        <p className="font-medium text-white">{label}</p>
        <p className="mt-1 text-xs text-gray-400">{description}</p>
      </div>
      <span className="text-lime-400 text-xl">→</span>
    </Link>
  );
}
