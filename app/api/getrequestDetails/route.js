import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    await client.connect();
    const database = client.db("AstroKids");
    const collection = database.collection("requestDetails");

    const data = await collection.find().toArray();

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
