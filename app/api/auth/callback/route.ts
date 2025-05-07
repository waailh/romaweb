// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const res = searchParams.get("res");

  if (!res) {
    return NextResponse.json({ error: "No Response" }, { status: 400 });
  }

  const parsed = JSON.parse(decodeURIComponent(res));

  return NextResponse.json({ response: parsed.original });
}
