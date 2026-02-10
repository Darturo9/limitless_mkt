"use client";

import { useEffect, useState } from "react";
import { supabase, type BlogPost } from "@/lib/supabase";
import Link from "next/link";

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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
    if (!confirm("¿Eliminar este post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    fetchPosts();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Blog</h1>
        <Link
          href="/admin/blog/nuevo"
          className="rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-black hover:bg-lime-300 transition-colors"
        >
          + Nuevo post
        </Link>
      </div>

      {loading ? null : posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-700 p-16 text-center text-gray-500">
          No hay posts aún. ¡Crea el primero!
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-900 px-5 py-4"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{post.title}</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {new Date(post.created_at).toLocaleDateString("es-GT", { day: "2-digit", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="ml-4 flex items-center gap-2 shrink-0">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    post.published
                      ? "bg-lime-400/10 text-lime-400"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {post.published ? "Publicado" : "Borrador"}
                </span>
                <button
                  onClick={() => togglePublish(post)}
                  className="rounded-lg px-3 py-1.5 text-xs text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  {post.published ? "Despublicar" : "Publicar"}
                </button>
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="rounded-lg px-3 py-1.5 text-xs text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deletePost(post.id)}
                  className="rounded-lg px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
