"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, Upload, Eye, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function EditGalleryItem() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === "nuevo";

  const [form, setForm] = useState({ title: "", description: "", image_url: "", category: "", order_index: 0, published: false });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isNew) {
      supabase.from("gallery_items").select("*").eq("id", id).single().then(({ data }) => {
        if (data) setForm({
          title: data.title,
          description: data.description ?? "",
          image_url: data.image_url,
          category: data.category ?? "",
          order_index: data.order_index,
          published: data.published
        });
      });
    }
  }, [id, isNew]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("gallery-images").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("gallery-images").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
    }
    setUploading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.image_url) { setMessage("Error: Debes subir una imagen."); return; }
    setSaving(true);
    setMessage("");

    const payload = { title: form.title, description: form.description || null, image_url: form.image_url, category: form.category || null, order_index: form.order_index, published: form.published };

    if (isNew) {
      const { error } = await supabase.from("gallery_items").insert(payload);
      if (error) { setMessage("Error: " + error.message); }
      else {
        await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paths: ["/galeria"] }) });
        setMessage("Item creado exitosamente."); setTimeout(() => router.push("/admin/galeria"), 1000);
      }
    } else {
      const { error } = await supabase.from("gallery_items").update(payload).eq("id", id);
      if (error) { setMessage("Error: " + error.message); }
      else {
        await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paths: ["/galeria"] }) });
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
          <button onClick={() => router.push("/admin/galeria")} className="group rounded-full bg-white/5 p-2 text-cream/60 transition-colors hover:bg-white/10 hover:text-white">
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{isNew ? "Nuevo Item" : "Editar Item"}</h1>
            <p className="text-xs text-cream/40">{isNew ? "Añade un proyecto a tu portafolio" : `Editando: ${form.title}`}</p>
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
              {form.published ? "Visible" : "Oculto"}
            </button>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-lime-green px-6 py-2.5 text-sm font-bold text-black shadow-lg shadow-lime-green/20 transition-all hover:bg-neon-yellow hover:scale-105 hover:shadow-neon-yellow/30 disabled:opacity-50 disabled:pointer-events-none"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Form Column */}
        <div className="space-y-6">
          <div className="card-glass p-6 space-y-6">
            <Field label="Título del Proyecto">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
                placeholder="Nombre del trabajo..."
                className="input-glass font-bold"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Categoría">
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  placeholder="Ej: Branding"
                  className="input-glass"
                />
              </Field>
              <Field label="Orden (Prioridad)">
                <input
                  type="number"
                  value={form.order_index}
                  onChange={(e) => setForm((f) => ({ ...f, order_index: Number(e.target.value) }))}
                  min={0}
                  className="input-glass"
                />
              </Field>
            </div>

            <Field label="Descripción Corta">
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={4}
                placeholder="Breve descripción del proyecto..."
                className="input-glass resize-none"
              />
            </Field>
          </div>
        </div>

        {/* Image / Preview Column */}
        <div className="space-y-6">
          <div className="card-glass p-6">
            <label className="mb-4 block text-xs font-bold uppercase tracking-wider text-lime-green">Imagen del Proyecto</label>

            <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              {form.image_url ? (
                <img src={form.image_url} alt="Preview" className="h-full w-full object-cover" />
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
                  {uploading ? "Subiendo..." : "Seleccionar Imagen"}
                </button>
              </div>
            </div>
            <input type="file" accept="image/*" ref={fileRef} onChange={handleImageUpload} className="hidden" />
            <p className="mt-3 text-center text-xs text-cream/40">Se recomienda una imagen cuadrada o vertical de alta calidad.</p>
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
