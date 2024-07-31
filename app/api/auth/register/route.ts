import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { email, fullName, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 422 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    email,
    fullName,
    password: hashedPassword,
  });

  await user.save();
  return NextResponse.json({ message: "User created" }, { status: 201 });
}
