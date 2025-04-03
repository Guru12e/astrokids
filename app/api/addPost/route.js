import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    const { title, slug, type, image, content, createdAt } =
      await request.json();

    if (!title || !slug || !content || !image) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await client.connect();
    const database = client.db("AstroKids");
    const collection = database.collection("blogs");

    const existingBlog = await collection.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json(
        { message: "Blog with this slug already exists" },
        { status: 409 }
      );
    }

    await collection.insertOne({
      title,
      image,
      slug,
      type: type || 1,
      content,
      createdAt: createdAt || new Date(),
    });

    return NextResponse.json(
      { message: "Blog post added successfully" },
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
