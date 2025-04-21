// src/instrumentation.ts lub instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { connectToDatabase } = await import('./lib/mongoose');
    try {
      await connectToDatabase();
      console.log('[MongoDB] ✅ Database initialized via instrumentation');
    } catch (err) {
      console.error('[MongoDB] ❌ Database initialization failed:', err);
    }
  }
} 