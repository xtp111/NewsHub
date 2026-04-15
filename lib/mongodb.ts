/**
 * MongoDB Connection Utility
 *
 * Manages a singleton MongoDB connection using Mongoose.
 * Caches the connection on the Node.js global object to prevent
 * creating multiple connections during hot-reloads in development.
 *
 * Usage: `await connectDB()` before any Mongoose model operations.
 */

import mongoose from "mongoose";

// Type definition for the cached connection stored on the global object
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global namespace to store the Mongoose connection cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Initialize cache from global or create a new empty cache
const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

// Store the cache reference on the global object for reuse across hot-reloads
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes or reuses a MongoDB connection.
 * Validates MONGODB_URI at runtime (not module load) to avoid build-time errors
 * on platforms like Vercel where env vars aren't available during `next build`.
 */
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
