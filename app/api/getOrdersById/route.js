import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function POST() {
  try {
    await client.connect();
    const database = client.db("AstroKids");
    const collection = database.collection("Orders");
    const orders = (await collection.find({
      vendorId: vendorId
    }).toArray());

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Error fetching orders" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
