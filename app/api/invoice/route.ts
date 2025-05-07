export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization"); // Get token from headers
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("id"); // Get orderId from query params

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    // Call backend API with order ID in URL
    const response = await axios.get(
      `${backendHost}/purchase-history-invoice/${orderId}`,
      {
        responseType: "arraybuffer",
        headers: {
          Authorization: token,
        },
      }
    );

    return new Response(response.data, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="order_${orderId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return NextResponse.json({ error: "Failed to fetch PDF" }, { status: 500 });
  }
}
