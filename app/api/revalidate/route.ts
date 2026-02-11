import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { paths } = await req.json();
  if (!paths || !Array.isArray(paths)) {
    return NextResponse.json({ error: "paths required" }, { status: 400 });
  }
  for (const path of paths) {
    revalidatePath(path);
  }
  return NextResponse.json({ revalidated: true });
}
