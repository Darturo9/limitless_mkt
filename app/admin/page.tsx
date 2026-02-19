"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { FileText, Image as ImageIcon, ArrowRight, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ posts: 0, gallery: 0, publishedPosts: 0, publishedGallery: 0 });
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="mt-2 text-cream/40">Bienvenido al panel de control de Limitless MKT.</p>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-xs font-bold uppercase tracking-wider text-lime-green">Estado del Sistema</p>
          <div className="mt-1 flex items-center justify-end gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-lime-green" />
            <span className="text-sm font-medium text-cream/80">Operativo</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-xs font-bold uppercase tracking-wider text-lime-green">Resumen General</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Artículos de Blog"
            value={stats.posts}
            sub={`${stats.publishedPosts} publicados`}
            icon={<FileText className="text-lime-green" size={24} />}
            loading={loading}
          />
          <StatCard
            label="Items en Galería"
            value={stats.gallery}
            sub={`${stats.publishedGallery} publicados`}
            icon={<ImageIcon className="text-purple" size={24} />}
            loading={loading}
            delay={0.1}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-xs font-bold uppercase tracking-wider text-lime-green">Acciones Rápidas</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <QuickLink
            href="/admin/blog/nuevo"
            label="Nuevo Artículo"
            description="Redacta y publica contenido de valor para tu audiencia."
            icon={<FileText size={24} />}
          />
          <QuickLink
            href="/admin/galeria/nuevo"
            label="Subir a Galería"
            description="Agrega nuevos proyectos a tu portafolio visual."
            icon={<ImageIcon size={24} />}
            delay={0.1}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, icon, loading, delay = 0 }: { label: string; value: number; sub: string; icon: React.ReactNode; loading?: boolean; delay?: number }) {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-lime-green/5"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-full bg-white/5 p-3 text-cream/80 transition-colors group-hover:bg-white/10 group-hover:text-white">
          {icon}
        </div>
        {loading && <Loader2 className="h-4 w-4 animate-spin text-cream/20" />}
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-cream/40 uppercase tracking-wider">{label}</p>
        <p className="text-4xl font-bold text-white tracking-tight tabular-nums">
          {loading ? "-" : value}
        </p>
        <p className="text-xs font-medium text-lime-green">
          {loading ? "Cargando..." : sub}
        </p>
      </div>
    </div>
  );
}

function QuickLink({ href, label, description, icon, delay = 0 }: { href: string; label: string; description: string; icon: React.ReactNode; delay?: number }) {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-6 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-lime-green/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-lime-green/5"
    >
      <div className="shrink-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent p-4 text-cream transition-colors group-hover:text-lime-green">
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-white group-hover:text-lime-green transition-colors">{label}</h3>
        <p className="mt-1 text-sm text-cream/40 leading-relaxed">{description}</p>
      </div>

      <div className="rounded-full border border-white/10 p-2 text-cream/40 transition-all group-hover:bg-lime-green group-hover:border-lime-green group-hover:text-black group-hover:rotate-[-45deg]">
        <ArrowRight size={20} />
      </div>
    </Link>
  );
}
