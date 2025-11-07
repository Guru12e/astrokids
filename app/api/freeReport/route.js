import { NextResponse } from "next/server";
import { getDetails } from "@/lib/details";

export async function POST(req) {
  try {
    const { date, lat, lon } = await req.json();

    const { planets, panchang } = getDetails(date, lat, lon);

    return NextResponse.json({ planets, panchang }, { status: 200 });
  } catch (err) {
    console.error("Error calculating free report:", err);
    return NextResponse.json(
      { message: "Error calculating free report", error: String(err) },
      { status: 500 }
    );
  }
}
