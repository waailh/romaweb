import { NextRequest, NextResponse, userAgent } from "next/server";
import { headers } from "next/headers";
import axios from "axios";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;

/** @param {NextRequest} req */
export async function GET(req: Request) {
  const { ua } = userAgent(req);

  const headersList = headers();
  // const ip = headersList.get("x-forwarded-for");
  const ip = "2.50.36.48";

  let data;

  try {
    const response = await axios.get(`${backendHost}/site-settings`);

    data = {
      ok: true,
      data: response.data,
    };

    // console.log(response.data);
  } catch (error) {
    console.log(error);
    data = {
      ok: false,
      ip_address: ip,
      error: JSON.stringify(error),
    };
  }

  // const { country } = response.data;

  return NextResponse.json(data, { status: 200 });
}
