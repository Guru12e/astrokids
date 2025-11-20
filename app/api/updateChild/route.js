import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    await client.connect();
    const database = client.db("AstroKids");
    const collection = database.collection("childDetails");

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
      timezone,
      orderId,
    } = await request.json();

    const result = await collection.updateOne(
      { "childDetails.orderId": orderId },
      {
        $set: {
          "childDetails.$.name": name,
          "childDetails.$.dob": dob,
          "childDetails.$.time": time,
          "childDetails.$.place": place,
          "childDetails.$.gender": gender,
          "childDetails.$.number": number,
          "childDetails.$.lat": lat,
          "childDetails.$.lon": lon,
          "childDetails.$.timezone": timezone,
          "childDetails.$.isChange": true,
        },
      }
    );

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
        subject: "Child Details Updated",
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
            <p>Your changes are Noted!</p>
            <p>
              Child Details are updated, and we're thrilled to
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
            Your Updated Child Details
          </h2>
          <div style="text-align: center">
            <p>Name: ${name}</p>
            <p>DOB: ${dob}</p>
            <p>Birth Time: ${time}</p>
            <p>Place: ${place}</p>
            <p>Gender: ${gender}</p>
          </div>
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

    return NextResponse.json(
      { message: "Document updated successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
