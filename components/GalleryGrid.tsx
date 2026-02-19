"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/animations";
import { X, ZoomIn } from "lucide-react";

type GalleryItem = {
    id: string;
    title: string;
    description: string | null;
    image_url: string;
    category: string | null;
};

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
    const [filter, setFilter] = useState<string>("Todos");
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    const categories = ["Todos", ...new Set(items.map((i) => i.category).filter(Boolean) as string[])];

    const filteredItems = filter === "Todos"
        ? items
        : items.filter((item) => item.category === filter);

    return (
        <>
            {/* Category Filter */}
            <FadeIn className="mb-12 flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`rounded-full border px-6 py-2 text-sm font-medium transition-all duration-300 ${filter === cat
                                ? "border-lime-green bg-lime-green text-black shadow-[0_0_20px_rgba(128,193,47,0.3)]"
                                : "border-white/10 bg-white/5 text-cream/60 hover:border-lime-green/50 hover:text-white"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </FadeIn>

            {/* Grid */}
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 space-y-6">
                {filteredItems.map((item) => (
                    <FadeIn key={item.id} className="break-inside-avoid">
                        <div
                            onClick={() => setSelectedImage(item)}
                            className="group relative cursor-zoom-in overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all hover:border-lime-green/50 hover:shadow-2xl hover:shadow-lime-green/5"
                        >
                            <div className="relative w-full">
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <div className="rounded-full bg-black/50 p-3 text-white backdrop-blur-sm">
                                        <ZoomIn className="h-6 w-6" />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                                <h3 className="font-bold text-white">{item.title}</h3>
                                {item.category && (
                                    <span className="mt-1 inline-block text-xs font-medium text-lime-green">
                                        {item.category}
                                    </span>
                                )}
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="h-8 w-8" />
                    </button>

                    <div
                        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage.image_url}
                            alt={selectedImage.title}
                            className="max-h-[85vh] w-auto max-w-full object-contain"
                        />
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
                            {selectedImage.description && (
                                <p className="text-gray-400 mt-1">{selectedImage.description}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
