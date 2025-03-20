import { NextResponse } from "next/server";
import crypto from "crypto";

const generatedSignature = (razorpayOrderId, razorpayPaymentId) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request) {
  const { orderId, razorpayPaymentId, razorpaySignature } =
    await request.json();

  console.log(orderId, razorpayPaymentId, razorpaySignature);
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const signature = generatedSignature(orderId, razorpayPaymentId);

  if (signature != razorpaySignature) {
    return NextResponse.json(
      {
        message: "payment verification failed",
        isOk: false,
      },
      { headers, status: 400 }
    );
  } else {
    return NextResponse.json(
      200,
      {
        message: "payment verified successfully",
        isOk: true,
      },
      { headers, status: 200 }
    );
  }
}
