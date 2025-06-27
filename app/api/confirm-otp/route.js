import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
  const { encryptedOtp, otp } = await request.json();

  try {
    const encryptionKey = process.env.ENCRYPTION_KEY;

    if (!encryptionKey) {
      return NextResponse.json(
        { error: "Server error: Missing ENCRYPTION_KEY environment variable." },
        { status: 500 }
      );
    }

    if (!encryptedOtp || !otp) {
      return NextResponse.json(
        { error: "Missing OTP or encrypted OTP in request body." },
        { status: 400 }
      );
    }

    const [ivHex, encryptedOtpHex] = encryptedOtp.split(":");

    if (!ivHex || !encryptedOtpHex) {
      return NextResponse.json(
        { error: "Invalid encryptedOtp format. Expected 'iv:encrypted'" },
        { status: 400 }
      );
    }

    const iv = Buffer.from(ivHex, "hex");
    const encryptedBuffer = Buffer.from(encryptedOtpHex, "hex");

    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(encryptionKey, "hex"),
      iv
    );

    let decryptedOtp = decipher.update(encryptedBuffer);
    decryptedOtp = Buffer.concat([decryptedOtp, decipher.final()]);

    const decryptedOtpString = decryptedOtp.toString();

    if (decryptedOtpString === otp) {
      return NextResponse.json(
        { message: "OTP verified successfully!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "OTP verification failed!" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("OTP verification error:", err);
    return NextResponse.json(
      { error: `Error: ${err.message}` },
      { status: 500 }
    );
  }
}
