// src/lib/mongoose.ts

import mongoose from 'mongoose';

// Global type definition for mongoose cache
interface GlobalWithMongoose extends NodeJS.Global {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Get reference to the global object with proper typing
const globalWithMongoose = global as GlobalWithMongoose;

// Get MongoDB URI from environment variable
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable'
  );
}

// Initialize cache or use existing cache
let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB database
 * This function establishes a connection to MongoDB that can be reused across API calls
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  // If connection already exists, return it
  if (cached?.conn) {
    console.log('[MongoDB] ✅ Using existing connection');
    return cached.conn;
  }

  // If no cached promise exists, create a new connection
  if (!cached?.promise) {
    const opts = {
      bufferCommands: true, // IMPORTANT: Allow operations to be buffered until connection is ready
      serverSelectionTimeoutMS: 20000, // Increase timeout to handle initial connection delay
      socketTimeoutMS: 45000, // Increase timeout for long-running operations
      maxPoolSize: 5, // Limit connections for serverless environment
      connectTimeoutMS: 30000, // Connection timeout
    };

    console.log('[MongoDB] 🔄 Creating new connection...');
    
    if (!MONGODB_URI) {
      throw Error('[FIX-ME] Empty mongodb connection string.')
    }
    
    // Cache the connection promise
    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('[MongoDB] ✅ Connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('[MongoDB] ❌ Connection error:', error);
        cached!.promise = null; // Reset promise on error
        throw error;
      });
  } else {
    console.log('[MongoDB] 🔄 Using existing connection promise');
  }

  // Wait for connection to be established
  try {
    cached!.conn = await cached!.promise;
    return cached!.conn;
  } catch (e) {
    cached!.promise = null; // Reset the promise on error
    throw e;
  }
}

// Export a function to explicitly close the connection if needed
export async function disconnectFromDatabase(): Promise<void> {
  if (cached?.conn) {
    await cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('[MongoDB] 🔌 Disconnected from database');
  }
}

// Default export for backwards compatibility
export default connectToDatabase;