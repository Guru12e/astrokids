import path from "path";
import { calculateDasa, getDetails } from "@/lib/details";
import { NextResponse } from "next/server";
import { generateReport } from "@/lib/report";

export async function POST(request) {
  try {
    const { dob, location, lat, lon, timezone, gender, name, input, email } =
      await request.json();
    try {
      const { planets, panchang, images } = await getDetails(
        dob,
        lat,
        lon,
        timezone,
        name,
        location
      );

      const mainPath = path.join(process.cwd(), "public");
      const dasa = calculateDasa(dob, planets[2]);

      await generateReport(
        mainPath,
        planets,
        panchang,
        dasa,
        images,
        dob,
        location,
        name,
        gender,
        input,
        email
      );
    } catch (err) {
      console.error("❌ Background Task Error:", err);
    }

    return NextResponse.json(
      { message: "Report generation started" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error parsing request data:", error);
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}
