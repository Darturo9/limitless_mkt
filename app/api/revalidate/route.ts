import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getBearerToken(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice(7).trim() || null;
}

async function hasValidSupabaseSession(token: string): Promise<boolean> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return false;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase.auth.getUser(token);
  return !error && Boolean(data.user);
}

export async function POST(req: NextRequest) {
  const configuredSecret = process.env.REVALIDATE_SECRET;
  const requestSecret = req.headers.get("x-revalidate-secret");
  const secretAuthorized = Boolean(
    configuredSecret && requestSecret && requestSecret === configuredSecret
  );

  const bearerToken = getBearerToken(req);
  const sessionAuthorized = bearerToken
    ? await hasValidSupabaseSession(bearerToken)
    : false;

  if (!secretAuthorized && !sessionAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { paths } = await req.json();
  if (!paths || !Array.isArray(paths)) {
    return NextResponse.json({ error: "paths required" }, { status: 400 });
  }

  const validPaths = paths.filter(
    (path): path is string => typeof path === "string" && path.startsWith("/")
  );
  if (validPaths.length === 0) {
    return NextResponse.json({ error: "No valid paths provided" }, { status: 400 });
  }

  for (const path of validPaths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, count: validPaths.length });
}
