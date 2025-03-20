import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    const {
      email,
      name,
      dob,
      time,
      place,
      gender,
      number,
      lat,
      lon,
      orderId,
      plan,
    } = await request.json();

    if (!email || !name || !dob || !time || !place || !gender) {
      return new Response("Missing fields", { status: 400 });
    }

    await client.connect();
    const database = client.db("AstroKids");
    const collection = database.collection("childDetails");

    const user = await collection.findOne({ email });

    if (user) {
      user.childDetails.map(async (child) => {
        if (child.name == name) {
          return new Response("Child already exist", { status: 400 });
        } else {
          await collection.updateOne(
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
                  lat,
                  lon,
                  plan,
                  addedAt: new Date(),
                  isChecked: false,
                  orderId: orderId,
                  isChange: false,
                },
              },
            }
          );
        }
      });
    } else {
      await collection.insertOne({
        email,
        childDetails: [
          {
            name,
            dob,
            time,
            place,
            gender,
            number,
            lat,
            lon,
            plan,
            addedAt: new Date(),
            isChecked: false,
            orderId: orderId,
            isChange: false,
          },
        ],
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });

      const info = await transporter.sendMail({
        from: {
          name: "admin@AstroKids",
          address: process.env.USER,
        },
        to: email,
        subject: "Payment Successful",
        text: `You will recieve the report of your child within 6 hours`,

        html: `<div
      style="
        margin: auto;
        width: 100vw;
        max-width: 600px;
        padding-top: 20px;
        position: relative;
      "
    >
      <div
        style="
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
          width: 100vw;

          height: 100%;
          max-width: 600px;
          background: red;
          opacity: 0.18;
        "
      ></div>
      <div style="z-index: 10; color: black; opacity: 1">
        <div
          style="
            width: 100%;
            margin-top: 40px;
            background-color: #210535;
          "
        >
          <img
            src="https://drive.usercontent.google.com/download?id=1MB_IKZo35iEaSzUCaZCqYT9XU39IKh8h"
            alt="logo"
            style="width: 40%; aspect-ratio: 16 / 9; margin: 0 auto"
          />
        </div>
      </div>
      <div style="padding: 0 20px">
        <div style="width: 100%; display: flex">
          <div style="flex: 1">
            <h1 style="font-size: 20px; font-weight: bold">Dear User,</h1>
            <p>Thank you for your purchase!</p>
            <p>
              Your payment has been successfully received, and we're thrilled to
              begin creating your Personalized Child Astrology Report.
            </p>
          </div>
          <div style="flex: 0.7">
            <img
              src="https://drive.google.com/uc?id=17nVMqLfRSmw34K6hryyfhZGZ1TOhvMBP"
              alt="astrology"
              style="width: 130%; height: 100%"
            />
          </div>
        </div>
        <div style="margin-top: 20px">
          <h2 style="font-size: 20px; font-weight: bold">
            Your Order ID is : ${orderId}
          </h2>
          <p>
            Your report will be ready within 12 to 24 hours,and here's what you can
            look forward to:
          </p>
          <ul>
            <li>Personalized Astrology Insights & Parenting Tips</li>
            <li>Discover Your Child's Astrological Blueprint</li>
            <li>Supporting Strengths, Talents & Emotional Growth</li>
            <li>Empowering You to Raise a Happy, Successful Child!</li>
          </ul>
          <p>
            You'll receive your report in your inbox shortly. If you have any
            questions, feel free to reach out to us!
          </p>
        </div>
        <div
          style="width: 100%;"
        >
          <h2 style="font-size: 20px; font-weight: bold">
            Important Note: You can edit your details
          </h2>
          <div style="text-align: center">
            <p>Name: ${name}</p>
            <p>DOB: ${dob}</p>
            <p>Birth Time: ${time}</p>
            <p>Place: ${place}</p>
            <p>Gender: ${gender}</p>
          </div>
          <a
            href="https://www.astrokids.ai/child-details?paymentEdit=true&orderId=${orderId}"
            style="margin: 0 auto"
          >
            <button
              style="
                background-color: #210535;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin: 0 auto;
              "
            >
              Edit Details
            </button>
          </a>
        </div>
        <div style="margin-top: 70px">
          <p style="font-size: 20px">warm regards,</p>
          <img src="https://drive.usercontent.google.com/download?id=1MB_IKZo35iEaSzUCaZCqYT9XU39IKh8h" alt="signature" width="100px" />
          <p>The Astrokids Team</p>
          <a>support@astrokids.ai</a>
          <a
            href="https://astrokids.ai/"
            style="
              display: block;
              color: black;
              text-decoration: none;
              margin: 10 0px;
            "
            >astrokids.ai</a
          >
        </div>
      </div>
    </div>`,
      });
    } catch (err) {
      console.log(err);
    }
    return new Response("Child details added successfully", { status: 200 });
  } catch (error) {
    console.error("Error adding child details:", error);
    return new Response("Internal server error", { status: 500 });
  } finally {
    await client.close();
  }
}
