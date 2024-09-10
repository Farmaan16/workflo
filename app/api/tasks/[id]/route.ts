// app/api/tasks/[id]/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import Task from "@/app/models/Task";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const session = await getServerSession(options);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params; // Get the task ID from the params
  const { title, description, priority, status } = await req.json();

  const updates: Partial<{
    title: string;
    description?: string;
    priority: string;
    status: string;
  }> = { title, description, priority, status };

  // Remove fields with undefined values
  Object.keys(updates).forEach((key) => {
    if (updates[key as keyof typeof updates] === undefined) {
      delete updates[key as keyof typeof updates];
    }
  });

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      updates,
      { new: true }
    );

    if (!task) {
      return NextResponse.json(
        { message: "Task not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(task);
  } catch (error: any) {
    console.error("Error updating task:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
