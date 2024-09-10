import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import Task from "@/app/models/Task";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

/// Get all tasks for the logged-in user
export async function GET(req: Request) {
  await connectToDatabase();
  const session = await getServerSession(options);

  console.log("Session:", session); // Log session to ensure it contains the user
   if (!session || !session.user?.id) {
     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }


   try {
     const tasks = await Task.find({ userId: session.user.id });
     return NextResponse.json(tasks);
   } catch (error : any) {
     return NextResponse.json({ message: error.message }, { status: 500 });
   }
}

// Create a new task
export async function POST(req: Request) {
  await connectToDatabase();
  const session = await getServerSession(options);
  console.log("Session:", session); // Log session to ensure it contains the user

  if (!session || !session.user?.id) {
    console.error("Unauthorized: Missing user in session.");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, description, priority, status } = await req.json();
  
  
  // Validate request body
  if (!title || !priority || !status) {
    return NextResponse.json(
      { message: "Title, priority, and status are required." },
      { status: 400 }
    );
  }


  try {
    // Create a new task and attach userId from session
    const newTask = new Task({
      title,
      description,
      priority,
      status,
      userId: session.user.id, // Attach user ID from session
    });

    // Save the task to the database
    await newTask.save();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error: any) {
    console.error("Error creating task:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}



// Delete a task
export async function DELETE(req: Request) {
  await connectToDatabase();
  const session = await getServerSession(options);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { taskId } = await req.json();
  await Task.findOneAndDelete({ _id: taskId, userId: session.user.id });
  return NextResponse.json({ message: "Task deleted" });
}
