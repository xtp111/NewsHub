// Member: Tianpeng Xu
// MongoDB Connection Utility

import mongoose from "mongoose";

// Type definition for the cached connection stored on the global object
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Store the Mongoose connection cache globally
const globalForMongoose = globalThis as {
  mongoose?: MongooseCache;
};

// Initialize cache from global or create a new empty cache
const cached =
    globalForMongoose.mongoose ?? { conn: null, promise: null };

// Store the cache reference on the global object for reuse across hot-reloads
if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = cached;
}


// connectDB: Establishes or reuses a MongoDB connection.
// Validates MONGODB_URI at runtime (not module load) to avoid build-time errors
// on platforms like Vercel where env vars aren't available during `next build`.
async function connectDB(): Promise<typeof mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  // Return existing connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  // Create a new connection promise if none exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    });
  }

  // Await the connection promise and cache the result
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    // Clear the promise on failure to allow retry
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
