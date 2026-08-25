"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/animations";
import type { GalleryItem as GalleryItemRecord } from "@/lib/supabase";
import { Film, Image as ImageIcon, Play, X, ZoomIn } from "lucide-react";

type GalleryItem = Pick<
  GalleryItemRecord,
  "id" | "title" | "description" | "image_url" | "media_type" | "video_url" | "poster_url" | "category"
>;

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("Todos");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ["Todos", ...new Set(items.map((item) => item.category).filter(Boolean) as string[])];
  const filteredItems = filter === "Todos" ? items : items.filter((item) => item.category === filter);

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  return (
    <>
      <FadeIn className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`rounded-full border px-6 py-2 text-sm font-medium transition-all duration-300 ${
              filter === category
                ? "border-lime-green bg-lime-green text-black shadow-[0_0_20px_rgba(128,193,47,0.3)]"
                : "border-white/10 bg-white/5 text-cream/60 hover:border-lime-green/50 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </FadeIn>

      <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
        {filteredItems.map((item) => {
          const isVideo = item.media_type === "video";

          return (
            <FadeIn key={item.id} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setSelectedItem(item)}
                aria-label={`${isVideo ? "Ver video" : "Ampliar imagen"}: ${item.title}`}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left transition-all hover:border-lime-green/50 hover:shadow-2xl hover:shadow-lime-green/5"
              >
                <div className={`relative w-full ${isVideo && !item.poster_url ? "aspect-video" : ""}`}>
                  {isVideo ? (
                    item.poster_url ? (
                      <Image
                        src={item.poster_url}
                        alt={`Miniatura del video: ${item.title}`}
                        width={1200}
                        height={675}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full min-h-48 items-center justify-center bg-gradient-to-br from-dark-blue via-black to-lime-green/20 text-lime-green">
                        <Film className="h-12 w-12 opacity-70" aria-hidden="true" />
                      </div>
                    )
                  ) : item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      width={1200}
                      height={900}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex min-h-48 items-center justify-center bg-black/40 text-cream/20">
                      <ImageIcon className="h-12 w-12" aria-hidden="true" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="rounded-full bg-black/60 p-3 text-white backdrop-blur-sm">
                      {isVideo ? <Play className="h-6 w-6 fill-current" aria-hidden="true" /> : <ZoomIn className="h-6 w-6" aria-hidden="true" />}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  <h3 className="font-bold text-white">{item.title}</h3>
                  {item.category && <span className="mt-1 inline-block text-xs font-medium text-lime-green">{item.category}</span>}
                </div>
              </button>
            </FadeIn>
          );
        })}
      </div>

      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
          onClick={() => setSelectedItem(null)}
        >
          <button
            type="button"
            aria-label="Cerrar vista ampliada"
            className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={() => setSelectedItem(null)}
          >
            <X className="h-8 w-8" aria-hidden="true" />
          </button>

          <div
            className="relative flex max-h-[90vh] max-w-[90vw] flex-col overflow-hidden rounded-lg"
            onClick={(event) => event.stopPropagation()}
          >
            {selectedItem.media_type === "video" && selectedItem.video_url ? (
              <video
                src={selectedItem.video_url}
                poster={selectedItem.poster_url ?? undefined}
                controls
                playsInline
                preload="metadata"
                className="max-h-[78vh] max-w-full rounded-lg object-contain"
              />
            ) : selectedItem.image_url ? (
              <Image
                src={selectedItem.image_url}
                alt={selectedItem.title}
                width={1600}
                height={1200}
                sizes="90vw"
                className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain"
              />
            ) : null}

            <div className="mt-4 text-center">
              <h3 id="gallery-modal-title" className="text-xl font-bold text-white">{selectedItem.title}</h3>
              {selectedItem.description && <p className="mt-1 text-gray-400">{selectedItem.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
