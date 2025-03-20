import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

export async function POST(request) {
  const { name, email, type } = await request.json();

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

    const pdfPath = path.resolve(process.cwd(), "public", "pdf", `${type}.pdf`);

    const info = await transporter.sendMail({
      from: {
        name: "admin@AstroKids",
        address: process.env.USER,
      },
      to: email,
      subject: `${type} Insights Through Astrology`,
      text: `Dear Parents,

AstroKids is excited to share valuable insights on ${type} through astrology. We have attached a special document that provides guidance on how astrological principles align with ${type} to enhance well-being.

Please find the document attached.

Thank You,  
AstroKids Team`,

      html: `<div style="
    margin: auto;
    width: 100vw;
    max-width: 600px;
    padding-top: 20px;
    position: relative;
  ">
    <div style="
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100vw;
      height: 100%;
      max-width: 600px;
      background: green;
      opacity: 0.18;
    "></div>
    <div style="z-index: 10; color: black; opacity: 1">
        <div style="
        width: 100%;
        margin-top: 40px;
        background-color: #210535;
      ">
            <img src="https://drive.usercontent.google.com/download?id=1MB_IKZo35iEaSzUCaZCqYT9XU39IKh8h" alt="logo"
                style="width: 40%; aspect-ratio: 16 / 9; margin: 0 auto" />
        </div>
    </div>
    <div style="padding: 0 20px">
        <div style="width: 100%; ">
            <h1>Dear Parents,</h1>
            <h3>AstroKids is pleased to share exclusive ${type} insights through astrology.</h3>
        </div>
        <div style="color:#210535; font-size:larger;">
            <p>The attached document explains how ${type} and astrology work together to create a personalized approach to well-being.</p>
        </div>

        <div style="color:#210535; font-size:larger;">
            <p>This resource will help you explore natural healing methods tailored to your child’s astrological profile.<br>
                If you have any queries, feel free to reach out to us. <br><br>
                Thank You,<br>
                AstroKids Team
            </p>
        </div>
        <div style="margin-top: 70px">
            <p style="font-size: 20px">Warm regards,</p>
            <img src="https://drive.usercontent.google.com/download?id=1MB_IKZo35iEaSzUCaZCqYT9XU39IKh8h"
                alt="signature" width="100px" />
            <p>The AstroKids Team</p>
            <a>support@astrokids.ai</a>
            <a href="https://astrokids.ai/" style="
          display: block;
          color: black;
          text-decoration: none;
          margin: 10 0px;
        ">astrokids.ai</a>
        </div>
    </div>
</div>`,

      attachments: [
        {
          filename: `${type}.pdf`,
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: `Error ${err}` }, { status: 500 });
  }
}
