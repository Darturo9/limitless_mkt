"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, Upload, Eye, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";

export default function EditBlogPost() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === "nuevo";

  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", cover_image: "", published: false });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isNew) {
      supabase.from("blog_posts").select("*").eq("id", id).single().then(({ data }) => {
        if (data) setForm({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt ?? "",
          content: data.content,
          cover_image: data.cover_image ?? "",
          published: data.published
        });
      });
    }
  }, [id, isNew]);

  function generateSlug(title: string) {
    return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
      setForm((f) => ({ ...f, cover_image: data.publicUrl }));
    }
    setUploading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = { title: form.title, slug: form.slug, excerpt: form.excerpt || null, content: form.content, cover_image: form.cover_image || null, published: form.published };

    if (isNew) {
      const { error } = await supabase.from("blog_posts").insert(payload);
      if (error) { setMessage("Error: " + error.message); }
      else {
        await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paths: ["/blog"] }) });
        setMessage("Post creado exitosamente."); setTimeout(() => router.push("/admin/blog"), 1000);
      }
    } else {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", id);
      if (error) { setMessage("Error: " + error.message); }
      else {
        await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paths: ["/blog", `/blog/${form.slug}`] }) });
        setMessage("Cambios guardados correctamente.");
      }
    }
    setSaving(false);
  }

  return (
    <div className="mx-auto max-w-7xl pb-20">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sticky top-0 z-20 bg-black/80 backdrop-blur-xl py-4 -mx-8 px-8 border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/admin/blog")} className="group rounded-full bg-white/5 p-2 text-cream/60 transition-colors hover:bg-white/10 hover:text-white">
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{isNew ? "Nuevo Artículo" : "Editar Artículo"}</h1>
            <p className="text-xs text-cream/40">{isNew ? "Crea contenido de valor" : `Editando: ${form.slug}`}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {message && (
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium animate-in fade-in slide-in-from-right-5 ${message.startsWith("Error") ? "bg-red-500/10 text-red-400" : "bg-lime-green/10 text-lime-green"}`}>
              {message.startsWith("Error") ? <AlertCircle size={14} /> : <CheckCircle size={14} />}
              {message}
            </div>
          )}

          <div className="flex items-center gap-2 rounded-full bg-white/5 px-1 p-1">
            <button
              type="button"
              onClick={() => setForm(f => ({ ...f, published: !f.published }))}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${form.published ? "bg-lime-green text-black" : "text-cream/40 hover:text-white"}`}
            >
              {form.published ? "Publicado" : "Borrador"}
            </button>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-lime-green px-6 py-2.5 text-sm font-bold text-black shadow-lg shadow-lime-green/20 transition-all hover:bg-neon-yellow hover:scale-105 hover:shadow-neon-yellow/30 disabled:opacity-50 disabled:pointer-events-none"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Editor Column */}
        <div className="space-y-6">
          <div className="card-glass p-6 space-y-6">
            <Field label="Título Principal">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: isNew ? generateSlug(e.target.value) : f.slug }))}
                required
                placeholder="Escribe un título impactante..."
                className="input-glass text-lg font-bold"
              />
            </Field>

            <Field label="Slug (URL Friendly)">
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-cream/30 text-sm">/blog/</span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  required
                  className="input-glass pl-16 font-mono text-sm text-lime-green"
                />
              </div>
            </Field>

            <Field label="Extracto (SEO & Preview)">
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                rows={3}
                placeholder="Breve descripción que aparecerá en las tarjetas..."
                className="input-glass resize-none"
              />
            </Field>
          </div>

          <div className="card-glass p-6">
            <div className="mb-4 flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-lime-green">Contenido del Artículo</label>
              <span className="text-xs text-cream/30">Markdown soportado</span>
            </div>
            <textarea
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              required
              rows={20}
              placeholder="Escribe aquí tu contenido..."
              className="input-glass font-mono text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Preview / Media Column */}
        <div className="space-y-6">
          {/* Cover Image */}
          <div className="card-glass p-6">
            <label className="mb-4 block text-xs font-bold uppercase tracking-wider text-lime-green">Imagen de Portada</label>

            <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              {form.cover_image ? (
                <img src={form.cover_image} alt="Cover" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-cream/20">
                  <ImageIcon size={48} />
                  <span className="text-sm font-medium">Sin imagen</span>
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105"
                >
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  {uploading ? "Subiendo..." : "Cambiar Imagen"}
                </button>
              </div>
            </div>
            <input type="file" accept="image/*" ref={fileRef} onChange={handleImageUpload} className="hidden" />
            <p className="mt-3 text-center text-xs text-cream/40">Recomendado: 1920x1080px (JPG, PNG)</p>
          </div>

          {/* Live Preview Card */}
          <div className="card-glass p-6">
            <div className="mb-4 flex items-center gap-2">
              <Eye size={16} className="text-lime-green" />
              <label className="text-xs font-bold uppercase tracking-wider text-lime-green">Vista Previa de la Tarjeta</label>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-0 overflow-hidden shadow-2xl">
              <div className="relative h-48 w-full bg-dark-blue">
                {form.cover_image ? (
                  <img src={form.cover_image} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-lime-green/20 text-4xl">✦</div>
                )}
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-lime-green/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-lime-green">Artículo</span>
                  <span className="text-[10px] text-cream/40">Feb 18, 2026</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-cream line-clamp-2">{form.title || "Título del artículo"}</h3>
                <p className="text-sm text-cream/60 line-clamp-3">{form.excerpt || "Aquí aparecerá un breve extracto del contenido de tu artículo de blog..."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .card-glass {
          @apply rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl shadow-xl shadow-black/20;
        }
        .input-glass {
          @apply w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-cream placeholder:text-cream/20 outline-none focus:border-lime-green/50 focus:bg-black/40 transition-all;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-lime-green">{label}</label>
      {children}
    </div>
  );
}
