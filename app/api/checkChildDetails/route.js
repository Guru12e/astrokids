import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, name, dob, time, place, gender, number } =
      await request.json();

    const client = await clientPromise;
    const database = client.db("AstroKids");

    const childCollection = database.collection("childDetails");
    const requestCollection = database.collection("requestDetails");

    const user = await childCollection.findOne({ email });

    if (user) {
      const childExists = user.childDetails.some(
        (child) =>
          child.name === name && child.dob === dob && child.time === time
      );

      if (childExists) {
        return NextResponse.json(
          { message: "Child details already exist" },
          { status: 400 }
        );
      }
    }

    const requestUser = await requestCollection.findOne({ email });

    if (requestUser) {
      const childExists = requestUser.childDetails.some(
        (child) =>
          child.name === name && child.dob === dob && child.time === time
      );

      if (childExists) {
        return NextResponse.json(
          { message: "Child already exists in request" },
          { status: 400 }
        );
      }

      await requestCollection.updateOne(
        { email },
        {
          $push: {
            childDetails: {
              name,
              dob,
              time,
              place,
              gender,
              number,
              addedAt: new Date(),
            },
          },
        }
      );
    } else {
      await requestCollection.insertOne({
        email,
        childDetails: [
          {
            name,
            dob,
            time,
            place,
            gender,
            number,
            addedAt: new Date(),
          },
        ],
      });
    }

    return NextResponse.json(
      { message: "Child details added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking child details:", error);
    return NextResponse.json(
      { message: "Error checking child details" },
      { status: 500 }
    );
  }
}
