'use client';

import { Layout } from '@/modules/layout/Layout';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>
        <h2 className="text-2xl mb-6">Something went wrong</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          An unexpected error has occurred.
        </p>
      </div>
    </Layout>
  );
}