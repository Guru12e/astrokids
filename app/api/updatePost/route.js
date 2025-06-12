import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function PUT(request) {
  try {
    const {
      title,
      slug,
      type,
      content,
      createdAt,
      metaTitle,
      metaDescription,
    } = await request.json();

    if (!title || !slug || !content) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await client.connect();
    const database = client.db("AstroKids");
    const collection = database.collection("blogs");

    const result = await collection.updateOne(
      { slug },
      {
        $set: {
          title,
          slug,
          type,
          content,
          createdAt,
          metaTitle,
          metaDescription,
        },
      },
      { upsert: false }
    );

    if (result.matchedCount === 1) {
      return NextResponse.json(
        { message: "Blog updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { message: "Error updating blog" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
