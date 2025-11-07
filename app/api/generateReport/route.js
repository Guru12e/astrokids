import path from "path";
import {
  calculateDasa,
  generateBirthNavamsaChart,
  getDetails,
} from "@/lib/details";
import { NextResponse } from "next/server";
import { generateReport } from "@/lib/report";

export async function POST(request) {
  try {
    const { dob, location, lat, lon, gender, name, input, email } =
      await request.json();

    const { planets, panchang } = getDetails(dob, lat, lon);
    const mainPath = path.join(process.cwd(), "public");

    const images = await generateBirthNavamsaChart(
      planets,
      mainPath,
      dob,
      location,
      name
    );

    const dasa = calculateDasa(dob, planets[2]);

    const report = generateReport(
      mainPath,
      planets,
      panchang,
      dasa,
      images,
      dob,
      location,
      name,
      gender,
      input
    );

    return NextResponse.json({ status: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error parsing request data:", error);
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}
