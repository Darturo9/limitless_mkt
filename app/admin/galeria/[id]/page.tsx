"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
        if (data) setForm({ title: data.title, description: data.description ?? "", image_url: data.image_url, category: data.category ?? "", order_index: data.order_index, published: data.published });
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
        setMessage("Item creado."); setTimeout(() => router.push("/admin/galeria"), 1000);
      }
    } else {
      const { error } = await supabase.from("gallery_items").update(payload).eq("id", id);
      if (error) { setMessage("Error: " + error.message); }
      else {
        await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paths: ["/galeria"] }) });
        setMessage("Guardado correctamente.");
      }
    }
    setSaving(false);
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-8 flex items-center gap-4">
        <button onClick={() => router.push("/admin/galeria")} className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Volver
        </button>
        <h1 className="text-2xl font-bold text-white">{isNew ? "Subir imagen" : "Editar imagen"}</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <Field label="Imagen *">
          <div className="space-y-2">
            {form.image_url ? (
              <img src={form.image_url} alt="Preview" className="h-48 w-full rounded-lg object-cover" />
            ) : (
              <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-700 text-gray-500 text-sm">
                Sin imagen
              </div>
            )}
            <input type="file" accept="image/*" ref={fileRef} onChange={handleImageUpload} className="hidden" />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:border-lime-400/50 hover:text-white transition-colors disabled:opacity-50"
            >
              {uploading ? "Subiendo..." : "Seleccionar imagen"}
            </button>
          </div>
        </Field>

        <Field label="Título *">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
            placeholder="Nombre del trabajo"
            className={inputCls}
          />
        </Field>

        <Field label="Descripción">
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={3}
            placeholder="Breve descripción del trabajo..."
            className={`${inputCls} resize-none`}
          />
        </Field>

        <Field label="Categoría">
          <input
            type="text"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            placeholder="Ej: Social Media, Branding, Web..."
            className={inputCls}
          />
        </Field>

        <Field label="Orden">
          <input
            type="number"
            value={form.order_index}
            onChange={(e) => setForm((f) => ({ ...f, order_index: Number(e.target.value) }))}
            min={0}
            className={inputCls}
          />
        </Field>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            className="h-4 w-4 rounded accent-lime-400"
          />
          <label htmlFor="published" className="text-sm text-gray-300">Publicar en el sitio</label>
        </div>

        {message && (
          <p className={`rounded-lg px-4 py-3 text-sm ${message.startsWith("Error") ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-lime-400/10 text-lime-400 border border-lime-400/20"}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-lime-400 px-6 py-3 font-semibold text-black hover:bg-lime-300 transition-colors disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}

const inputCls = "w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-lime-400/50 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-400">{label}</label>
      {children}
    </div>
  );
}
