"use client";

import { useEffect, useState } from "react";
import { supabase, type GalleryItem } from "@/lib/supabase";
import Link from "next/link";

export default function AdminGaleria() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

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
    if (!confirm("¿Eliminar este item?")) return;
    await supabase.from("gallery_items").delete().eq("id", id);
    fetchItems();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Galería</h1>
        <Link
          href="/admin/galeria/nuevo"
          className="rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-black hover:bg-lime-300 transition-colors"
        >
          + Subir imagen
        </Link>
      </div>

      {loading ? null : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-700 p-16 text-center text-gray-500">
          No hay imágenes aún.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
              <img
                src={item.image_url}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white text-sm">{item.title}</p>
                    {item.category && (
                      <span className="mt-1 inline-block rounded-full bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${item.published ? "bg-lime-400/10 text-lime-400" : "bg-gray-700 text-gray-400"}`}>
                    {item.published ? "Publicado" : "Oculto"}
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => togglePublish(item)}
                    className="flex-1 rounded-lg border border-gray-700 py-1.5 text-xs text-gray-300 hover:border-lime-400/50 hover:text-lime-400 transition-colors"
                  >
                    {item.published ? "Ocultar" : "Publicar"}
                  </button>
                  <Link
                    href={`/admin/galeria/${item.id}`}
                    className="flex-1 rounded-lg border border-gray-700 py-1.5 text-center text-xs text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="rounded-lg border border-gray-700 px-3 py-1.5 text-xs text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-colors"
                  >
                    ✕
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
