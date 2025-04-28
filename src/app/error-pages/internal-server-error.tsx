import { Button } from '@/components/ui/button';
import { Layout } from '@/modules/layout/Layout';

export default function ServiceUnavailable() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h1 className="text-6xl font-bold mb-4">503</h1>
        <h2 className="text-2xl mb-6">Service Unavailable</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The server is temporarily unable to handle this request. Please try again later.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => window.location.reload()} variant="outline">
            Refresh Page
          </Button>
        </div>
      </div>
    </Layout>
  );
}