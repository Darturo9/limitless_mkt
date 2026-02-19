"use client";

import { useEffect, useState } from "react";
import { supabase, type BlogPost } from "@/lib/supabase";
import Link from "next/link";
import { Edit, Trash2, Eye, Plus, Search, FileText } from "lucide-react";

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchPosts() {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchPosts(); }, []);

  async function togglePublish(post: BlogPost) {
    await supabase.from("blog_posts").update({ published: !post.published }).eq("id", post.id);
    fetchPosts();
  }

  async function deletePost(id: string) {
    if (!confirm("¿Estás seguro de que quieres eliminar este post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    fetchPosts();
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Blog</h1>
          <p className="mt-1 text-sm text-cream/40">Gestiona tus artículos y noticias.</p>
        </div>
        <Link
          href="/admin/blog/nuevo"
          className="group flex items-center gap-2 rounded-xl bg-lime-green px-6 py-3 text-sm font-bold text-black shadow-lg shadow-lime-green/20 transition-all hover:bg-neon-yellow hover:scale-105 hover:shadow-neon-yellow/30"
        >
          <Plus size={18} />
          Nuevo Post
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/20" size={20} />
        <input
          type="text"
          placeholder="Buscar artículos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-12 pr-4 text-cream placeholder:text-cream/20 outline-none backdrop-blur-sm focus:border-lime-green/30 focus:bg-white/10 transition-all"
        />
      </div>

      {loading ? (
        <div className="py-20 text-center text-cream/40 animate-pulse">Cargando artículos...</div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-white/5 py-20 text-center backdrop-blur-sm">
          <div className="mb-4 rounded-full bg-white/5 p-4 text-cream/20">
            <FileText size={48} />
          </div>
          <p className="text-lg font-medium text-cream/60">No hay posts aún</p>
          <p className="text-sm text-cream/30">Comienza creando tu primer artículo.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="group flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-lime-green/30 hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4 sm:items-center">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-black/20">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt={post.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-cream/20"><FileText size={20} /></div>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-white group-hover:text-lime-green transition-colors">{post.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-cream/40">
                    <span>{new Date(post.created_at).toLocaleDateString("es-GT", { day: "2-digit", month: "short", year: "numeric" })}</span>
                    <span>•</span>
                    <span className={post.published ? "text-lime-green" : "text-cream/40"}>
                      {post.published ? "Publicado" : "Borrador"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => togglePublish(post)}
                  title={post.published ? "Ocultar" : "Publicar"}
                  className={`rounded-lg p-2 transition-colors ${post.published ? "text-lime-green hover:bg-lime-green/10" : "text-cream/40 hover:bg-white/10 hover:text-white"}`}
                >
                  <Eye size={18} />
                </button>

                <Link
                  href={`/admin/blog/${post.id}`}
                  title="Editar"
                  className="rounded-lg p-2 text-cream/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Edit size={18} />
                </Link>

                <button
                  onClick={() => deletePost(post.id)}
                  title="Eliminar"
                  className="rounded-lg p-2 text-cream/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
