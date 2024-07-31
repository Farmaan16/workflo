import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import Task from "../../../models/Task";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { id } = req.query;

  if (req.method === "PATCH") {
    const { status } = req.body;
    const updatedTask = await db
      .collection("tasks")
      .findOneAndUpdate(
        { _id: new ObjectId(id as string) },
        { $set: { status } },
        { returnDocument: "after" }
      );
    res.json(updatedTask.value);
  } else if (req.method === "DELETE") {
    await db.collection("tasks").deleteOne({ _id: new ObjectId(id as string) });
    res.status(204).end();
  } else {
    res.setHeader("Allow", ["PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
