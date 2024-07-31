import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import Task from "../../../models/Task";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { email } = req.query;

  if (req.method === "GET") {
    const tasks = await db.collection("tasks").find({ email }).toArray();
    res.json(tasks);
  } else if (req.method === "POST") {
    const { title, description, status } = req.body;
    const newTask = new Task({ title, description, status, email });
    await db.collection("tasks").insertOne(newTask);
    res.status(201).json(newTask);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
