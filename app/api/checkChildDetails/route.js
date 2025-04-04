import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, name, dob, time, place, gender, number } =
      await request.json();

    const client = await clientPromise;
    const database = client.db("AstroKids");
    const collection = database.collection("childDetails");

    const user = await collection.findOne({ email });

    if (user) {
      let status = user.childDetails.some(
        (child) =>
          child.name === name && child.dob === dob && child.time === time
      );

      if (status) {
        return NextResponse.json(
          { message: "Child details found" },
          { status: 400 }
        );
      } else {
        const collection1 = database.collection("requestDetails");

        const requestUser = await collection1.findOne({ email });

        if (requestUser) {
          const childExists = requestUser.childDetails.some(
            (child) => child.name === name
          );

          if (childExists) {
            return NextResponse.json(
              { message: "Child already exists" },
              { status: 400 }
            );
          } else {
            await collection1.updateOne(
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
          }
        } else {
          await collection1.insertOne({
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
          { message: "Child details not found" },
          { status: 200 }
        );
      }
    } else {
      const collection1 = database.collection("requestDetails");

      const requestUser = await collection1.findOne({ email });

      if (requestUser) {
        const childExists = requestUser.childDetails.some(
          (child) =>
            child.name === name && child.dob === dob && child.time === time
        );

        if (childExists) {
          return NextResponse.json(
            { message: "Child already exists" },
            { status: 200 }
          );
        } else {
          await collection1.updateOne(
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
        }
      } else {
        await collection1.insertOne({
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

      return NextResponse.json({ message: "User not found" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error Check child details:", error);
    return NextResponse.json(
      { message: "Error Check child details" },
      { status: 500 }
    );
  }
}
