import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    const {
      title,
        price,
        description,
        stock,
        sign,
        nakshatra,
        image,
        vendorId,
    } = await request.json();

    if (
      !title ||
        !price ||
        !description ||
        !stock ||
        !image ||
        !vendorId
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await client.connect();
    const database = client.db("AstroKids");
    const collection = database.collection("Products");

    await collection.insertOne({
      title,
      price,
      description,
      stock,
      sign,
      nakshatra,
      image,
      vendorId,
      createdAt: createdAt || new Date(),
    });

    return NextResponse.json(
      { message: "Product added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding blog post:", error);
    return NextResponse.json(
      { message: "Error adding blog post" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
