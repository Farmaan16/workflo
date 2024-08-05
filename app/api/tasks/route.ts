import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../lib/mongodb";
import Task from "../../models/Task";

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  const tasks = await Task.find({ userId });
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { title, description, status, userId } = await req.json();

  if (!title || !status || !userId) {
    return NextResponse.json(
      { message: "Title, status, and user ID are required" },
      { status: 400 }
    );
  }

  const task = new Task({ title, description, status, userId });
  await task.save();
  return NextResponse.json(task, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const { id, title, description, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json(
      { message: "Task ID and status are required" },
      { status: 400 }
    );
  }

  const task = await Task.findByIdAndUpdate(
    id,
    { title, description, status },
    { new: true }
  );
  return NextResponse.json(task);
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { message: "Task ID is required" },
      { status: 400 }
    );
  }

  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task deleted" });
}
