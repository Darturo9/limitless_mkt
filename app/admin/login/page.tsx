"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2, Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Credenciales incorrectas. Intenta de nuevo.");
      setLoading(false);
    } else {
      router.replace("/admin");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 relative overflow-hidden selection:bg-lime-green selection:text-black">
      {/* Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-lime-green/10 blur-[120px] animate-pulse delay-700" />
      <div className="absolute bottom-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-purple/10 blur-[120px] animate-pulse" />

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white tracking-tighter mb-2">
            Limitless <span className="text-lime-green">.</span>
          </h1>
          <p className="text-cream/40 font-medium tracking-wide text-sm uppercase">Panel de Administración</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl shadow-black/50">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-lime-green">Email Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@limitlessmkt.com"
                  className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-11 pr-4 text-cream placeholder:text-cream/20 outline-none focus:border-lime-green/50 focus:bg-black/60 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-lime-green">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-11 pr-4 text-cream placeholder:text-cream/20 outline-none focus:border-lime-green/50 focus:bg-black/60 transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-xs font-medium text-red-400 border border-red-500/20 animate-shake">
                <span className="block h-1.5 w-1.5 rounded-full bg-red-500" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-lime-green py-3.5 text-sm font-bold text-black shadow-lg shadow-lime-green/20 transition-all hover:bg-neon-yellow hover:scale-[1.02] hover:shadow-neon-yellow/30 disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Autenticando...
                </>
              ) : (
                <>
                  Ingresar al Sistema
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-cream/20">
          &copy; {new Date().getFullYear()} Limitless Marketing Force. Acceso restringido.
        </p>
      </div>
    </div>
  );
}
