import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    const { email, number, age } = await request.json();

    await client.connect();
    const database = client.db("AstroKids");
    const collection = database.collection("quizEmail");

    const user = await collection.findOne({ email });

    if (user) {
      return NextResponse.json({ message: "Report Send" }, { status: 200 });
    } else {
      await collection.insertOne({
        email,
        number,
        age,
        addedAt: new Date(),
      });
    }

    return NextResponse.json({ message: "Report Send" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
