import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMINNAME &&
    password === process.env.ADMINPASS
  ) {
    return NextResponse.json({ message: "Login Successful" }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Login Failed" }, { status: 500 });
  }
}
