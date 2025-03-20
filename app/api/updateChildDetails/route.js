import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function PUT(request) {
  const { email, isChecked, orderId } = await request.json();

  try {
    await client.connect();
    const database = client.db("AstroKids");
    const collection = database.collection("childDetails");

    console.log(email, isChecked, orderId);

    const updateResult = await collection.updateOne(
      { email: email, "childDetails.orderId": orderId },
      {
        $set: {
          "childDetails.$.isChecked": isChecked,
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      return new Response("Child not found", { status: 404 });
    }

    return new Response("Child status updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating child status:", error);
    return new Response("Error updating child status", { status: 500 });
  } finally {
    await client.close();
  }
}
