"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Film, Image as ImageIcon, Save, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { Upload as TusUpload } from "tus-js-client";

type MediaType = "image" | "video";

type FormState = {
  title: string;
  description: string;
  image_url: string;
  media_type: MediaType;
  video_url: string;
  poster_url: string;
  category: string;
  order_index: number;
  published: boolean;
};

type UploadedAsset = {
  bucket: "gallery-images" | "gallery-videos";
  path: string;
  url: string;
};

const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
const INITIAL_FORM: FormState = {
  title: "",
  description: "",
  image_url: "",
  media_type: "image",
  video_url: "",
  poster_url: "",
  category: "",
  order_index: 0,
  published: false,
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Ocurrió un error inesperado";
}

function getResumableEndpoint() {
  const configuredUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!configuredUrl) throw new Error("Falta NEXT_PUBLIC_SUPABASE_URL en la configuración.");

  const url = new URL(configuredUrl);
  const hostnameParts = url.hostname.split(".");
  const isSupabaseHosted = url.hostname.endsWith(".supabase.co") && hostnameParts.length >= 3;
  const storageOrigin = isSupabaseHosted
    ? `https://${hostnameParts[0]}.storage.supabase.co`
    : url.origin;

  return `${storageOrigin}/storage/v1/upload/resumable`;
}

export default function EditGalleryItem() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === "nuevo";

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const mediaFileRef = useRef<HTMLInputElement>(null);
  const posterFileRef = useRef<HTMLInputElement>(null);
  const activeUploadRef = useRef<TusUpload | null>(null);
  const pendingUploadsRef = useRef<UploadedAsset[]>([]);

  useEffect(() => {
    if (!isNew) {
      supabase.from("gallery_items").select("*").eq("id", id).single().then(({ data }) => {
        if (!data) return;

        setForm({
          title: data.title,
          description: data.description ?? "",
          image_url: data.image_url ?? "",
          media_type: data.media_type === "video" ? "video" : "image",
          video_url: data.video_url ?? "",
          poster_url: data.poster_url ?? "",
          category: data.category ?? "",
          order_index: data.order_index,
          published: data.published,
        });
      });
    }
  }, [id, isNew]);

  useEffect(() => {
    return () => {
      void activeUploadRef.current?.abort();
    };
  }, []);

  async function uploadImageAsset(file: File): Promise<UploadedAsset> {
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("gallery-images").upload(path, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

    if (error) throw error;

    const { data } = supabase.storage.from("gallery-images").getPublicUrl(path);
    return { bucket: "gallery-images", path, url: data.publicUrl };
  }

  async function uploadVideoAsset(file: File): Promise<UploadedAsset> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) throw new Error("Tu sesión expiró. Vuelve a iniciar sesión.");

    const path = `${crypto.randomUUID()}.mp4`;
    const endpoint = getResumableEndpoint();

    return new Promise((resolve, reject) => {
      const upload = new TusUpload(file, {
        endpoint,
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        metadata: {
          bucketName: "gallery-videos",
          objectName: path,
          contentType: "video/mp4",
          cacheControl: "3600",
        },
        chunkSize: 6 * 1024 * 1024,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        uploadDataDuringCreation: true,
        removeFingerprintOnSuccess: true,
        onProgress: (bytesUploaded, bytesTotal) => {
          setUploadProgress(Math.round((bytesUploaded / bytesTotal) * 100));
        },
        onError: reject,
        onSuccess: () => {
          const { data } = supabase.storage.from("gallery-videos").getPublicUrl(path);
          activeUploadRef.current = null;
          resolve({ bucket: "gallery-videos", path, url: data.publicUrl });
        },
      });

      activeUploadRef.current = upload;
      upload.start();
    });
  }

  async function handleMediaUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setMessage("");
    setUploading(true);
    setUploadProgress(0);

    try {
      if (form.media_type === "video") {
        const isMp4 = file.type === "video/mp4" || file.name.toLowerCase().endsWith(".mp4");
        if (!isMp4) throw new Error("El video debe estar en formato MP4.");
        if (file.size > MAX_VIDEO_SIZE) throw new Error("El video no puede superar los 50 MB.");

        const asset = await uploadVideoAsset(file);
        pendingUploadsRef.current.push(asset);
        setForm((current) => ({ ...current, image_url: "", video_url: asset.url }));
        setMessage("Video cargado. Guarda el proyecto para publicarlo.");
      } else {
        if (!file.type.startsWith("image/")) throw new Error("Selecciona un archivo de imagen válido.");

        const asset = await uploadImageAsset(file);
        pendingUploadsRef.current.push(asset);
        setForm((current) => ({ ...current, image_url: asset.url, video_url: "", poster_url: "" }));
        setMessage("Imagen cargada. Guarda el proyecto para publicarlo.");
      }
    } catch (error) {
      setMessage(`Error: ${getErrorMessage(error)}`);
    } finally {
      activeUploadRef.current = null;
      setUploading(false);
      setUploadProgress(0);
    }
  }

  async function handlePosterUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Error: La miniatura debe ser una imagen.");
      return;
    }

    setMessage("");
    setUploading(true);

    try {
      const asset = await uploadImageAsset(file);
      pendingUploadsRef.current.push(asset);
      setForm((current) => ({ ...current, poster_url: asset.url }));
      setMessage("Miniatura cargada. Guarda el proyecto para conservarla.");
    } catch (error) {
      setMessage(`Error: ${getErrorMessage(error)}`);
    } finally {
      setUploading(false);
    }
  }

  async function cleanupPendingUploads() {
    const pending = pendingUploadsRef.current.splice(0);
    await Promise.all(
      pending.map(({ bucket, path }) => supabase.storage.from(bucket).remove([path]))
    );
  }

  async function triggerRevalidate(paths: string[]) {
    const { data: { session } } = await supabase.auth.getSession();
    const headers: Record<string, string> = { "Content-Type": "application/json" };

    if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;

    const response = await fetch("/api/revalidate", {
      method: "POST",
      headers,
      body: JSON.stringify({ paths }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      throw new Error(payload?.error || "No se pudo revalidar contenido");
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const hasMedia = form.media_type === "video" ? form.video_url : form.image_url;
    if (!hasMedia) {
      setMessage(`Error: Debes subir ${form.media_type === "video" ? "un video" : "una imagen"}.`);
      return;
    }

    setSaving(true);
    setMessage("");

    const payload = {
      title: form.title,
      description: form.description || null,
      image_url: form.media_type === "image" ? form.image_url : null,
      media_type: form.media_type,
      video_url: form.media_type === "video" ? form.video_url : null,
      poster_url: form.media_type === "video" ? form.poster_url || null : null,
      category: form.category || null,
      order_index: form.order_index,
      published: form.published,
    };

    try {
      const result = isNew
        ? await supabase.from("gallery_items").insert(payload)
        : await supabase.from("gallery_items").update(payload).eq("id", id);

      if (result.error) throw result.error;

      pendingUploadsRef.current = [];
      await triggerRevalidate(["/galeria"]).catch(() => null);
      setMessage(isNew ? "Item creado exitosamente." : "Cambios guardados correctamente.");

      if (isNew) setTimeout(() => router.push("/admin/galeria"), 1000);
    } catch (error) {
      await cleanupPendingUploads();
      setMessage(`Error: ${getErrorMessage(error)}`);
    } finally {
      setSaving(false);
    }
  }

  function setMediaType(media_type: MediaType) {
    setForm((current) => ({
      ...current,
      media_type,
      ...(media_type === "video"
        ? { image_url: "" }
        : { video_url: "", poster_url: "" }),
    }));
    setMessage("");
  }

  const previewImage = form.media_type === "image" ? form.image_url : form.poster_url;

  return (
    <div className="mx-auto max-w-7xl pb-20">
      <div className="sticky top-0 z-20 -mx-8 mb-8 flex flex-col gap-4 border-b border-white/5 bg-black/80 px-8 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/admin/galeria")} className="group rounded-full bg-white/5 p-2 text-cream/60 transition-colors hover:bg-white/10 hover:text-white">
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">{isNew ? "Nuevo Item" : "Editar Item"}</h1>
            <p className="text-xs text-cream/40">{isNew ? "Añade un proyecto a tu portafolio" : `Editando: ${form.title}`}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {message && (
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium ${message.startsWith("Error") ? "bg-red-500/10 text-red-400" : "bg-lime-green/10 text-lime-green"}`}>
              {message.startsWith("Error") ? <AlertCircle size={14} /> : <CheckCircle size={14} />}
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={() => setForm((current) => ({ ...current, published: !current.published }))}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${form.published ? "bg-lime-green text-black" : "bg-white/5 text-cream/40 hover:text-white"}`}
          >
            {form.published ? "Visible" : "Oculto"}
          </button>

          <button
            onClick={handleSave}
            disabled={saving || uploading}
            className="flex items-center gap-2 rounded-xl bg-lime-green px-6 py-2.5 text-sm font-bold text-black shadow-lg shadow-lime-green/20 transition-all hover:scale-105 hover:bg-neon-yellow hover:shadow-neon-yellow/30 disabled:pointer-events-none disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="card-glass space-y-6 p-6">
            <Field label="Título del Proyecto">
              <input type="text" value={form.title} onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))} required placeholder="Nombre del trabajo..." className="input-glass font-bold" />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Categoría">
                <input type="text" value={form.category} onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))} placeholder="Ej: Branding" className="input-glass" />
              </Field>
              <Field label="Orden (Prioridad)">
                <input type="number" value={form.order_index} onChange={(e) => setForm((current) => ({ ...current, order_index: Number(e.target.value) }))} min={0} className="input-glass" />
              </Field>
            </div>

            <Field label="Descripción Corta">
              <textarea value={form.description} onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))} rows={4} placeholder="Breve descripción del proyecto..." className="input-glass resize-none" />
            </Field>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-glass p-6">
            <label className="mb-4 block text-xs font-bold uppercase tracking-wider text-lime-green">Tipo de medio</label>
            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Tipo de medio">
              <button type="button" role="radio" aria-checked={form.media_type === "image"} onClick={() => setMediaType("image")} className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${form.media_type === "image" ? "border-lime-green bg-lime-green text-black" : "border-white/10 bg-white/5 text-cream/60 hover:border-lime-green/50 hover:text-white"}`}>
                <ImageIcon size={18} /> Imagen
              </button>
              <button type="button" role="radio" aria-checked={form.media_type === "video"} onClick={() => setMediaType("video")} className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${form.media_type === "video" ? "border-lime-green bg-lime-green text-black" : "border-white/10 bg-white/5 text-cream/60 hover:border-lime-green/50 hover:text-white"}`}>
                <Film size={18} /> Video MP4
              </button>
            </div>
          </div>

          <div className="card-glass p-6">
            <label className="mb-4 block text-xs font-bold uppercase tracking-wider text-lime-green">
              {form.media_type === "video" ? "Video del Proyecto" : "Imagen del Proyecto"}
            </label>

            <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              {form.media_type === "video" && form.video_url ? (
                <video src={form.video_url} poster={form.poster_url || undefined} controls playsInline preload="metadata" className="h-full w-full object-contain" />
              ) : previewImage ? (
                <Image src={previewImage} alt="Vista previa del proyecto" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-cream/20">
                  {form.media_type === "video" ? <Film size={48} /> : <ImageIcon size={48} />}
                  <span className="text-sm font-medium">{form.media_type === "video" ? "Sin video" : "Sin imagen"}</span>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                <button type="button" onClick={() => mediaFileRef.current?.click()} disabled={uploading} className="pointer-events-auto flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105 disabled:opacity-50">
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  {uploading ? (form.media_type === "video" ? `Subiendo ${uploadProgress}%` : "Subiendo...") : `Seleccionar ${form.media_type === "video" ? "Video" : "Imagen"}`}
                </button>
              </div>
            </div>

            <input ref={mediaFileRef} type="file" accept={form.media_type === "video" ? "video/mp4,.mp4" : "image/*"} onChange={handleMediaUpload} className="hidden" />

            {uploading && form.media_type === "video" && (
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10" aria-label={`Carga ${uploadProgress}%`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={uploadProgress}>
                <div className="h-full rounded-full bg-lime-green transition-[width] duration-300" style={{ width: `${uploadProgress}%` }} />
              </div>
            )}

            <p className="mt-3 text-center text-xs text-cream/40">
              {form.media_type === "video" ? "MP4 H.264, máximo 50 MB." : "Se recomienda una imagen cuadrada o vertical de alta calidad."}
            </p>
          </div>

          {form.media_type === "video" && (
            <div className="card-glass p-6">
              <label className="mb-4 block text-xs font-bold uppercase tracking-wider text-lime-green">Miniatura (opcional)</label>
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/20">
                  {form.poster_url ? <Image src={form.poster_url} alt="Miniatura del video" fill sizes="144px" className="object-cover" /> : <div className="flex h-full items-center justify-center text-cream/20"><ImageIcon size={28} /></div>}
                </div>
                <div>
                  <button type="button" onClick={() => posterFileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-lime-green/50 hover:text-white disabled:opacity-50">
                    <Upload size={16} /> Seleccionar miniatura
                  </button>
                  <p className="mt-2 text-xs text-cream/40">Se muestra en la tarjeta antes de abrir el video.</p>
                </div>
              </div>
              <input ref={posterFileRef} type="file" accept="image/*" onChange={handlePosterUpload} className="hidden" />
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .card-glass {
          @apply rounded-3xl border border-white/5 bg-white/5 shadow-xl shadow-black/20 backdrop-blur-xl;
        }
        .input-glass {
          @apply w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-cream outline-none transition-all placeholder:text-cream/20 focus:border-lime-green/50 focus:bg-black/40;
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
