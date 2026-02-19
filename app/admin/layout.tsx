"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { LayoutDashboard, FileText, Image as ImageIcon, LogOut, Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && pathname !== "/admin/login") {
        router.replace("/admin/login");
      } else {
        setChecking(false);
      }
    });
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-lime-green">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-cream selection:bg-lime-green selection:text-black">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 h-full w-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-lime-green/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple/10 blur-[120px]" />
      </div>

      {/* Sidebar */}
      <aside className="relative z-10 w-64 shrink-0 border-r border-white/5 bg-white/5 backdrop-blur-xl p-6 flex flex-col gap-2">
        <div className="mb-10 px-2 mt-2">
          <Link href="/" className="block">
            <span className="text-2xl font-bold tracking-tighter text-white">
              Limitless <span className="text-lime-green">.</span>
            </span>
            <span className="text-xs font-medium text-cream/40 tracking-widest uppercase">
              Admin Panel
            </span>
          </Link>
        </div>

        <div className="space-y-1">
          <NavLink href="/admin" label="Dashboard" icon={<LayoutDashboard size={20} />} exact />
          <div className="my-4 h-px bg-white/5" />
          <p className="px-4 text-xs font-semibold text-cream/30 uppercase tracking-wider mb-2">Contenido</p>
          <NavLink href="/admin/blog" label="Blog" icon={<FileText size={20} />} />
          <NavLink href="/admin/galeria" label="Galería" icon={<ImageIcon size={20} />} />
        </div>

        <div className="mt-auto pt-8 border-t border-white/5">
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.replace("/admin/login");
            }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-cream/60 transition-all hover:bg-white/5 hover:text-red-400 group"
          >
            <LogOut size={18} className="transition-transform group-hover:-translate-x-1" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="relative z-10 flex-1 overflow-auto p-8 lg:p-12">
        <div className="mx-auto max-w-6xl animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavLink({ href, label, icon, exact }: { href: string; label: string; icon: React.ReactNode; exact?: boolean }) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${active
          ? "bg-lime-green text-black shadow-lg shadow-lime-green/20"
          : "text-cream/60 hover:bg-white/5 hover:text-white"
        }`}
    >
      {icon}
      {label}
    </Link>
  );
}
