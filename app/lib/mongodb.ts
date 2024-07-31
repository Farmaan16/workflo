import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

global.mongoose = global.mongoose || { conn: null, promise: null };

async function connectToDatabase() {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    global.mongoose.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Successfully connected to MongoDB"); // Log success message
        return mongoose;
      }
      )
      .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
        throw error; // Rethrow the error to be caught by the caller
      });
  }

  try {
    global.mongoose.conn = await global.mongoose.promise;
  } catch (error) {
    console.error("Failed to establish a persistent connection to MongoDB:", error);
    throw error; // Rethrow the error to be caught by the caller
  }

  return global.mongoose.conn;
}

export default connectToDatabase;
