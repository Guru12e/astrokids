import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    const { email, name, dob, time, place, gender, number } =
      await request.json();

    console.log(email, name);
    await client.connect();
    const database = client.db("AstroKids");
    const collection = database.collection("childDetails");

    console.log(dob, time);

    const user = await collection.findOne({ email });

    if (user) {
      let status = false;
      user.childDetails.map((child) => {
        if (child.name == name && child.dob == dob && child.time == time) {
          status = true;
        }
      });

      if (status) {
        return NextResponse.json(
          { message: "Child details found" },
          { status: 400 }
        );
      } else {
        const collection1 = database.collection("requestDetails");

        const requestUser = await collection1.findOne({ email });

        if (requestUser) {
          requestUser.childDetails.map(async (child) => {
            if (child.name == name) {
              return new Response("Child already exist", { status: 400 });
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
          });
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
        requestUser.childDetails.map(async (child) => {
          if (child.name == name && child.dob == dob && child.time == time) {
            return new Response("Child already exist", { status: 200 });
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
        });
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
  } finally {
    await client.close();
  }
}
