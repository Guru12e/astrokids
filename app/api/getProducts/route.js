import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db("AstroKids");
    const collection = database.collection("Products");
    const products = (await collection.find().toArray());

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
