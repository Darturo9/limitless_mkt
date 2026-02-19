"use client";

import { useEffect, useState } from "react";
import { supabase, type GalleryItem } from "@/lib/supabase";
import Link from "next/link";
import { Plus, Image as ImageIcon, Trash2, Eye, Edit, Search } from "lucide-react";

export default function AdminGaleria() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchItems() {
    const { data } = await supabase
      .from("gallery_items")
      .select("*")
      .order("order_index", { ascending: true });
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchItems(); }, []);

  async function togglePublish(item: GalleryItem) {
    await supabase.from("gallery_items").update({ published: !item.published }).eq("id", item.id);
    fetchItems();
  }

  async function deleteItem(id: string) {
    if (!confirm("¿Estás seguro de que quieres eliminar este item de la galería?")) return;
    await supabase.from("gallery_items").delete().eq("id", id);
    fetchItems();
  }

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Galería</h1>
          <p className="mt-1 text-sm text-cream/40">Gestiona tu portafolio visual.</p>
        </div>
        <Link
          href="/admin/galeria/nuevo"
          className="group flex items-center gap-2 rounded-xl bg-lime-green px-6 py-3 text-sm font-bold text-black shadow-lg shadow-lime-green/20 transition-all hover:bg-neon-yellow hover:scale-105 hover:shadow-neon-yellow/30"
        >
          <Plus size={18} />
          Subir Imagen
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/20" size={20} />
        <input
          type="text"
          placeholder="Buscar por título o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-12 pr-4 text-cream placeholder:text-cream/20 outline-none backdrop-blur-sm focus:border-lime-green/30 focus:bg-white/10 transition-all"
        />
      </div>

      {loading ? (
        <div className="py-20 text-center text-cream/40 animate-pulse">Cargando portafolio...</div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-white/5 py-20 text-center backdrop-blur-sm">
          <div className="mb-4 rounded-full bg-white/5 p-4 text-cream/20">
            <ImageIcon size={48} />
          </div>
          <p className="text-lg font-medium text-cream/60">Galería vacía</p>
          <p className="text-sm text-cream/30">Sube tu primer trabajo para mostrarlo al mundo.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/5 transition-all hover:border-lime-green/30 hover:shadow-2xl hover:shadow-lime-green/5">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-black/50">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                <div className="absolute top-4 right-4">
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${item.published ? "bg-lime-green/90 text-black" : "bg-black/50 text-white"}`}>
                    {item.published ? "Visible" : "Oculto"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-4 flex-1">
                  <h3 className="font-bold text-white line-clamp-1 group-hover:text-lime-green transition-colors">{item.title}</h3>
                  {item.category && (
                    <p className="text-xs font-medium text-lime-green/80 mt-1">{item.category}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 border-t border-white/5 pt-4">
                  <button
                    onClick={() => togglePublish(item)}
                    title={item.published ? "Ocultar" : "Publicar"}
                    className={`rounded-lg p-2 transition-colors ${item.published ? "text-lime-green hover:bg-lime-green/10" : "text-cream/40 hover:bg-white/10 hover:text-white"}`}
                  >
                    <Eye size={18} />
                  </button>

                  <Link
                    href={`/admin/galeria/${item.id}`}
                    title="Editar"
                    className="rounded-lg p-2 text-cream/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Edit size={18} />
                  </Link>

                  <button
                    onClick={() => deleteItem(item.id)}
                    title="Eliminar"
                    className="ml-auto rounded-lg p-2 text-cream/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
