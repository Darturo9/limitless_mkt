"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase, type BlogPost } from "@/lib/supabase";

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
        if (data) setForm({ title: data.title, slug: data.slug, excerpt: data.excerpt ?? "", content: data.content, cover_image: data.cover_image ?? "", published: data.published });
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
      else { setMessage("Post creado."); setTimeout(() => router.push("/admin/blog"), 1000); }
    } else {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", id);
      if (error) { setMessage("Error: " + error.message); }
      else { setMessage("Guardado correctamente."); }
    }
    setSaving(false);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center gap-4">
        <button onClick={() => router.push("/admin/blog")} className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Volver
        </button>
        <h1 className="text-2xl font-bold text-white">{isNew ? "Nuevo post" : "Editar post"}</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <Field label="Título *">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: isNew ? generateSlug(e.target.value) : f.slug }))}
            required
            placeholder="Título del post"
            className={inputCls}
          />
        </Field>

        <Field label="Slug *">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            required
            placeholder="url-del-post"
            className={inputCls}
          />
        </Field>

        <Field label="Extracto">
          <input
            type="text"
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            placeholder="Breve descripción del post"
            className={inputCls}
          />
        </Field>

        <Field label="Imagen de portada">
          <div className="space-y-2">
            {form.cover_image && (
              <img src={form.cover_image} alt="Cover" className="h-40 w-full rounded-lg object-cover" />
            )}
            <input type="file" accept="image/*" ref={fileRef} onChange={handleImageUpload} className="hidden" />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:border-lime-400/50 hover:text-white transition-colors disabled:opacity-50"
            >
              {uploading ? "Subiendo..." : "Subir imagen"}
            </button>
          </div>
        </Field>

        <Field label="Contenido *">
          <textarea
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            required
            rows={12}
            placeholder="Escribe el contenido del post..."
            className={`${inputCls} resize-y`}
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
          <label htmlFor="published" className="text-sm text-gray-300">Publicar</label>
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
