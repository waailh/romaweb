import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const provider = searchParams.get("provider");
  const user_encoded = searchParams.get("user");

  const user = JSON.parse(decodeURIComponent(user_encoded!));

  return NextResponse.json({
    msg: "Hello World",
    data: { provider, token, user },
  });
}
