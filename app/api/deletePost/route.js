import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function DELETE(request) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    await client.connect();
    const database = client.db("AstroKids");
    const collection = database.collection("blogs");

    const result = await collection.deleteOne({ slug });

    if (result.deletedCount === 1) {
      return NextResponse.json(
        { message: "Blog deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: "Error deleting blog" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
