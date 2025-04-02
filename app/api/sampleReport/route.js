import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    const { email, name, type } = await request.json();
    await client.connect();
    const database = client.db("AstroKids");
    const collection = database.collection("Resources");

    const user = await collection.findOne({ email });

    if (user) {
      return NextResponse.json({ message: "Report Send" }, { status: 200 });
    } else {
      await collection.insertOne({
        email,
        name,
        type,
        addedAt: new Date(),
      });
    }

    return NextResponse.json({ message: "Report Send" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
