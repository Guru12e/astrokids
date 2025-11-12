import { getDetails } from "@/lib/details";
import clientPromise from "@/lib/mongo";
import { generateReport } from "@/lib/report";
import path from "path";

export async function GET() {
  try {
    const client = await clientPromise;

    const database = client.db("AstroKids");
    const collection = database.collection("childDetails");
    const data = await collection.find();

    // database = client["AstroKids"]
    //         collection = database["childDetails"]
    //         six_hours_ago = datetime.now() - timedelta(hours=6)

    //         pipeline = [
    //             {"$unwind": "$childDetails"},
    //             {"$match": {
    //                 "childDetails.addedAt": {"$lt": six_hours_ago},
    //                 "childDetails.isChecked": False
    //             }},
    //             {"$project": {"childDetails": 1, "email": 1, "_id": 0}}
    //         ]

    //         childDetails = list(collection.aggregate(pipeline))
    //         logger.info(f"Found {len(childDetails)} child records")

    //         for child in childDetails:
    //             details = child["childDetails"]
    //             try:
    //                 logger.info(f"Before babyReport for {details['name']}")
    //                 babyReport(
    //                     f"{details['dob']} {details['time']}:00",
    //                     details['place'],
    //                     details['lat'],
    //                     details['lon'],
    //                     app.root_path,
    //                     details['gender'],
    //                     details['name'],
    //                     "5.30",
    //                     plans.index(details['plan']) + 1,
    //                     email=child['email'],
    //                 )

    //                 collection.find_one_and_update(
    //                     {"childDetails.orderId": details['orderId']},
    //                     {"$set": {"childDetails.$.isChecked": True}},
    //                     return_document=True
    //                 )

    // convert this to js
    const pipeline = [
      { $unwind: "$childDetails" },
      {
        $match: {
          "childDetails.addedAt": {
            $lt: new Date(Date.now() - 6 * 60 * 60 * 1000),
          },
          "childDetails.isChecked": false,
        },
      },
      { $project: { childDetails: 1, email: 1, _id: 0 } },
    ];

    const childDetails = await collection.aggregate(pipeline).toArray();
    console.log(`Found ${childDetails.length} child records`);
    for (const child of childDetails) {
      const details = child.childDetails;
      try {
        const { planets, panchang, images } = await getDetails(
          `${details.dob} ${details.time}:00`,
          details.lat,
          details.lon,
          details.timezone,
          details.name,
          details.place
        );

        const report = await generateReport(
          path.join(process.cwd()),
          `${details.dob} ${details.time}:00`,
          details.place,
          details.lat,
          details.lon,
          details.gender,
          details.name,
          details.gender,
          details.plan,
          details.orderId,
          child.email
        );

        if (report.status === "success") {
          await collection.findOneAndUpdate(
            { "childDetails.orderId": details.orderId },
            { $set: { "childDetails.$.isChecked": true } },
            { returnDocument: "after" }
          );
        }
      } catch (error) {
        console.error(`Error generating report for ${details.name}:`, error);
      }
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch data", details: error.message }),
      { status: 500 }
    );
  }
}
