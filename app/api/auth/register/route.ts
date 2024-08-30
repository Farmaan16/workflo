import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { email, fullName, password } = await req.json();

    if (!email || !fullName || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists! Try different email" },
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
  } catch (error) {
    console.error("Error in user registration:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}